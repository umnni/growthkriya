
<?php

ini_set('display_errors', '0');
ini_set('log_errors', '1');

$config = require __DIR__ . '/config.php';

$root = dirname(__DIR__);
$isLocal = is_dir($root . '/public');

$dataDir = $isLocal
    ? $root . '/storage'
    : dirname($root) . '/gk-private-storage';

$dataFile = $dataDir . '/blogs.json';

$uploadDir = $isLocal
    ? $root . '/public/uploads/blogs'
    : $root . '/uploads/blogs';

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');
header('X-Content-Type-Options: nosniff');

$secureCookie = !empty($_SERVER['HTTPS']) &&
    $_SERVER['HTTPS'] !== 'off';

session_name('GK_BLOG_ADMIN');

session_set_cookie_params([
    'lifetime' => 0,
    'path' => '/',
    'secure' => $secureCookie,
    'httponly' => true,
    'samesite' => 'Strict'
]);

session_start();

function respond($data, $status = 200) {
    http_response_code($status);
    echo json_encode(
        $data,
        JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE
    );
    exit;
}

function readInput() {
    $raw = file_get_contents('php://input');
    $data = json_decode($raw ?: '{}', true);
    return is_array($data) ? $data : [];
}

function requireMethod($method) {
    if ($_SERVER['REQUEST_METHOD'] !== $method) {
        respond(['message' => 'Method not allowed'], 405);
    }
}

function requireAdmin() {
    if (empty($_SESSION['gk_admin'])) {
        respond(['message' => 'Please login first'], 401);
    }
}

function requireSecurityToken() {
    $given = $_SERVER['HTTP_X_CSRF_TOKEN'] ?? '';
    $stored = $_SESSION['gk_csrf'] ?? '';

    if (!$stored || !hash_equals($stored, $given)) {
        respond(['message' => 'Invalid security token'], 403);
    }

    $origin = $_SERVER['HTTP_ORIGIN'] ?? '';
    $host = $_SERVER['HTTP_HOST'] ?? '';

    if ($origin) {
        $parts = parse_url($origin);
        $originHost = strtolower($parts['host'] ?? '');
        $originPort = isset($parts['port'])
            ? ':' . $parts['port']
            : '';

        if ($originHost . $originPort !== strtolower($host)) {
            respond(['message' => 'Invalid request origin'], 403);
        }
    }

    $fetchSite = $_SERVER['HTTP_SEC_FETCH_SITE'] ?? '';
    if ($fetchSite === 'cross-site') {
        respond(['message' => 'Cross-site request rejected'], 403);
    }
}

function ensureStorage() {
    global $dataDir, $uploadDir;

    foreach ([$dataDir, $uploadDir] as $folder) {
        if (!is_dir($folder)) {
            if (!mkdir($folder, 0755, true) && !is_dir($folder)) {
                respond(['message' => 'Storage folder unavailable'], 500);
            }
        }
    }
}

function getBlogsData() {
    global $dataFile;

    if (!file_exists($dataFile)) {
        return [];
    }

    $raw = file_get_contents($dataFile);
    $data = json_decode($raw ?: '[]', true);

    if (!is_array($data) || !array_is_list($data)) {
        respond(['message' => 'Invalid blog storage'], 500);
    }

    return $data;
}

function changeBlogs($callback) {
    global $dataFile;

    ensureStorage();

    $file = fopen($dataFile, 'c+');

    if (!$file || !flock($file, LOCK_EX)) {
        respond(['message' => 'Storage is busy'], 500);
    }

    rewind($file);
    $raw = stream_get_contents($file);
    $blogs = json_decode($raw ?: '[]', true);

    if (!is_array($blogs) || !array_is_list($blogs)) {
        flock($file, LOCK_UN);
        fclose($file);
        respond(['message' => 'Storage is invalid'], 500);
    }

    $result = $callback($blogs);
    $updatedBlogs = $result[0];
    $returnValue = $result[1];

    $json = json_encode(
        $updatedBlogs,
        JSON_PRETTY_PRINT |
        JSON_UNESCAPED_SLASHES |
        JSON_UNESCAPED_UNICODE
    );

    if ($json === false) {
        flock($file, LOCK_UN);
        fclose($file);
        respond(['message' => 'Unable to encode blogs'], 500);
    }

    rewind($file);
    $written = fwrite($file, $json);

    if ($written === false || $written !== strlen($json)) {
        flock($file, LOCK_UN);
        fclose($file);
        respond(['message' => 'Unable to save blogs'], 500);
    }

    ftruncate($file, strlen($json));
    fflush($file);
    flock($file, LOCK_UN);
    fclose($file);

    return $returnValue;
}

function cleanString($value, $length = 200) {
    $value = trim((string) ($value ?? ''));
    return mb_substr($value, 0, $length);
}

function makeSlug($value) {
    $value = strtolower(trim($value));
    $value = preg_replace('/[^a-z0-9]+/', '-', $value);
    return trim($value, '-');
}

function validImagePath($path) {
    if ($path === '') return true;

    return preg_match(
        '#^/uploads/blogs/[a-f0-9]{32}\.(jpg|png|webp)$#',
        $path
    ) === 1;
}

$action = $_GET['action'] ?? 'list';

// PUBLIC: ALL PUBLISHED BLOGS
if ($action === 'list') {
    requireMethod('GET');

    $blogs = array_values(array_filter(
        getBlogsData(),
        function ($blog) {
            return ($blog['status'] ?? '') === 'published';
        }
    ));

    usort($blogs, function ($a, $b) {
        return strcmp(
            $b['publishedAt'] ?? '',
            $a['publishedAt'] ?? ''
        );
    });

    respond(['blogs' => $blogs]);
}

// PUBLIC: SINGLE BLOG
if ($action === 'post') {
    requireMethod('GET');

    $slug = cleanString($_GET['slug'] ?? '', 180);

    foreach (getBlogsData() as $blog) {
        if (
            ($blog['slug'] ?? '') === $slug &&
            ($blog['status'] ?? '') === 'published'
        ) {
            respond(['blog' => $blog]);
        }
    }

    respond(['message' => 'Blog not found'], 404);
}

// ADMIN LOGIN
if ($action === 'login') {
    requireMethod('POST');

    $body = readInput();
    $username = (string) ($body['username'] ?? '');
    $password = (string) ($body['password'] ?? '');

    $adminName = $config['admin_username'];
    $passwordHash = $config['admin_password_hash'];

    if (
        !$passwordHash ||
        strlen($username) > 128 ||
        strlen($password) > 1024 ||
        !hash_equals($adminName, $username) ||
        !password_verify($password, $passwordHash)
    ) {
        usleep(300000);
        respond(['message' => 'Invalid username or password'], 401);
    }

    session_regenerate_id(true);

    $_SESSION['gk_admin'] = true;
    $_SESSION['gk_csrf'] = bin2hex(random_bytes(32));

    respond([
        'authenticated' => true,
        'csrfToken' => $_SESSION['gk_csrf']
    ]);
}

// ADMIN SESSION CHECK
if ($action === 'session') {
    requireMethod('GET');

    respond([
        'authenticated' => !empty($_SESSION['gk_admin']),
        'csrfToken' => !empty($_SESSION['gk_admin'])
            ? ($_SESSION['gk_csrf'] ?? '')
            : null
    ]);
}

// ADMIN LOGOUT
if ($action === 'logout') {
    requireMethod('POST');
    requireAdmin();
    requireSecurityToken();

    $_SESSION = [];
    session_destroy();

    respond(['success' => true]);
}

// ADMIN: ALL BLOGS
if ($action === 'admin-list') {
    requireMethod('GET');
    requireAdmin();

    $blogs = getBlogsData();

    usort($blogs, function ($a, $b) {
        return strcmp(
            $b['updatedAt'] ?? '',
            $a['updatedAt'] ?? ''
        );
    });

    respond(['blogs' => $blogs]);
}

// CREATE OR UPDATE BLOG
if ($action === 'save') {
    requireMethod('POST');
    requireAdmin();
    requireSecurityToken();

    $body = readInput();

    $id = cleanString($body['id'] ?? '', 100);
    $title = cleanString($body['title'] ?? '', 180);

    $slug = makeSlug(
        cleanString(
            ($body['slug'] ?? '') ?: $title,
            180
        )
    );

    $excerpt = cleanString($body['excerpt'] ?? '', 500);
    $content = cleanString($body['content'] ?? '', 50000);
    $category = cleanString($body['category'] ?? '', 80);
    $author = cleanString($body['author'] ?? '', 100);
    $image = cleanString($body['featuredImage'] ?? '', 255);
    $imageAlt = cleanString($body['imageAlt'] ?? '', 180);
    $seoTitle = cleanString($body['seoTitle'] ?? '', 180);
    $seoDescription = cleanString(
        $body['seoDescription'] ?? '',
        300
    );

    $status = ($body['status'] ?? '') === 'published'
        ? 'published'
        : 'draft';

    if (!$title || !$slug || !$content) {
        respond([
            'message' => 'Title, slug and content are required'
        ], 422);
    }

    if (!validImagePath($image)) {
        respond(['message' => 'Invalid image path'], 422);
    }

    $savedBlog = changeBlogs(function ($blogs) use (
        $id,
        $title,
        $slug,
        $excerpt,
        $content,
        $category,
        $author,
        $image,
        $imageAlt,
        $seoTitle,
        $seoDescription,
        $status
    ) {
        $existingIndex = null;

        foreach ($blogs as $index => $blog) {
            if ($id && ($blog['id'] ?? '') === $id) {
                $existingIndex = $index;
            }

            if (
                ($blog['slug'] ?? '') === $slug &&
                ($blog['id'] ?? '') !== $id
            ) {
                respond(['message' => 'This slug already exists'], 409);
            }
        }

        if ($id && $existingIndex === null) {
            respond(['message' => 'Blog not found'], 404);
        }

        $old = $existingIndex !== null
            ? $blogs[$existingIndex]
            : [];

        $now = gmdate('c');

        $publishedAt = null;

        if ($status === 'published') {
            $publishedAt = $old['publishedAt'] ?? $now;
        }

        $blog = [
            'id' => $id ?: bin2hex(random_bytes(16)),
            'title' => $title,
            'slug' => $slug,
            'excerpt' => $excerpt,
            'content' => $content,
            'category' => $category ?: 'Insights',
            'author' => $author ?: 'Growth Kriya',
            'featuredImage' => $image,
            'imageAlt' => $imageAlt,
            'seoTitle' => $seoTitle,
            'seoDescription' => $seoDescription,
            'status' => $status,
            'createdAt' => $old['createdAt'] ?? $now,
            'updatedAt' => $now,
            'publishedAt' => $publishedAt
        ];

        if ($existingIndex !== null) {
            $blogs[$existingIndex] = $blog;
        } else {
            $blogs[] = $blog;
        }

        return [$blogs, $blog];
    });

    respond([
        'success' => true,
        'blog' => $savedBlog
    ]);
}

// DELETE BLOG
if ($action === 'delete') {
    requireMethod('POST');
    requireAdmin();
    requireSecurityToken();

    $body = readInput();
    $id = cleanString($body['id'] ?? '', 100);

    if (!$id) {
        respond(['message' => 'Blog ID required'], 422);
    }

    changeBlogs(function ($blogs) use ($id) {
        $remaining = array_values(array_filter(
            $blogs,
            function ($blog) use ($id) {
                return ($blog['id'] ?? '') !== $id;
            }
        ));

        if (count($remaining) === count($blogs)) {
            respond(['message' => 'Blog not found'], 404);
        }

        return [$remaining, true];
    });

    respond(['success' => true]);
}

// UPLOAD COVER IMAGE
if ($action === 'upload') {
    requireMethod('POST');
    requireAdmin();
    requireSecurityToken();

    if (
        empty($_FILES['image']) ||
        $_FILES['image']['error'] !== UPLOAD_ERR_OK
    ) {
        respond(['message' => 'Image upload failed'], 422);
    }

    $file = $_FILES['image'];

    if ($file['size'] > $config['max_image_bytes']) {
        respond(['message' => 'Maximum image size is 3MB'], 422);
    }

    if (!is_uploaded_file($file['tmp_name'])) {
        respond(['message' => 'Invalid upload'], 422);
    }

    $mime = (new finfo(FILEINFO_MIME_TYPE))
        ->file($file['tmp_name']);

    $allowed = [
        'image/jpeg' => 'jpg',
        'image/png' => 'png',
        'image/webp' => 'webp'
    ];

    if (
        !isset($allowed[$mime]) ||
        getimagesize($file['tmp_name']) === false
    ) {
        respond(['message' => 'Invalid image format'], 422);
    }

    ensureStorage();

    $filename = bin2hex(random_bytes(16)) .
        '.' . $allowed[$mime];

    $target = $uploadDir . '/' . $filename;

    if (!move_uploaded_file($file['tmp_name'], $target)) {
        respond(['message' => 'Unable to save image'], 500);
    }

    chmod($target, 0644);

    respond([
        'success' => true,
        'url' => '/uploads/blogs/' . $filename
    ]);
}

respond(['message' => 'Invalid API action'], 404);

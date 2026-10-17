
<?php

$path = parse_url(
    $_SERVER['REQUEST_URI'],
    PHP_URL_PATH
);

if ($path === '/api/blogs.php') {
    require __DIR__ . '/blogs.php';
    return true;
}

if (strpos($path, '/uploads/blogs/') === 0) {
    $filename = basename($path);

    if (!preg_match(
        '/^[a-f0-9]{32}\.(jpg|png|webp)$/',
        $filename
    )) {
        http_response_code(404);
        exit;
    }

    $file = dirname(__DIR__) .
        '/public/uploads/blogs/' . $filename;

    if (!is_file($file)) {
        http_response_code(404);
        exit;
    }

    $extension = strtolower(pathinfo(
        $file,
        PATHINFO_EXTENSION
    ));

    $types = [
        'jpg' => 'image/jpeg',
        'png' => 'image/png',
        'webp' => 'image/webp'
    ];

    header('Content-Type: ' . $types[$extension]);
    header('X-Content-Type-Options: nosniff');
    readfile($file);
    exit;
}

http_response_code(404);
echo 'Not found';

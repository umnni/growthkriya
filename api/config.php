
<?php

return [
    'admin_username' => 'admin',

    'admin_password_hash' => password_hash(
        'GK@Admin2026!',
        PASSWORD_DEFAULT
    ),

    'max_image_bytes' => 3 * 1024 * 1024,
];

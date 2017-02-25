<?php

session_start();
$_SESSION["tasks"] = [
    [
        'caption' => 'Bier',
        'status' => 'open',
        'id' => '77c5a541-bb39-4644-94b4-bffd46c14a0e'
    ],
    [
        'caption' => 'Wäsche',
        'status' => 'closed',
        'id' => '25c9f45b-0008-4960-acd3-363249b0536d'
    ],
    [
        'caption' => 'Milch',
        'status' => 'open',
        'id' => '544cb393-b29e-4bc9-829d-6c57eee4877d'
    ],
    [
        'caption' => 'Brot',
        'status' => 'closed',
        'id' => 'd1ac6644-b331-478e-ba51-1280a336f8d5'
    ]
];

header('Content-Type: text/html; charset=utf-8');
header('Content-Type: application/json');

echo json_encode($_SESSION["tasks"], JSON_UNESCAPED_UNICODE);
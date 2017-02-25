<?php

session_start();
$_SESSION["tasks"][] =
    [
        'caption' => $_REQUEST['caption'],
        'status' => 'closed',
        'id' => 'd1ac6644-b331-478e-ba51-1280a336f8d5',
        'index' => count($_SESSION["tasks"])
    ];

header('Content-Type: text/html; charset=utf-8');
header('Content-Type: application/json');

echo json_encode($_SESSION["tasks"], JSON_UNESCAPED_UNICODE);
<?php

session_start();

header('Content-Type: text/html; charset=utf-8');
header('Content-Type: application/json');

echo json_encode($_SESSION["tasks"], JSON_UNESCAPED_UNICODE);
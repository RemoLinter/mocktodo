<?php

$tasks = [
    [
        "caption" => "aaa",
        "status" => "open",
        "id" => "77c5a541-bb39-4644-94b4-bffd46c14a0e"
    ],
    [
        "caption" => "bbb",
        "status" => "closed",
        "id" => "25c9f45b-0008-4960-acd3-363249b0536d"
    ],
    [
        "caption" => "ccc",
        "status" => "open",
        "id" => "544cb393-b29e-4bc9-829d-6c57eee4877d"
    ],
    [
        "caption" => "ddd",
        "status" => "closed",
        "id" => "d1ac6644-b331-478e-ba51-1280a336f8d5"
    ]
];

header("Content-Type: application/json");

echo json_encode($tasks);
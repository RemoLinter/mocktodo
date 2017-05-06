<?php

// Datendatei festlegen
$filename = '../_geheim/tasklist.json';

function generate_auto_nr() {
    // id.txt auslesen
    $autoNr = file_get_contents('id.txt');
    // id erhöhen
    $newAutoNr = $autoNr + 1;
    // erhöhte ID zurückschreiben
    file_put_contents('id.txt', $newAutoNr);
    // id zurückgeben
    return $autoNr;
}

function load_tasks($filename) {
    // Lade die Taskliste aus Datei
    $tasks = json_decode(file_get_contents($filename), true);
    return $tasks;
}

function save_tasks($filename, $tasks) {
    // Taskliste zurückschreiben
    $result = file_put_contents($filename, json_encode($tasks));
    if ($result) {
        return true;
    } else {
        return false;
    }
}

// Lade die Taskliste aus Datei
$tasklist = load_tasks($filename);

// Je nach Request Methode entsprechend handeln
switch ($_SERVER['REQUEST_METHOD']) {
    case 'GET':
        include 'allTasks.php';
        break;
    case 'POST':
        include 'addTask.php';
        break;
    case 'DELETE':
        include 'removeTask.php';
        break;
    case 'PATCH':
        include 'changeTask.php';
        break;
}

// Gib den korrekten Header aus
header('Content-Type: application/json; charset=UTF-8');
header("access-control-allow-origin: *");

// Liefere Ergebnis zurück.
echo json_encode(execute($filename));

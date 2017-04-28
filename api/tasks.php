<?php
// Bibliothek laden für Funktion die UUID generiert
require_once('lib.php');

// Datendatei festlegen
$filename = '../_geheim/tasklist.json';

// URL Parameter Aktion lesen
$action = $_SERVER['REQUEST_METHOD'];

// Lade die Liste der Tasks aus Datei
$tasklistJSON = file_get_contents($filename);

// Aktion entsprechend handeln
switch ($action) {
    case 'GET':
        // Taskliste als Antwort festlegen
        $result = $tasklistJSON;
        break;
    case 'POST':
        // Titel für neuen Task aus URL Parameter lesen
        $title = $_REQUEST['title'];
        // ID für neuen Task generieren
        $id = create_guid();

        // JSON in Taskliste umwandeln
        $tasklist = json_decode($tasklistJSON, true);

        // Task erstellen
        $task = [
            'caption' => $title,
            'status' => 'open',
            'id' => $id
        ];

        // Task zu Array hinzufügen
        array_push($tasklist, $task);

        // Taskliste in JSON umwandeln
        $tasklistJSON = json_encode($tasklist);
        // Taskliste zurückschreiben
        file_put_contents($filename, $tasklistJSON);
        // Antwort festlegen
        $result = $tasklistJSON;
        break;
    case 'DELETE':
        // ID des zu löschenden Task aus URL Parameter lesen
        $id = $_REQUEST['id'];

        // JSON in Taskliste umwandeln
        $tasklist = json_decode($tasklistJSON, true);

        // Task entfernen
        $key = array_search($id, $tasklist);
        //unset($tasklist[$key]);

        // Task zu Array hinzufügen
        array_push($tasklist, $task);

        // Taskliste in JSON umwandeln
        $tasklistJSON = json_encode($tasklist);

        // Taskliste zurückschreiben
        file_put_contents($filename, $tasklistJSON);
        // Antwort festlegen
        $result = $tasklistJSON;

        $result = $key;
        break;
    case 'PATCH':
        // ID des zu ändernden Task aus URL Parameter lesen
        $id = $_REQUEST['id'];
        // neuen Titel für Task aus URL Parameter lesen
        $title = $_REQUEST['title'];
        // neuen Status für Task aus URL Parameter lesen
        $status = $_REQUEST['status'];
        // Antwort festlegen
        $result = "patch";
        break;
}

// Gib den korrekten Header aus
header('Content-Type: application/json; charset=UTF-8');

// Liefere Ergebnis zurück.
echo $result;

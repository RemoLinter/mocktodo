<?php
// Bibliothek laden für Funktion die UUID generiert
require_once('lib.php');

// Variable für Antwort deklarieren
$result='';

// Datendatei festlegen
$filename = '../_geheim/tasklist.json';

// Lade die Taskliste aus Datei
$tasklist = json_decode(file_get_contents($filename), true);

// Aktion entsprechend handeln
switch ($_SERVER['REQUEST_METHOD']) {
    case 'GET':
        // Taskliste als Antwort festlegen
        $result = json_encode($tasklist);
        break;
    case 'POST':
        // Wenn Caption als Parameter vorhanden
        if (array_key_exists('caption',$_REQUEST)) {
            // Titel für neuen Task aus URL Parameter lesen
            $caption = $_REQUEST['caption'];
            // ID für neuen Task generieren
            $id = create_guid();

            // Task erstellen
            $task = [
                'caption' => $caption,
                'status' => 'open',
                'id' => $id
            ];

            // Task zu Array hinzufügen
            $tasklist[] = $task;
        }

        // Taskliste zurückschreiben
        file_put_contents($filename, json_encode($tasklist));
        // Antwort festlegen
        $result = json_encode($tasklist);
        break;
    case 'DELETE':
        // Wenn ID als Parameter vorhanden
        if (array_key_exists('id',$_REQUEST)) {
            // ID des zu löschenden Task aus URL Parameter lesen
            $id = $_REQUEST['id'];

            // Neues Array für gefilterte Tasks
            $newtasklist = [];

            // Tasks durchlaufen
            foreach ($tasklist as $task) {
                // Wenn Task id nicht die zu entfernende ist
                if ($task['id'] != $id) {
                    // Task zu neuer Taskliste hinzufügen
                    $newtasklist[] = $task;
                }
            }

            // Neue Taskliste in JSON umwandeln
            $tasklistJSON = json_encode($newtasklist);
        } else {
            // Taskliste in JSON umwandeln
            $tasklistJSON = json_encode($tasklist);
        }

        // Taskliste zurückschreiben
        file_put_contents($filename, $tasklistJSON);
        // Antwort festlegen
        $result = $tasklistJSON;
        break;
    case 'PATCH':
        // ID des zu ändernden Task aus URL Parameter lesen
        $id = $_REQUEST['id'];

        // neuen Titel für Task aus URL Parameter lesen
        $caption = $_REQUEST['caption'];
        // neuen Status für Task aus URL Parameter lesen
        $status = $_REQUEST['status'];

        // Tasks durchlaufen
        foreach ($tasklist as &$task) {
            // Wenn Task id die gesuchte ist
            if ($task['id'] == $id) {
                // Wenn Caption angegeben
                if (array_key_exists('caption',$_REQUEST)) {
                    // Caption neu setzen
                    $task['caption'] = $caption;
                }
                // Wenn Status angegeben
                if (array_key_exists('status',$_REQUEST)) {
                    // Status neu setzen
                    $task['status'] = $caption;
                }
            }
        }

        // Taskliste zurückschreiben
        file_put_contents($filename, json_encode($tasklist));
        // Antwort festlegen
        $result = json_encode($tasklist);
        break;
}

// Gib den korrekten Header aus
header('Content-Type: application/json; charset=UTF-8');

// Liefere Ergebnis zurück.
echo $result;

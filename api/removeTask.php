<?php

function execute($filename) {
    // Taskliste laden
    $tasklist = load_tasks($filename);
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

        // Taskliste zurückschreiben
        save_tasks($filename, $newtasklist);

        // Antwortmeldung festlegen
        $message = [
            'status' => 'done',
            'count' => count($newtasklist)
        ];
    } else {
        // Antwortmeldung festlegen
        $message = [
            'status' => 'error',
            'reason' => 'ID fehlt'
        ];
    }

    // Antwort festlegen
    return $message;
}
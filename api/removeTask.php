<?php

function execute($filename) {
    // Wenn ID als Parameter vorhanden
    if (isset($_REQUEST['id'])) {
        // ID des zu löschenden Task aus URL Parameter lesen
        $id = $_REQUEST['id'];

        // Taskliste laden
        $tasklist = load_tasks($filename);
        foreach ($tasklist as $index => $task) {
            if($task['id'] == $id) {
                unset($tasklist[$index]);
                break;
            }
        }

        // Taskliste zurückschreiben
        if (save_tasks($filename, $tasklist)) {
            // Antwortmeldung festlegen
            $message = [
                'status' => 'done',
                'count' => count($tasklist)
            ];
        } else {
            // Antwortmeldung festlegen
            $message = [
                'status' => 'error',
                'reason' => 'Speichern fehlgeschlagen'
            ];

            // HTTP Code Bad Request
            http_response_code(500);
        };
    } else {
        // Antwortmeldung festlegen
        $message = [
            'status' => 'error',
            'reason' => 'ID fehlt'
        ];

        // HTTP Code Bad Request
        http_response_code(400);
    }

    // Antwort festlegen
    return $message;
}
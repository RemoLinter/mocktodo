<?php

function execute($filename) {
    // Wenn ID als Parameter vorhanden
    if (array_key_exists('id',$_REQUEST)) {
        // Taskliste laden
        $tasklist = load_tasks($filename);

        // ID des zu löschenden Task aus URL Parameter lesen
        $id = $_REQUEST['id'];

        foreach ($tasklist as $index => $task) {
            if($task['id'] == $id) {
                unset($tasklist[$index]);
            }
        }

        // Taskliste zurückschreiben
        save_tasks($filename, $tasklist);

        // Antwortmeldung festlegen
        $message = [
            'status' => 'done',
            'count' => count($tasklist)
        ];

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
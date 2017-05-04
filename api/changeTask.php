<?php

function execute($filename) {
    // Taskliste laden
    $tasklist = load_tasks($filename);

    // Wenn ID als Parameter vorhanden
    if (array_key_exists('id', $_REQUEST)) {
        // ID des zu ändernden Task aus URL Parameter lesen
        $id = $_REQUEST['id'];

        // Wenn Caption oder Status als Parameter vorhanden
        if (array_key_exists('caption', $_REQUEST) ||
            array_key_exists('status', $_REQUEST)) {

            // Tasks durchlaufen
            foreach ($tasklist as &$task) {
                // Wenn Task id die gesuchte ist
                if ($task['id'] == $id) {
                    // Wenn Caption angegeben
                    if (array_key_exists('caption',$_REQUEST)) {
                        // neuen Titel für Task aus URL Parameter lesen
                        $caption = $_REQUEST['caption'];
                        // Caption neu setzen
                        $task['caption'] = $caption;
                    }
                    // Wenn Status angegeben
                    if (array_key_exists('status',$_REQUEST)) {
                        // neuen Status für Task aus URL Parameter lesen
                        $status = $_REQUEST['status'];
                        // Status neu setzen
                        $task['status'] = $status;
                    }
                }
            }
            // Taskliste zurückschreiben
            save_tasks($filename, $tasklist);

            // Antwortmeldung festlegen
            $message = [
                'status' => 'done',
            ];
        } else {
            // Antwortmeldung festlegen
            $message = [
                'status' => 'error',
                'reason' => 'Weder Caption noch Status festgelegt'
            ];
        }
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
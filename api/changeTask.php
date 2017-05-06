<?php

function execute($filename) {
    // Wenn ID als Parameter vorhanden
    if (isset($_REQUEST['id'])) {
        // ID des zu ändernden Task aus URL Parameter lesen
        $id = $_REQUEST['id'];

        // Wenn Caption oder Status als Parameter vorhanden
        if (isset($_REQUEST['caption']) ||
            isset($_REQUEST['status'])) {

            // Taskliste laden
            $tasklist = load_tasks($filename);

            // Tasks durchlaufen
            foreach ($tasklist as &$task) {
                // Wenn Task id die gesuchte ist
                if ($task['id'] == $id) {
                    // diesen mal auf die Seite legen
                    $foundTask = &$task;
                    break;
                }
            }

            if (isset($foundTask)) {
                // Wenn Caption angegeben
                if (!isset($_REQUEST['caption'])) {
                    // Caption neu setzen
                    $foundTask['caption'] = $_REQUEST['caption'];
                }
                // Wenn Status angegeben
                if (!isset($_REQUEST['status'])) {
                    // Status neu setzen
                    $foundTask['status'] = $_REQUEST['status'];
                }

                // Taskliste zurückschreiben
                if (save_tasks($filename, $tasklist)) {
                    // Antwortmeldung festlegen
                    $message = [
                        'msg' => 'Erledigt',
                        'id' => $foundTask['id'],
                        'caption' => $foundTask['caption'],
                        'status' => $foundTask['status']
                    ];
                } else {
                    // Antwortmeldung festlegen
                    $message = [
                        'msg' => 'Speichern fehlgeschlagen'
                    ];

                    // HTTP Code Bad Request
                    http_response_code(500);
                };
            } else {
                // Antwortmeldung festlegen
                $message = [
                    'msg' => 'Task mit dieser ID nicht gefunden'
                ];

                // HTTP Code Bad Request
                http_response_code(404);
            }
        } else {
            // Antwortmeldung festlegen
            $message = [
                'msg' => 'Weder Caption noch Status festgelegt'
            ];

            // HTTP Code Bad Request
            http_response_code(400);
        }
    } else {
        // Antwortmeldung festlegen
        $message = [
            'msg' => 'ID fehlt'
        ];

        // HTTP Code Bad Request
        http_response_code(400);
    }

    // Antwort festlegen
    return $message;
}
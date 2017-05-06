<?php

function execute ($filename) {
    // Taskliste laden
    $tasklist = load_tasks($filename);
    // Wenn Caption als Parameter vorhanden
    if (isset($_REQUEST['caption'])) {
        // Titel für neuen Task aus URL Parameter lesen
        $caption = $_REQUEST['caption'];
        // ID für neuen Task holen
        $id = generate_auto_nr();

        // Task erstellen
        $task = [
            'caption' => $caption,
            'status' => 'open',
            'id' => $id
        ];

        // Task zu Array hinzufügen
        $tasklist[] = $task;

        // Taskliste zurückschreiben
        if (save_tasks($filename, $tasklist)) {
            // Antwortmeldung festlegen
            $message = [
                'status' => 'done',
                'id' => $id,
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
            'reason' => 'Caption fehlt'
        ];

        // HTTP Code Bad Request
        http_response_code(400);
    }

    return $message;
}
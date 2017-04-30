<?php

function execute($filename) {
    // Taskliste laden
    $tasklist = load_tasks($filename);

    // Taskliste als Antwort festlegen
    return $tasklist;
}
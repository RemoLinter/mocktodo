var buildTaskEntry = function (caption, id) {
    var $entryTask = $('<li></li>');
    $entryTask.attr('data-taskid', id);

    var $divTask = $('<div></div>');
    $divTask.addClass('task');

    var $divTaskSymbols = $('<div></div>');
    $divTaskSymbols.addClass('tasksymbols');

    var $para = $('<p></p>');

    $para.html(caption);

    $divTaskSymbols.append(buildSymbol('fa-clock-o'));
    $divTaskSymbols.append(buildSymbol('fa-tags'));
    $divTask.append($divTaskSymbols);

    $divTask.append($para);
    $divTask.append(buildTaskActions);

    $entryTask.append($divTask);

    return $entryTask;
};

var buildSymbol = function (symbolID) {
    var $divSymbol = $('<div></div>');
    $divSymbol.addClass('symbol');

    var $symbol = $('<i/>');
    $symbol.addClass('fa ' + symbolID + ' fa-2x');
    $symbol.attr('aria-hidden', 'true');

    $divSymbol.append($symbol);

    return $divSymbol;
};

var buildTaskActions = function () {
    var $divTaskActions = $('<div></div>');
    $divTaskActions.addClass('taskactions');

    return $divTaskActions;
};

var prependTaskToList = function (taskID, $listTasks) {
    var $element = $("[data-taskid='" + taskID + "'");
    $listTasks.prepend($element);
};

var removeTaskFromList = function (taskID) {
    var $element = $("[data-taskid='" + taskID + "'");
    $element.remove();
};

var fillTasks = function () {
    tasklist.forEach(function (task) {
        var $listItem = buildTaskEntry(task.caption, task.id);

        switch (task.status) {
            case "open":
                $listOpenTasks.append($listItem);
                break;
            case "closed":
                $listClosedTasks.prepend($listItem);
                break;
        }
    })
};

var addTaskEntry = function(taskID, taskCaption) {
    // Wenn Wert nicht leer ist
    if (taskID !== '') {

        $listOpenTasks.append(buildTaskEntry(taskCaption, taskID));
    }
};
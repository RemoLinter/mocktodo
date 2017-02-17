var getListOpenTasks = function () {
    return $('.open');
};

var getListClosedTasks = function () {
    return $('.closed');
};

var getInputTaskCaption = function () {
    return $('.inputsearch');
};

var clearInputTaskCaption = function() {
    getInputTaskCaption().val('');
};

var getNewTaskCaption = function () {
    // Wert auslesen
    return getInputTaskCaption().val();
};

var getTaskIDFromElement = function (element) {
    return ($(element).attr('data-taskid'));
};

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

var moveTask = function (taskID, $listTasks, prepend) {
    var element=$("[data-taskid='" + taskID + "'");
    if (prepend) {
        $listTasks.prepend(element);
    } else {
        $listTasks.append(element);
    }

};

var fillTasks = function (taskliste) {
    var $listOpenTasks = getListOpenTasks();
    var $listClosedTasks = getListClosedTasks();

    if (taskliste !== null) {
        taskliste.forEach(function (task) {
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
    }
};

var addTaskEntry = function(taskCaption) {
    var $listOpenTasks = getListOpenTasks();

    // Wenn Wert nicht leer ist
    if (taskCaption !== '') {
        var taskID =  generateUUID();
        $listOpenTasks.append(buildTaskEntry(taskCaption, taskID));

        return taskID;
    }
};
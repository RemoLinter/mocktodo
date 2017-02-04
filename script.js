$(function () {
    // Button holen
    var $buttonAdd = $('.buttonadd');
    var $listOpenTasks = getListOpenTasks();
    var taskliste = loadTasks();

    //Eventlistener hinzufügen
    $buttonAdd.on('click', addTask);

    $listOpenTasks.on('click', 'li', removeTask);

    fillTasks(taskliste);
});

var loadTasks = function () {
    var storageData = localStorage.getItem("tasklist");
    var tasklist = JSON.parse(storageData);

    return tasklist;
};

var saveTasks = function (tasklist) {
    localStorage.setItem("tasklist", JSON.stringify(tasklist));
};

var fillTasks = function (taskliste) {
    var $listOpenTasks = getListOpenTasks();
    var $listClosedTasks = getListClosedTasks();

    if (taskliste != null) {
        taskliste.forEach(function (task) {
            var $listItem = buildTaskEntry(task.caption, task.erstellt);

            if (task.erledigt) {
                $listClosedTasks.prepend($listItem);
            } else {
                $listOpenTasks.append($listItem);
            }
        })
    }
};

var addTask = function () {
    // Eingabefeld holen
    var $inputInhalt = $('.inputsearch');
    var $listOpenTasks = getListOpenTasks();
    var tasklist = loadTasks();

    // Wert auslesen
    var inhaltWert = $inputInhalt.val();

    // Wenn Wert nicht leer ist
    if (inhaltWert !== '') {

        var now = new Date();
        $listOpenTasks.append(buildTaskEntry(inhaltWert, now.toLocaleString()));
        tasklist = tasklist || [];
        tasklist.push(
            {
                'caption': inhaltWert,
                'erledigt': false,
                'erstellt': now.toLocaleString()
            }
        );

        saveTasks(tasklist);

        $inputInhalt.val('');
    }

    //console.log (JSON.stringify(loadTasks()));

};

var buildTaskEntry = function (caption, created) {
    var $entryTask = $('<li></li>');
    $entryTask.attr('data-created', created);

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

var removeTask = function () {
    var tasklist = loadTasks();
    var $listClosedTasks = getListClosedTasks();

    var created = ($(this).attr('data-created'));

    var task = tasklist.filter(function (task) {
        return task.erstellt == created;
    });

    task[0].erledigt = true;

    $listClosedTasks.prepend(this);

    saveTasks(tasklist);
};

var getListOpenTasks = function () {
    return $('.open');
};

var getListClosedTasks = function () {
    return $('.closed');
};



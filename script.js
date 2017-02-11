function myToDoApp() {
    {
        var test = 'Test';
    }
    return {
        init: function () {
            console.log(test);
        }
    }
}

$(function () {
    //Button holen
    //var $buttonAdd = $('.buttonadd');
    //Eventlistener hinzufügen
    //$buttonAdd.on('click', addTask);

    //var $listOpenTasks = getListOpenTasks();
    //$listOpenTasks.on('click', 'li', removeTask);

    //var taskliste = loadTasksStorage();
    var taskliste = loadTasks();
    fillTasks(taskliste);

    myToDoApp().init();
});

var loadTasks = function () {
    //var tasklistJson='[{"caption":"Milch kaufen","erledigt":false,"erstellt":"11.2.2017, 09:30:35"},{"caption":"Bier kaufen","erledigt":false,"erstellt":"11.2.2017, 09:30:40"},{"caption":"Brot kaufen","erledigt":true,"erstellt":"11.2.2017, 09:30:45"},{"caption":"Eier kaufen","erledigt":false,"erstellt":"11.2.2017, 09:30:50"}]';
    //var tasklist=JSON.parse(tasklistJson);

    var tasklist=[{"caption":"Milch kaufen","erledigt":false,"erstellt":"11.2.2017, 09:30:35"},{"caption":"Bier kaufen","erledigt":false,"erstellt":"11.2.2017, 09:30:40"},{"caption":"Brot kaufen","erledigt":true,"erstellt":"11.2.2017, 09:30:45"},{"caption":"Eier kaufen","erledigt":false,"erstellt":"11.2.2017, 09:30:50"}];

    return tasklist;
}

var loadTasksStorage = function () {
    var storageData = localStorage.getItem("tasklist");
    var tasklist = JSON.parse(storageData);

    return tasklist;
};

var saveTasksStorage = function (tasklist) {
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
    var tasklist = loadTasksStorage();

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

        //saveTasksStorage(tasklist);

        $inputInhalt.val('');
    }

    //console.log (JSON.stringify(loadTasksStorage()));

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
    //var tasklist = loadTasksStorage();
    var tasklist = loadTasks();

    var $listClosedTasks = getListClosedTasks();

    var created = ($(this).attr('data-created'));

    var task = tasklist.filter(function (task) {
        return task.erstellt == created;
    });

    if (task.length == 1) {
        task[0].erledigt = true;
    }

    $listClosedTasks.prepend(this);


    //saveTasksStorage(tasklist);
};

var getListOpenTasks = function () {
    return $('.open');
};

var getListClosedTasks = function () {
    return $('.closed');
};

$(document).on('click', ".buttonadd", addTask);
$(document).on('click', ".tasklist.open li", removeTask);


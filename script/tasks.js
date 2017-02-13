var loadTasksStorage = function () {
    var storageData = localStorage.getItem("tasklist");
    var tasklist = JSON.parse(storageData);

    return tasklist;
};

var saveTasksStorage = function (taskliste) {
    localStorage.setItem("tasklist", JSON.stringify(taskliste));
};

var loadTasks = function () {
    var taskliste = loadTasksStorage();
    fillTasks(taskliste);
};

var addTask = function () {
    var taskCaption = getNewTaskCaption();
    var taskID = addTaskEntry(taskCaption);

    if (taskID!='') {
        var tasklist = loadTasksStorage();
        //var taskID =  generateUUID();
        tasklist = tasklist || [];
        tasklist.push(
            {
                'caption': taskCaption,
                'status': "open",
                'id': taskID
            }
        );

        saveTasksStorage(tasklist);

        getInputTaskCaption().val('');
    }
};

var removeTask = function (element) {
    var tasklist = loadTasksStorage();
    var $listClosedTasks = getListClosedTasks();
    var taskID = ($(element).attr('data-taskid'));

    var task = tasklist.filter(function (task) {
        return task.id === taskID;
    });

    if (task.length == 1) {
        task[0].status = "closed";
    }

    $listClosedTasks.prepend(element);


    saveTasksStorage(tasklist);
};
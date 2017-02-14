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

var addTask = function (taskCaption) {
    var taskID = addTaskEntry(taskCaption);

    if (taskID!='') {
        var tasklist = loadTasksStorage();
        tasklist = tasklist || [];
        tasklist.push(
            {
                'caption': taskCaption,
                'status': "open",
                'id': taskID
            }
        );

        saveTasksStorage(tasklist);

        clearInputTaskCaption();
    }
};

var removeTask = function (taskID) {
    moveTask(taskID, getListClosedTasks(), true);

    var tasklist = loadTasksStorage();

    var task = tasklist.filter(function (task) {
        return task.id === taskID;
    });

    if (task.length == 1) {
        task[0].status = "closed";
    }

    saveTasksStorage(tasklist);
};
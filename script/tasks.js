var loadTasksStorage = function () {
    var $tasksLoader = $.ajax({
        url: "/api/allTasks.php",
        dataType: "json"
    });

    $tasksLoader.done(function(data) {
        tasklist = data;
        fillTasks();
    });
};

var saveTasksStorage = function () {
    localStorage.setItem("tasklist", JSON.stringify(tasklist));
};

var addTask = function (taskCaption) {
    var taskID =  generateUUID();

    tasklist.push(
        {
            'caption': taskCaption,
            'status': "open",
            'id': taskID
        }
    );

    addTaskEntry(taskID, taskCaption);

    saveTasksStorage();
};

var removeTask = function (taskID) {
    var task = tasklist.filter(function (task) {
        return task.id === taskID;
    });

    if (task.length == 1) {
        task[0].status = "closed";
    }

    prependTaskToList(taskID, $listClosedTasks);

    saveTasksStorage();
};
var loadTasksStorage = function () {
    /*
    var storageData = localStorage.getItem("tasklist");
    var tasklist = JSON.parse(storageData);
    tasklist = tasklist || [];

    return tasklist;
    */

    var tasklist;

    $.ajax({
        url: "/api/tasklist.json",
        async: false,
        dataType: "json",
        success: function (data) {
            tasklist = data;
        },
        error: function (e) {
            tasklist = [];
        }
    });

    return tasklist;
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
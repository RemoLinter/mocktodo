var loadTasksStorage = function () {
    var $tasksLoader = $.ajax({
        url: "/api/tasks.php",
        dataType: "json",
        method: "GET"
    });

    $tasksLoader.done(function(data) {
        tasklist = data;
        fillTasks();
    });
};

var addTask = function (taskCaption) {
    var $tasksLoader = $.ajax({
        url: "/api/tasks.php" + "?caption=" + taskCaption,
        dataType: "json",
        method: "POST"
    });

    $tasksLoader.done(function(data) {
        tasklist = data;
        addTaskEntry(data.id, taskCaption);
    });
};

var removeTask = function (taskID) {
    var $tasksLoader = $.ajax({
        url: "/api/tasks.php" + "?id=" + taskID + "&status=closed",
        dataType: "json",
        method: "PATCH"
    });

    $tasksLoader.done(function() {
        console.log(taskID);
        prependTaskToList(taskID, $listClosedTasks);
    });
};

var deleteTask = function (taskID) {
    var $tasksLoader = $.ajax({
        url: "/api/tasks.php" + "?id=" + taskID,
        dataType: "json",
        method: "DELETE"
    });

    $tasksLoader.done(function() {
        console.log(taskID);
        removeTaskFromList(taskID, $listClosedTasks);
    });
};
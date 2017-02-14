var eventLoadTasks = function () {
    loadTasks();
};

var eventAddTask = function () {
    var taskCaption = getNewTaskCaption();
    addTask(taskCaption);
};

var eventRemoveTask = function () {
    var taskID = getTaskIDFromElement(this);
    removeTask(taskID);
};


$(function () {
    eventLoadTasks();
});

$(document).on('click', ".buttonadd", eventAddTask);
$(document).on('click', ".tasklist.open li", eventRemoveTask);

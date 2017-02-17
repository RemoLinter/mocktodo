var eventAddTask = function () {
    var taskCaption = getNewTaskCaption();
    addTask(taskCaption);
};

var eventRemoveTask = function () {
    var taskID = getTaskIDFromElement(this);
    removeTask(taskID);
};


$(function () {
    loadTasks();
});

$(document).on('click', ".buttonadd", eventAddTask);
$(document).on('click', ".tasklist.open li", eventRemoveTask);

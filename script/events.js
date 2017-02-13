var eventLoadTasks = function () {
    loadTasks();
};

var eventAddTask = function () {
    addTask();
};

var eventRemoveTask = function () {
    removeTask(this);
};


$(function () {
    eventLoadTasks();
});

$(document).on('click', ".buttonadd", eventAddTask);
$(document).on('click', ".tasklist.open li", eventRemoveTask);

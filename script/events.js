var eventAddTask = function () {
    var $inputNewTaskCaption = $('.inputsearch');
    var taskCaption = $inputNewTaskCaption.val();

    // Wenn Wert nicht leer ist
    if (taskCaption !== '') {
        addTask(taskCaption);
        $inputNewTaskCaption.val('');
    }
};

var eventCloseTask = function () {
    var taskID = ($(this).attr('data-taskid'));
    closeTask(taskID);
};

var eventDeleteTask = function () {
    var taskID = ($(this).attr('data-taskid'));
    deleteTask(taskID);
};


$(function () {
    $listOpenTasks = $('.open');
    $listClosedTasks = $('.closed');

    loadTasksStorage();
});

$(document).on('click', ".buttonadd", eventAddTask);
$(document).on('click', ".tasklist.open li", eventCloseTask);
$(document).on('click', ".tasklist.closed li", eventDeleteTask);

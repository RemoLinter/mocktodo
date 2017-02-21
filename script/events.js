var eventAddTask = function () {
    var $inputNewTaskCaption = $('.inputsearch');
    var taskCaption = $inputNewTaskCaption.val();

    // Wenn Wert nicht leer ist
    if (taskCaption !== '') {
        addTask(taskCaption);
        $inputNewTaskCaption.val('');
    }
};

var eventRemoveTask = function () {
    var taskID = ($(this).attr('data-taskid'));
    removeTask(taskID);
};


$(function () {
    $listOpenTasks = $('.open');
    $listClosedTasks = $('.closed');
    tasklist = loadTasksStorage();

    fillTasks();
});

$(document).on('click', ".buttonadd", eventAddTask);
$(document).on('click', ".tasklist.open li", eventRemoveTask);

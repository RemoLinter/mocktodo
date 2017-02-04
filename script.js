//var $listOpenTasks;
//var $listClosedTasks;
var myToDoApp = {};

$(function() {
  $listOpenTasks = $('.open');
  $listClosedTasks = $('.closed');

  // Button holen
  var $buttonAdd = $('.buttonadd');
  var $listOpenTasks = $('.open');
  var $listClosedTasks = $('.closed');

  var taskliste = loadTasks();

  //Eventlistener hinzufügen
  $buttonAdd.on('click', addTask);

  $listOpenTasks.on('click', 'li', removeTask);

  fillTasks(taskliste);

  myToDoApp.test="Test";
  myToDoApp.$listOpenTasks = $('.open');
})

var loadTasks = function() {
  var taskliste = [
    {'caption': "Toast kaufen", 'erledigt': true},
    {'caption': "Milch kaufen", 'erledigt': false},
    {'caption': "Käse kaufen", 'erledigt': true},
    {'caption': "Bier kaufen", 'erledigt': false},
    {'caption': "Fleisch kaufen", 'erledigt': true}
  ];

  return taskliste;
}

var fillTasks = function(taskliste) {
  var $listOpenTasks = $('.open');
  var $listClosedTasks = $('.closed');

  taskliste.forEach(function(task) {
    var $listItem=buildTaskEntry(task.caption);

    if (task.erledigt) {
        $listClosedTasks.prepend($listItem);
    } else {
        $listOpenTasks.append($listItem);
    }
  })
}

var addTask = function() {

  // Eingabefeld holen
  var $inputInhalt = $('.inputsearch');
  var $listOpenTasks = $('.open');

  // Wert auslesen
  var inhaltWert = $inputInhalt.val();

  // Wenn Wert nicht leer ist
  if (inhaltWert !== '') {

    $listOpenTasks.append(buildTaskEntry(inhaltWert));

    $inputInhalt.val('');
  }
}

var buildTaskEntry = function(caption) {
  var $entryTask = $('<li></li>');

  var $divTask = $('<div></div>');
  $divTask.addClass('task');

  var $divTaskSymbols = $('<div></div>');
  $divTaskSymbols.addClass('tasksymbols');

  var $para= $('<p></p>');

  $para.html(caption);

  $divTaskSymbols.append(buildSymbol('fa-clock-o'));
  $divTaskSymbols.append(buildSymbol('fa-tags'));
  $divTask.append($divTaskSymbols);

  $divTask.append($para);
  $divTask.append(buildTaskActions);
  $entryTask.append($divTask);

  return $entryTask;
}

var buildSymbol = function(symbolID) {
  var $divSymbol = $('<div></div>');
  $divSymbol.addClass('symbol');

  var $symbol = $('<i/>');
  $symbol.addClass('fa ' + symbolID + ' fa-2x');
  $symbol.attr('aria-hidden', 'true');

  $divSymbol.append($symbol);

  return $divSymbol;
}

var buildTaskActions = function() {
  var $divTaskActions = $('<div></div>');
  $divTaskActions.addClass('taskactions');

  return $divTaskActions;
}

var removeTask = function() {
  var $listClosedTasks = $('.closed');

  $listClosedTasks.prepend(this);
}

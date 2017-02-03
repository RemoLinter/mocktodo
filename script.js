$(function() {
  // Button holen
  var $buttonAdd = $('.buttonadd');


  //Eventlistener hinzufügen
  $buttonAdd.on('click', addTask);

  var $listOpenTasks = $('.tasklist.open');

  $listOpenTasks.on('click', 'li', removeTask);

})

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

  /*
  var $divTask = $('<div></div>').class('task')

  $entryTask.append($divTask);
  */
  //$entryTask.html(caption);

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

  /*
  var $buttonRemove = $('<button>X</button>');
  $buttonRemove.addClass('hidebutton');
  $buttonRemove.addClass('removeButton');
  $buttonRemove.on('click', removeTask);

  $divTaskActions.append($buttonRemove);
  */

  return $divTaskActions;
}

var removeTask = function() {
  var $listClosedTasks = $('.closed');

  $listClosedTasks.prepend(this);
  //$(this).remove();
}

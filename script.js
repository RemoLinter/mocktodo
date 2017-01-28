$(function() {
  // Button holen
  var $button = $('.buttonadd');

  //Eventlistener hinzufügen
  $button.on('click', addTask);
})

var addTask = function() {

  // Eingabefeld holen
  var $inputInhalt = $('.inputsearch');
  var $listTasks = $('.tasklist');

  // Wert auslesen
  var inhaltWert = $inputInhalt.val();

  // Wenn Wert nicht leer ist
  if (inhaltWert !== '') {

    $listTasks.append(buildTaskEntry(inhaltWert));

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
  $divTask.append(buildRemoveButton);
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

var buildRemoveButton = function() {
  var $buttonRemove = $('<button>X</button>');
  $buttonRemove.addClass('ddd');
  $buttonRemove.on('click', removeTask);
  return $buttonRemove;
}

var removeTask = function() {
  $(this).parent().parent().remove();
}

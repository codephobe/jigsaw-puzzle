(function() {
  // Cache dom
  var startBtn = document.getElementById('startBtn');
  var difficultyBtn = document.getElementById('difficultyBtn');
  var difficultyInp = document.getElementById('difficultyInp');
  var resetBtn = document.getElementById('resetBtn');
  var hintBtn = document.getElementById('hintBtn');

  //Initialize difficulty
  var hardmode = false;

  //Bind events
  difficultyBtn.addEventListener('click', handleDifficulty);
  startBtn.addEventListener('click', startGame);
  resetBtn.addEventListener('click', resetGame);
  hintBtn.addEventListener('click', updateHint);
  hintBtn.addEventListener('mousedown', showHint);
  hintBtn.addEventListener('mouseup', hideHint);

  function handleDifficulty(e) {
    e.preventDefault();
    //Tick/untick checkbox on click
    difficultyInp.checked ? difficultyInp.checked = false : difficultyInp.checked = true; 
    hardmode = !hardmode;
    events.emit('difficulty', hardmode);
  }

  function startGame() {
    events.emit('start', hardmode);
  }

  function resetGame() {
    events.emit('reset');
  }

  function updateHint() {
    events.emit('updateHint');
  }

  function showHint() {
    events.emit('showHint');
  }

  function hideHint() {
    events.emit('hideHint');
  }

})();
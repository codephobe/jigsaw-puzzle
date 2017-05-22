var controls = (function() {
  // cache dom
  var startBtn = document.getElementById('startBtn');
  var difficultyBtn = document.getElementById('difficultyBtn');
  var difficultyInp = document.getElementById('difficultyInp');
  var resetBtn = document.getElementById('resetBtn');
  var hintBtn = document.getElementById('hintBtn');

  var hardmode = false;

  difficultyBtn.addEventListener('click', handleDifficulty)

  function handleDifficulty(e) {
    e.preventDefault();
    difficultyInp.checked ? difficultyInp.checked = false : difficultyInp.checked = true; 
    hardmode = !hardmode;
    // render();
  }

  startBtn.addEventListener('click', function() {
    events.emit('start', hardmode);
  })

  events.on('start', function(data) {
    alert(data);
  })

})();
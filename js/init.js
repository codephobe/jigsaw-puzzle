var init = (function() {
  // cache dom
  var startBtn = document.getElementById('startBtn');
  var difficultyBtn = document.getElementById('difficultyBtn');
  var difficultyInp = document.getElementById('difficultyInp');
  var resetBtn = document.getElementById('resetBtn');
  var hintBtn = document.getElementById('hintBtn');
  var hintImg = document.getElementById('hintImg');


  var hardmode = true;

  var hintCount;

  render();

  function render() {
    hintCount = hardmode ? 3 : 6;
    hintBtn.innerHTML = "Hint: " + hintCount;
  }

  difficultyBtn.addEventListener('click', handleDifficulty)

  function handleDifficulty(e) {
    e.preventDefault();
    // e.stopPropagation();
    difficultyInp.checked ? difficultyInp.checked = false : difficultyInp.checked = true; 
    hardmode = !hardmode;
    render();
  }
  

  startBtn.addEventListener('click', function() {
    startBtn.classList.add('btn-disabled');
    difficultyBtn.classList.add('btn-disabled');
    hintImg.classList.remove('board__show-hint');
    resetBtn.classList.remove('btn-disabled');
    hintBtn.classList.remove('btn-disabled');
    render();
  });

  hintBtn.addEventListener('mousedown', function() {
    hintImg.classList.add('board__show-hint');
  });

  hintBtn.addEventListener('mouseup', function() {
    hintImg.classList.remove('board__show-hint');
    updateHintCount();
  });

  function updateHintCount() {
    if (hintCount !== 0) {
      hintCount--;
      hintBtn.innerHTML = "Hint: " + hintCount;
    } else {
      hintBtn.classList.add('btn-disabled');
    }
  }

})();

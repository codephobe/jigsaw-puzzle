//Handles start and reset events
(function() {

  // Cache DOM
  var piecesWrapper = document.getElementById('piecesWrapper');
  var hexagons = document.querySelectorAll('.board__hexagon');

  var startBtn = document.getElementById('startBtn');
  var difficultyBtn = document.getElementById('difficultyBtn');
  var difficultyInp = document.getElementById('difficultyInp');
  var resetBtn = document.getElementById('resetBtn');
  var timerBtn = document.getElementById('timerBtn');
  var hintBtn = document.getElementById('hintBtn');
  var hintImg = document.getElementById('hintImg');

  var audioReset = document.getElementById('audio-reset');
  var audioButton = document.getElementById('audio-button');

  var pictureList = [];
  for (var i = 5; i <= 45; i++) {
    pictureList.push(i);
  }

  var remainingTime = 0;
  var remainingHints = 0;
  var timerInterval;

  //Bind events
  events.on('start', handleStart);
  events.on('reset', handleReset);
  events.on('updateHint', handleUpdateHint);
  events.on('showHint', handleShowHint);
  events.on('hideHint', handleHideHint);

  function handleStart(hardmode) {
    audioButton.play();
    startBtn.classList.add('btn-disabled');
    difficultyBtn.classList.add('btn-disabled');
    resetBtn.classList.remove('btn-disabled');
    hintBtn.classList.remove('btn-disabled');
    hintImg.classList.remove('board__show-hint');

    scrambleArray(pictureList);

    pictureList.forEach(function(num) {
      piecesWrapper.innerHTML += '<img src="assets/img/Group' + num + '.png" id="piece' + num + '" draggable="true" data-piece="' + num + '">';
    })

    remainingTime = hardmode ? 300 : 480;
    remainingHints = hardmode ? 3 : 6;
    timerInterval = setInterval(updateTimer, 1000);

    setTimeout(function() {
      events.emit('initDnd', timerInterval)
    }, 3000);
  }

  function handleReset() {
    audioReset.play();
    emptyBoard();
    emptyPiecesWrapper();

    clearInterval(timerInterval);
    timerBtn.innerHTML = '8:00';
    hintBtn.innerHTML = 'Hints: 6';
    difficultyInp.checked = false;

    startBtn.classList.remove('btn-disabled');
    difficultyBtn.classList.remove('btn-disabled');
    resetBtn.classList.add('btn-disabled');
    hintBtn.classList.add('btn-disabled');
    hintImg.classList.add('board__show-hint');
  }

  //Utility function to shuffle an array
  function scrambleArray(array) {
    var currentIndex = array.length;
    var temporaryValue;
    var randomIndex;

    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

  function emptyBoard() {
    for (var i = 0; i < hexagons.length; i++) {
      hexagons[i].innerHTML = '';
    }
  }

  function emptyPiecesWrapper() {
    piecesWrapper.innerHTML = '';
  }

  function updateTimer() {
    if (remainingTime !== 0) {
      remainingTime--;
      timerBtn.innerHTML = Math.floor(remainingTime / 60) + ':' + ((remainingTime % 60) < 10 ? '0' : '') + (remainingTime % 60);
    } else {
      events.emit('gameLost');
    }
  }

  function handleUpdateHint() {
    if (remainingHints > 1) {
      remainingHints--;
      hintBtn.innerHTML = "Hints: " + remainingHints;
    } else {
      hintBtn.innerHTML = "Hints: 0";
      hintBtn.classList.add('btn-disabled');
    }
  }

  function handleShowHint() {
    audioButton.play();
    hintImg.classList.add('board__show-hint');
  }

  function handleHideHint() {
    hintImg.classList.remove('board__show-hint');
  }
})();

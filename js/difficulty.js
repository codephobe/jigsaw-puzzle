(function() {
	//Cache DOM
	var timerBtn = document.getElementById('timerBtn');
	var hintBtn = document.getElementById('hintBtn');

	events.on('difficulty', handleDifficulty);

	initTimer();
	initHints();

	function handleDifficulty(difficulty) {
		initTimer(difficulty);
		initHints(difficulty);
	}

	function initTimer(difficulty) {
		if(difficulty) {
			timerBtn.innerHTML = '5:00';
		} else {
			timerBtn.innerHTML = '8:00';
		}
	}

	function initHints(difficulty) {
		var hints = difficulty ? 3 : 6;
		hintBtn.innerHTML = 'HINTS: ' + hints;
	}
})();
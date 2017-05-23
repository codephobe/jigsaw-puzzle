(function() {
  var audioVictory = document.getElementById('audio-victory');

  //Bind Events
  events.on('gameLost', handleGameLost);
  events.on('gameWon', handleGameWon);

  function handleGameLost(obj) {
    events.emit('reset');
  }

  function handleGameWon(obj) {
    clearInterval(obj.timerInterval);
    audioVictory.play();

    for (var i = 0; i < obj.dropzones.length; i++) {
      setTimeout(function(i) {
        obj.dropzones[i].classList.add('victory-dance');
      }.bind(null, i), i*60);
    }
  }
})();

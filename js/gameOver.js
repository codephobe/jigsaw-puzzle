(function() {
  //Bind Events
  events.on('gameLost', handleGameLost);
  events.on('gameWon', handleGameWon);

  function handleGameLost(obj) {
    events.emit('reset');
  }

  function handleGameWon(obj) {
    clearInterval(obj.timerInterval);

    for (var i = 0; i < obj.dropzones.length; i++) {
      setTimeout(function(i) {
        obj.dropzones[i].classList.add('victory-dance');
      }.bind(null, i), i*60);
    }
  }
})();
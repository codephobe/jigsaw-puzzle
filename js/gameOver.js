(function() {
  //Bind Events
  events.on('gameLost', handleGameLost);
  events.on('gameWon', handleGameWon);

  function handleGameLost() {
    events.emit('reset');
  }

  function handleGameWon(dropzones) {
    for (var i = 0; i < dropzones.length; i++) {
      setTimeout(function(i) {
        dropzones[i].classList.add('victory-dance');
      }.bind(null, i), i*60);
    }
  }
})();
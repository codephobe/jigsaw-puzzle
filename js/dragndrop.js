(function() {

  events.on('initDnd', initDnd);

  function initDnd(timerInterval) {
    var timerInterval = timerInterval;
    var pieces = document.querySelectorAll('.pieces__wrapper img');
    var dropzones = document.querySelectorAll('.board__wrapper .board__hexagon');
    var correctPieces = 0;

    for (var i = 0; i < pieces.length; i++) {
      pieces[i].addEventListener('dragstart', handleDrag);
    }

    function handleDrag(e) {
      e.dataTransfer.setData("text/plain", e.target.id);
      if (e.target.parentNode.classList.contains('board__hexagon')) {
        e.target.parentNode.dataset.empty = "true";
      }
    }

    for (var i = 0; i < dropzones.length; i++) {
      dropzones[i].addEventListener('dragover', handleDragOver);
      dropzones[i].addEventListener('drop', handleDrop);
    }

    function handleDragOver(e) {
      e.preventDefault();
      e.dataTransfer.dropEffect = "move"
    }

    function handleDrop(e) {
      e.preventDefault();
      // Get the id of the target and add the moved element to the target's DOM
      var data = e.dataTransfer.getData("text");
      var movedPiece = document.getElementById(data);

      if (e.target.dataset.empty === "true") {
        e.target.appendChild(movedPiece);
        e.target.dataset.empty = "false";

        if (movedPiece.dataset.piece === this.dataset.piece) {
          movedPiece.setAttribute('draggable', false);
          movedPiece.style.cursor = 'not-allowed';
          movedPiece.classList.add('placed-correctly');
          correctPieces++;
          checkCorrectPieces();
        }
      }
    }

    function checkCorrectPieces() {
      if (correctPieces === 41) {
        events.emit('gameWon', {
          dropzones: dropzones,
          timerInterval: timerInterval
        });
      }
    }

  }

})();

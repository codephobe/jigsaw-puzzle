var scramble = (function() {
  // Cache DOM
  var container = document.getElementById('piecesWrapper');

  var pictureList = [];

  for(var i=5; i<=45 ; i++) {
    pictureList.push(i);
  }

  function scramble(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

  scramble(pictureList);

  pictureList.forEach(function(num) {
    container.innerHTML += '<img src="assets/img/Group' + num + '.png" id="piece' + num + '" draggable="true" data-piece="' + num + '">';
  })

})();
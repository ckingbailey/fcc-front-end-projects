(function makeRain(){
  var dropsCount = 200;
  var appendHere = document.querySelector('.sky');
  var appendMe = document.createElement('div');
  var layers = ['foreground', 'midground', 'background'];

  function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  appendHere.setAttribute('class', 'sky rain5xx');

  for(var i=0; i<layers.length; i++){

    appendMe = document.createElement('div');
    appendMe.className = layers[i];
    appendHere.appendChild(appendMe);

    appendHere = appendMe;

    for(let j=1; j<dropsCount; j++){
      var dropTop = randomInt(-120,99) + 'vh';
      var dropRight = randomInt(0,100) + 'vw';
      var anim = 'rain-fall-' + randomInt(1,3);

      appendMe = document.createElement('div');
      appendMe.className = 'rain-drop';
      appendMe.style.left = dropRight;
      appendMe.style.top = dropTop;
      appendMe.style.animationName = anim;
      appendHere.appendChild(appendMe);
    }

    appendHere = document.querySelector('.sky');
  }
})();

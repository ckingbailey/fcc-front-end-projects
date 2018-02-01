export default function snow(){
  var dropsCount = 70;
  var appendHere = document.querySelector('.sky');
  var appendMe = document.createElement('div');
  var layers = ['foreground', 'midground', 'background'];

  function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  function randomFlt(min, max) {
    return Math.random() * (max - min + 1) + min;
  }

  appendHere.classList.add('snow6xx');

  for(var i=0; i<layers.length; i++){

    appendHere = document.querySelector('.' + layers[i]);

    for(var j=1; j<dropsCount; j++){
      var flakeTop = randomInt(-1,-9) + 'vh';
      var flakeRight = randomFlt(0,100) + 'vw';
      var animDelay = randomFlt(0 + i/4,10 + i) + 's';
      //var driftTime = randomFlt(3,6) + 's';

      appendMe = document.createElement('div');
      appendMe.className = 'snow-flake';
      appendMe.style.left = flakeRight;
      appendMe.style.top = flakeTop;
      appendMe.style.animationDelay = animDelay;
      appendHere.appendChild(appendMe);
    }
  }
}

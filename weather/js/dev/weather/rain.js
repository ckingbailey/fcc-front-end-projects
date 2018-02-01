import randomInt, {randomFlt} from '../utils/randomRolls';

export default function rain(weatherType, number, left, right){
  var dropsCount = number;
  var appendHere = document.querySelector('.sky');
  var appendMe = document.createElement('div');
  var layers = ['foreground', 'midground', 'background'];

  appendHere.classList.add(weatherType);

  for(var i=0; i<layers.length; i++){

    appendHere = document.querySelector('.' + layers[i]);

    for(var j=1; j<dropsCount; j++){
      var dropTop = randomInt(-120,99) + 'vh';
      var dropRight = randomInt(left,right) + 'vw';
      var anim = 'rain-fall-' + randomInt(1,3);

      appendMe = document.createElement('div');
      appendMe.classList.add('rain-drop');
      appendMe.style.left = dropRight;
      appendMe.style.top = dropTop;
      appendMe.style.animationName += anim;
      appendHere.appendChild(appendMe);
    }
  }
}

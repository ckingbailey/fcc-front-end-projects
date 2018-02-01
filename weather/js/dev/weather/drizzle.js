import randomInt, {randomFlt} from '../utils/randomRolls';

export default function drizzle(){
  var dropsCount = 50;
  var appendHere = document.querySelector('.sky');
  var appendMe = document.createElement('div');
  var layers = ['foreground', 'background', 'midground'];

  appendHere.classList.add('drizzle3xx');

  for(var i=0; i<layers.length; i++){

    appendHere = document.querySelector('.' + layers[i]);

    for(var j=0; j<dropsCount; j++){
      var dropTop = randomInt(-120,129) + 'vh';
      var dropRight = randomInt(0,100) + 'vw';
      var anim = 'drizzle-fall-' + randomInt(1,3);

      appendMe = document.createElement('div');
      appendMe.classList.add('rain-drop');
      appendMe.style.left = dropRight;
      appendMe.style.top = dropTop;
      appendMe.style.animationName = anim;
      appendHere.appendChild(appendMe);
    }
  }
}

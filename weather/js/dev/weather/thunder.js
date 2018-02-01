import randomInt, {randomFlt} from '../utils/randomRolls';

export default function thunder() {

var appendHere = document.querySelector('.sky');
var appendMe = document.createElement('div');
var b, w, l, viewW;
var styles;

appendHere.classList.add('thunder2xx');

appendMe = document.createElement('div');

//make cloud puffs
cloudPuffs('.foreground');

cloudPuffs('.background');

//make lightning (static for the mo')
appendMe = document.createElement('div');
appendMe.classList.add('lightning');
appendHere = document.querySelector('.midground');

appendHere.appendChild(appendMe);

//clouds puffs maker function
function cloudPuffs(selector) {
  l = -1;
  appendHere = document.querySelector(selector);

  for(viewW = 100; viewW > 0; viewW -= (w - 1)){
    appendMe = document.createElement('div');

    appendMe.classList += 'puff';

//what ranges am I trying to acheive here?
//find a way to use randomInt() instead
    w = randomInt(3,9);
    b = -(randomFlt(1,1.125));

    styles = 'width: ' + w + 'vw; left: ' + l + 'vw; bottom: ' + b + 'rem';
    appendMe.setAttribute('style', styles);

    appendHere.appendChild(appendMe);

    l += w - 1;
  }
}

function moveLightning(){

  appendMe.style.left = randomFlt(-20, 80) + 'vw';

};

appendMe.addEventListener('animationiteration', moveLightning);

}

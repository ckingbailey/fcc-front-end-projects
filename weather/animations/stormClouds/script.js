function thunder() {

var appendHere = document.querySelector('.sky');
var appendMe = document.createElement('div');
var b, w, l, viewW;
var styles;

appendHere.classList += 'thunder';

appendMe = document.createElement('div');

//make cloud puffs
cloudPuffs('div.foreground');

cloudPuffs('div.midground');

//make lightning (static for the mo')
appendMe = document.createElement('div');
appendMe.setAttribute('class','lightning');

appendHere.insertAdjacentElement('afterend', appendMe);

function cloudPuffs(selector) {
  l = -1;
  appendHere = document.querySelector(selector);

  for(viewW = 100; viewW > 0; viewW -= (w - 1)){
    appendMe = document.createElement('div');

    appendMe.setAttribute('class','puff');

    w = (Math.floor(Math.random() * (36 - 12) + 12))/4;
    b = -1 - (Math.floor(Math.random() * 2))/8;

    styles = 'width: ' + w + 'vw; left: ' + l + 'vw; bottom: ' + b + 'rem';
    appendMe.setAttribute('style', styles);

    appendHere.appendChild(appendMe);

    l += w - 1;
  }
}

function lightning(){

//appendHere = .midground



};
}

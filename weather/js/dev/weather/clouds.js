export default function clouds(){
  var layers = ['foreground', 'midground', 'background'];
  var appendHere = document.querySelector('.sky');
  var appendMe = document.createElement('div');

  appendHere.classList.add('clouds8xx');

//make clouds in css
  for(var i=0; i<layers.length; i++){
    appendHere = document.querySelector('.' + layers[i]);

    appendMe.classList.add('cloud' + (i + 1));
    appendHere.appendChild(appendMe);

//make clouds loop back to offscreen left on first animation iteration
    /*appendMe.addEventListener('animationiteration', function() {
      var w = window.getComputedStyle(this).width.match(/(\d+)(\D+)/);

      this.style.left = -(parseInt(w[1], 10) + (parseInt(w[1], 10) * 0.05)) + w[2];
    }, {once: true});*/

    appendMe = document.createElement('div');
  }

//create the sun in css
  appendMe.classList.add('sun');
  appendHere.insertAdjacentElement('afterbegin', appendMe);

  appendHere = appendMe;
  appendMe = document.createElement('div');
  appendMe.classList.add('ray-box');
  appendHere.appendChild(appendMe);

  appendHere = appendMe;

//make rays of sun in css
  for(var i = 1; i <= 10; i++) {
    appendMe = document.createElement('div');
    appendMe.classList.add('ray');
    appendMe.classList.add('ray' + i);
    appendHere.appendChild(appendMe);
  }
}

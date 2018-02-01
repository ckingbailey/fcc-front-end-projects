export default function clear(){
  var layers = ['foreground', 'midground', 'background'];
  var appendHere = document.querySelector('.sky');
  var appendMe = document.createElement('div');

  appendHere.classList.add('clear800');
  appendHere = document.querySelector('.' + layers[2]);

  appendMe.classList.add('sun');
  appendHere.appendChild(appendMe);

  appendHere = appendMe;
  appendMe = document.createElement('div');
  appendMe.classList.add('ray-box');
  appendHere.appendChild(appendMe);

  appendHere = appendMe;

  for(var i = 1; i <= 10; i++) {
    appendMe = document.createElement('div');
    appendMe.classList.add('ray');
    appendMe.classList.add('ray' + i);
    appendHere.appendChild(appendMe);
  }


}

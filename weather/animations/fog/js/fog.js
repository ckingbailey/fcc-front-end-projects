var appendMe = document.createElement('div');
var appendHere = document.querySelector('.sky');
var layers = ['sub', 'background','midground','foreground','sup'];

appendHere.classList += ' fog';

for(i=0; i<layers.length; i++){
  appendMe.setAttribute('class',layers[i]);
  appendHere.appendChild(appendMe);
  appendHere = appendMe;

  for(j=1; j<=3; j++){
    appendMe = document.createElement('div');
    appendMe.classList += 'fog-' + j;
    appendHere.appendChild(appendMe);
  }
  appendMe = document.createElement('div');
  appendHere = document.querySelector('.sky');
}
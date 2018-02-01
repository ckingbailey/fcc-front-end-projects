export default function fog() {
  var appendMe = document.createElement('div');
  var appendHere = document.querySelector('.sky');
  var layers = ['sub', 'background','midground','foreground','sup'];

  appendHere.classList.add('fog7xx');

  for(var i=0; i<layers.length; i++){
    if(!document.querySelector('.' + layers[i])){
      appendMe.classList.add(layers[i]);

      if(i == 0){
        appendHere.insertAdjacentElement('afterbegin', appendMe);
      }

      else {
      appendHere.appendChild(appendMe);
      }

      appendHere = appendMe;
    }

    else appendHere = document.querySelector('.' + layers[i]);

    for(var j=1; j<=3; j++){
      appendMe = document.createElement('div');
      appendMe.classList.add('fog-' + j);
      appendHere.appendChild(appendMe);
    }
    appendMe = document.createElement('div');
    appendHere = document.querySelector('.sky');
  }
}

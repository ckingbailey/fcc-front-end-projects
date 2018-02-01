export default function windy(leafCt) {
  var appendHere, appendMe;

  for(var i = 0; i < leafCt; i++){
    appendHere = document.createElement('div');
    appendHere.classList.add('leaf');

    ['leaf-top', 'leaf-bottom', 'leaf-stem'].forEach(function(leaf){
      appendMe = document.createElement('div');
      appendMe.classList.add(leaf);
      appendHere.appendChild(appendMe);
    });
    appendMe = appendHere;
    appendHere = document.querySelector('.sky');
    appendHere.classList.add('windy');
    console.log(appendHere);
    appendHere.appendChild(appendMe);
  }
}

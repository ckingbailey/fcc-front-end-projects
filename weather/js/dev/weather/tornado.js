export default function tornado() {

  var appendHere = document.querySelector('.sky');
  var partCt = +(window.getComputedStyle(appendHere).height.match(/\d+/))/10;
  var layerCt = 6;
  var b, c, l, appendMe, comSty, offset, rate, run;

  appendHere.classList.add('tornado');

  for(var i = 0; i < layerCt; i++) {
    appendMe = document.createElement('div');
    appendMe.classList.add('layer', 'layer-' + (i+1));
    appendHere.appendChild(appendMe);
  }

  appendMe = document.querySelector('.layer-1');

  //length of run of slope = the difference between the width of layers 1 & 2
  run = window.getComputedStyle(document.querySelector('.layer-2')).width.match(/\d+\.*\d*/)[0] - window.getComputedStyle(appendMe).width.match(/\d+\.*\d*/)[0];

  offset = window.getComputedStyle(appendMe).width.match(/\d+\.*\d*/)[0] - run;

  //rise/run = height of layer element / length of run of slope
  rate = window.getComputedStyle(appendMe).height.match(/\d+\.*\d*/)[0] / run;

  function randomFlt(min, max) {
    return Math.random() * (max - min) + min;
  }

  //grab layers and layer styles to contain particles
  for(var i = 0; i < layerCt; i++) {
    appendHere = document.querySelector('.layer-' + (i+1));
    comSty = window.getComputedStyle(appendHere);

    comSty = {
      wd: comSty.width.match(/(\d+\.*\d*)(\D+)/),
      ht: comSty.height.match(/(\d+\.*\d*)(\D+)/)
    };

    comSty.wd[1] = +(comSty.wd[1]);
    comSty.ht[1] = +(comSty.ht[1]);

  //create particles within current layer
    for(var j = 0; j < partCt * comSty.wd[1] / comSty.ht[1]; j++) {
      b = randomFlt(-1,20);
      c = (comSty.wd[1] - ((comSty.wd[1] - l) * 2))/2;

      appendMe = document.createElement('div');
      appendMe.classList.add('particle');
      appendMe.style.bottom = b + 'vh';
      //console.log('bottom,', window.getComputedStyle(appendMe));
      //b = window.getComputedStyle(appendMe).bottom.match(/\d+\.*\d*/)[0];
      l = randomFlt(b/rate + (comSty.wd[1] - run), b/rate + comSty.wd[1]);
      appendMe.style.left = l + comSty.wd[2];
      appendMe.style.height = randomFlt(.1,.25) + 'rem';
      appendMe.style.width = randomFlt(.15,.35) + 'rem';
      appendMe.style.transformOrigin = -l + 'px';

      appendMe.setAttribute('c', c);

      if(c <= 0) {
        appendMe.style.animationDuration = randomFlt((c * -1) ** .02, (c* -1) ** .1) + 's';
      }
      else appendMe.style.animationDuration = randomFlt(c ** .01, c ** .08) + 's';

      //appendMe.style.backgroundColor = '#664';
      //appendMe.style.transform = 'rotateY(' + randomFlt(0,360) + 'deg)';
      appendHere.appendChild(appendMe);
    }

  }

  document.querySelectorAll('.particle').forEach(function(el) {
    el.style.opacity = 1;
  });
}

export function colorParticles() {
  document.querySelectorAll('.particle').forEach(function(el) {
      el.style.opacity = 1;
  });
}

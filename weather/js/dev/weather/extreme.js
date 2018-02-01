import clear from './clear';
import clouds from './clouds';
import rain from './rain';
import thunder from './thunder';
import tornado from './tornado';
import windy from './windy';

export default function extreme(id){
  var appendHere = document.querySelector('.sky');
  var appendMe;

  switch (id) {
    case 900: {
      tornado();
      break;
    } //complete
    case 901: { //'tropical-storm'
      extreme(902);
      break;
    } //complete
    case 902: {
      rain('hurricane', 250, -40, 125);
      //add wind
      var drops = document.querySelectorAll('.rain-drop');
      drops.forEach(function(el) {
        el.style.animationName += ', wind-1';
      });
      break;
    } //complete
    case 903: {
      appendHere.classList.add('cold903');
      break;
    }//complete
    case 904: {
      appendHere.classList.add('hot904');
      break;
    }//done
    case 905: { //'windy'
      //clouds();
      //document.querySelectorAll('[class^=cloud]').forEach(function(cloud){
        //cloud.style.animationDuration = +(window.getComputedStyle(cloud).animationDuration.match(/\d+\.*\d*/)) / 12 + 's';
      //});
      windy(10);
      break;
    }
    case 906: {
      rain('hail', 100, 0, 100);
      break;
    }
    default:
      break;
  }
}

export function other(id) {
  //var appendHere = document.querySelector('.sky');
  //var appendMe;

  switch (id) {
    case 951: {
      clear();
      break;
    }
    case 952: {  //'light-breeze'
      windy(3);
      document.querySelectorAll('.leaf').forEach(function(leaf){
        leaf.classList.add('lo');
      });
      break;
    }
    case 953: { // 'gentle-breeze'
      windy(3);
      document.querySelectorAll('.leaf').forEach(function(leaf){
        leaf.classList.add('lo');
      });
      break;
    }
    case 954: { // 'moderate-breeze'
      windy(5);
      document.querySelectorAll('.leaf').forEach(function(leaf){
        leaf.classList.add('lo');
      });
      break;
    }
    case 955: { // 'fresh-breeze'
      windy(5);
      document.querySelectorAll('.leaf').forEach(function(leaf){
        leaf.classList.add('lo');
      });
      break;
    }
    case 956: { // 'strong-breeze'
      windy(7);
      document.querySelectorAll('.leaf').forEach(function(leaf){
        leaf.classList.add('lo');
      });
      break;
    }
    case 957: { // 'high-wind'
      windy(15);
      document.querySelectorAll('.leaf').forEach(function(leaf){
        leaf.classList.add('hi');
      });
      break;
    }
    case 958: { // 'gale'
      windy(15);
      document.querySelectorAll('.leaf').forEach(function(leaf){
        leaf.classList.add('hi');
      });
      break;
    }
    case 959: { // 'severe-gale'
      windy(20);
      document.querySelectorAll('.leaf').forEach(function(leaf){
        leaf.classList.add('hi');
      });
      break;
    }
    case 960: {
      thunder();
      break;
    }
    case 961: { // 'violent-storm'
      extreme(902);
      break;
    }
    case 962: {
      extreme(902);
      break;
    }
  }
}

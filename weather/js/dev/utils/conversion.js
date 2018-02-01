import {temperature} from '../ajax/fetchAPIs';

export {unitsBtn};
/*-_-*-_-*-_-*-_-*-_-*-_-*-_-
function used by units-switching button
-_-*-_-*-_-*-_-*-_-*-_-*-_-*/
var c, f;
var unitsBtn = document.querySelector('.switch');

export default function convert(){
  if($(".temp").hasClass("degF")){
    console.log('var temperature ==', temperature);
    c = Math.round((temperature - 32) * 5 / 9);
    console.log('c ==', c);
    $(".temp").removeClass("degF");
    $(".switch").text("F");
    $(".temp").text(Math.round(c) + " C")
  }

  else {
    console.log('var temperature ==', temperature);
    f = temperature;
//    f = Math.round((t * 9 / 5) + 32);
    console.log(f);
    $(".temp").addClass("degF");
    $(".switch").text("C");
    $(".temp").text(Math.round(f) + "\xb0 F")
  }
  //console.log(temperature);
}

unitsBtn.addEventListener('click', convert);

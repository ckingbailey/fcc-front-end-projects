import { temperature } from '../ajax/getWeather';

// function used by units-switching button
export default function convert() {
  var c;
  var f;
  var temp = document.querySelector('.temp');
  var unitsBtn = document.querySelector('./switch');
  if (temp.classList.includes('degF')) {
    c = Math.round((temperature - 32) * 5 / 9);
    temp.classList.remove('degF');
    temp.classList.add('degC');
    unitsBtn.innerText = 'F';
    temp.innerText = Math.round(c) + ' C';
  } else {
    f = temperature;
    temp.classList.remove('degC');
    temp.classList.add('degF');
    unitsBtn.innerText = 'C';
    temp.innerText = Math.round(f) + '\xb0 F';
  }
}

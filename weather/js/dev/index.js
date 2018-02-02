import animateWeather from './weather/animateWeather';
import convert from './utils/convert';
import { getWeather, getLocation } from './ajax/getWeather';

getLocation('http://ip-api.com/json', function(location) {
  getWeather(location, function(weatherId) {
    animateWeather(weatherId);
  });
});

// TODO: make this use ID instead of class
var unitsBtn = document.querySelector('.switch');
unitsBtn.addEventListener('click', convert);

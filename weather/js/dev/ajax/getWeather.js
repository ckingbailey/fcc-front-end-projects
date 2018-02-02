import animateWeather from '../weather/animateWeather';
import superagent from 'superagent';

export var temperature;

// build query url and request AJAX
export function getWeather(loc, fcn) {
  // TODO: use IDs instead of classes to grab these elements
  var temp = document.querySelector('.temp');
  var description = document.querySelector('weather');
  // AJAX weather request
  superagent('GET', 'https://sheltered-dusk-25569.herokuapp.com/')
    .end((err, res) => {
      if (err) {
        console.error(err);
        // TODO: make this use `description` element instead of `temp`
        // TODO: add `error` class to element & style it
        temp.innerText = 'There was a problem with the weather request<br>' + err;
      } else if (res.ok) {
        temp.innerText = Math.round(res.main.temp) + '\xb0 F';
        temp.classList.add('degF');
        description.innerText = res.weather[0].description;
        fcn(res.weather[0].id);
      }
    });
}

/*
 function to get location
 then fire location-dependent fcns
 such as get weather fcn
*/
export function getLocation(locAPI, fcn) {
  var locale = document.querySelector('.locale');
  var temp = document.querySelector('.temp');
  superagent('GET', locAPI)
    .end((err, res) => {
      if (err) {
        console.error(err);
        temp.innerText = 'There was a problem with the location request: ' + err;
      } else if (res.ok) {
        locale.innerText = res.city + ', ' + res.regionName + ' ' + res.zip + ', ' + res.country;
        fcn(res);
      }
    });
}

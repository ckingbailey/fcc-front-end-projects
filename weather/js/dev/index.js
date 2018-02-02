import animateWeather from './weather/animateWeather';
import { getWeather, getLocation } from './ajax/getWeather';

getLocation('http://ip-api.com/json', function(location) {
  getWeather(location, function(weatherId) {
    animateWeather(weatherId);
  });
});

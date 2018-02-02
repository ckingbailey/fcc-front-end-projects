import { randomInt, randomFlt } from './utils/randomRolls';
import clear from './weather/clear';
import clouds from './weather/clouds';
import drizzle from './weather/drizzle';
import extreme from './weather/extreme';
import fog from './weather/fog';
import rain from './weather/rain';
import snow from './weather/snow';
import thunder from './weather/thunder';
import tornado from './weather/tornado';
import animateWeather from './weather/animateWeather';
import {temperature, getWeather, getLocation} from './ajax/getWeather';
import convert, {unitsBtn} from './utils/conversion';

getLocation('http://ip-api.com/json', function(location) {
  getWeather(location, function(weatherId) {
    animateWeather(weatherId);
  });
});

import randomInt from '../utils/randomRolls';
import randomFlt from '../utils/randomRolls';
import clear from './clear';
import clouds from './clouds';
import drizzle from './drizzle';
import extreme, {other} from './extreme';
import fog from './fog';
import rain from './rain';
import snow from './snow';
import thunder from './thunder';

export default function animateWeather(weatherId) {
  if (weatherId >= 200 && weatherId < 300) {
    thunder();
  }
  else if (weatherId >= 300 && weatherId < 400) {
    rain('drizzle', 50, 0, 100);
  }
  else if (weatherId >= 500 && weatherId < 600) {
    rain('rain', 200, 0, 100);
  }
  else if (weatherId >= 600 && weatherId < 700) {
    snow();
  }
  else if (weatherId >= 700 && weatherId < 800) {
    fog();
  }
  else if (weatherId === 800) {
    clear();
  }
  else if (weatherId > 800 && weatherId < 900) {
    clouds();
  }
  else if (weatherId >= 900 && weatherId <= 950) {
    extreme(weatherId);
  }
  else if (weatherId > 950 && weatherId < 1000) {
    other(weatherId);
  }
  else clear();
}

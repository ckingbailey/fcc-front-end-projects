import { randomInt, randomFlt } from '../utils/randomRolls';
import clouds from '../weather/clouds';
import drizzle from '../weather/drizzle';
import fog from '../weather/fog';
import rain from '../weather/rain';
import snow from '../weather/snow';
import thunder from '../weather/thunder';
import animateWeather from '../weather/animateWeather';

export var temperature;

/*-_-*-_-*-_-*-_-*-_-*-_-*-_-*-_-*-_-*-_-
  build query url and request AJAX
-_-*-_-*-_-*-_-*-_-*-_-*-_-*-_-*-_-*-_-*/

export function requestWeather(loc){
// building the uri weather query string
  var url = "http://api.openweathermap.org/data/2.5/weather?",
      lat = "lat=" + loc.lat.toString().slice(0,loc.lat.toString().indexOf(".")+3),
      lon = "lon=" + loc.lon.toString().slice(0,loc.lon.toString().indexOf(".")+3);

  url += lat + "&" + lon + key;

/*-_-*-_-*-_-*-_-*-_-*-_-*-_-*-_-*-_-
  AJAX weather request
-_-*-_-*-_-*-_-*-_-*-_-*-_-*-_-*-_-*/
  $.ajax({
    url: url,
    type: 'GET',
    dataType: 'jsonp',

  /*-_-*-_-*-_-*-_-*-_-*-_-*-_-*-_-*
    success function
  -_-*-_-*-_-*-_-*-_-*-_-*-_-*-_-*/
    success: function publishWeather(api){
      //console.log("weather object: ", api);
      //console.log("api.main.temp = ", api.main.temp);
      temperature = Math.round(api.main.temp);
      console.log("rounded 'temperature' = ", temperature);
      $(".temp").text(temperature + "\xb0 F").addClass("degF");
      $(".weather").text(api.weather[0].description);
      console.log(api);
      animateWeather(api.weather[0].id);
    },
    xhrField: {
      withCredentials: true
    },
    error: function(api,errorText) {
      //console.log(api);
      $(".temp").text("There was a problem with the weather request<br>" + errorText);
    }
  });

}

/*-_-*-_-*-_-*-_-*-_-*-_-*
 function to get location
 then fire location-dependent fcns
 such as get weather fcn
_-*-_-*-_-*-_-*-_-*-_-*-_-*/
export function getLocalWeather(locURL, weatherFcn){
  $.ajax({
    url: locURL,
    type: 'GET',
    dataType: 'jsonp',
    success: function(json){
      $(".locale").text(json.city + ", " + json.regionName + " " + json.zip + ", " + json.country);
      weatherFcn(json);
    },
    xhrField: {
      withCredentials: true
    },
    error: function(json,errorText) {
      //console.log(json);
      $(".locale").text("There was a problem with the location request: ", errorText);
    }
  });
}

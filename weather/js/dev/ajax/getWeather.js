import animateWeather from '../weather/animateWeather';
import superagent from 'superagent';

export var temperature;

// build query url and request AJAX
export function requestWeather(loc) {
// building the uri weather query string
  var url = 'http://api.openweathermap.org/data/2.5/weather?';
  var lat = 'lat=' + loc.lat.toString().slice(0, loc.lat.toString().indexOf('.') + 3);
  var lon = 'lon=' + loc.lon.toString().slice(0, loc.lon.toString().indexOf('.') + 3);

  // AJAX weather request
  // this should use fetch instead
  $.ajax({
    // this fcn now makes post request, sends lat&lon, receives weather back
    url: url,
    type: 'GET',
    dataType: 'jsonp',
    // success function
    success: function publishWeather(api) {
      temperature = Math.round(api.main.temp);
      console.log("rounded 'temperature' = ", temperature);
      $('.temp').text(temperature + '\xb0 F').addClass('degF');
      $('.weather').text(api.weather[0].description);
      console.log(api);
      animateWeather(api.weather[0].id);
    },
    xhrField: {
      withCredentials: true
    },
    error: function(api, errorText) {
      $('.temp').text('There was a problem with the weather request<br>' + errorText);
    }
  });
}

/*
 function to get location
 then fire location-dependent fcns
 such as get weather fcn
*/
export function getLocalWeather(locURL, weatherFcn) {
  $.ajax({
    url: locURL,
    type: 'GET',
    dataType: 'jsonp',
    success: function(json) {
      $('.locale').text(json.city + ', ' + json.regionName + ' ' + json.zip + ', ' + json.country);
      weatherFcn(json);
    },
    xhrField: {
      withCredentials: true
    },
    error: function(json, errorText) {
      $('.locale').text('There was a problem with the location request: ', errorText);
    }
  });
}

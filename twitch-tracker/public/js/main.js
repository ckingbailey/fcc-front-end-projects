/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/Users/ckingbailey/Sites/git/fcc-front-end/twitch-tracker/public/js";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__api_calls_fetch_key__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__api_calls_fetch_twitch__ = __webpack_require__(2);



const main = document.getElementById('mainContainer')
const isProd = window.env && window.env.production
const endpoint = isProd
  ? 'https://sheltered-dusk-25569.herokuapp.com/twitch' : 'http://localhost:3001/twitch'
const usersList = ['idlethumbs', 'freecodecamp']
console.log('isProd? ' + isProd, 'api endpoint: ' + endpoint)

function createStreamContainer(streamData) {
  const userContainer = document.createElement('div')
  const userIcon = document.createElement('img')
  const userHeading = document.createElement('h2')
  const userDescrip = document.createElement('p')
  const curStream = document.createElement('p')
  const lastStream = document.createElement('p')
  userContainer.classList.add('streamer-container')
  userContainer.id = `${streamData.login}Avatar`
  userIcon.classList.add('streamer-avatar')
  userIcon.src = streamData.profile_image_url
  userContainer.appendChild(userIcon)
  userHeading.classList.add('streamer-name')
  userHeading.innerText = streamData.display_name
  userContainer.appendChild(userHeading)
  userDescrip.classList.add('description')
  userDescrip.innerText = streamData.description
  userContainer.appendChild(userDescrip)
  curStream.classList.add('current-stream')
  userContainer.appendChild(curStream)
  lastStream.classList.add('prev-stream')
  userContainer.appendChild(lastStream)
  main.appendChild(userContainer)
  // TODO: what data do I want to display?
  // user name, whether they are streaming, what they are streaming, for how long, how many viewers
}

// grab key from my server then query for user streams
// if no streams, query those logins for user data
// TODO: what user data is displayed?
Object(__WEBPACK_IMPORTED_MODULE_0__api_calls_fetch_key__["a" /* default */])(endpoint, clientId => {
  console.log(clientId)
  if (clientId) {
    Object(__WEBPACK_IMPORTED_MODULE_1__api_calls_fetch_twitch__["a" /* getStreams */])(usersList, clientId, streamData => {
      // TODO: this should iterate over data
      // passing each entry to cSC
      // if no data at an entry, call getUsers()
      console.log('users list:', usersList, 'getStreams response:', streamData)
      if (!streamData) {
        Object(__WEBPACK_IMPORTED_MODULE_1__api_calls_fetch_twitch__["b" /* getUsers */])(usersList, clientId, usersData => {
          console.log('users list:', usersList, 'getUsers response:', usersData)
          if (usersData.data) {
            usersData.data.forEach(obj => {
              createStreamContainer(obj)
            })
          }
        })
      }
    })
  }
})


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = getKey;
function getKey(target, fn) {
  window.fetch(target)
    .then(res => {
      return res.text()
    })
    .then(key => {
      fn(key)
    })
    .catch(err => {
      throw new Error(err)
    })
}


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return getStreams; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return getUsers; });
// users endpoint: GET https://api.twitch.tv/helix/users
// users query params: ?id=<String>&login=<String>
// user response: data: { display_name: String, id: String, offline_image-url: String, profile_image_url: String }
// streams endpoint: GET https://api.twitch.tv/helix/streams
// streams qry params: ?user_id=<String>&user_login=<String>&type=<"all"|"live"|"vodcast">&
// streams response: data: { pagination: String, started_at: String, thumbnail_url: String, title: String, type: "live"|"vodcast"|"", user_id: String, viewer_count: Number }
// application/vnd.twitchtv.v<version>+json

// fetch streams
// if user is not streaming, fetch users and display information about user

// constants
const endpoint = 'https://api.twitch.tv/helix'
const options = {
  Method: 'GET',
  headers: { 'Client-ID': '' }
}

function parseUsers(users, paramName) {
  if (typeof users === 'object') {
    const usersList = users.reduce((acc, user, i, arr) => {
      if (i !== 0) {
        acc += '&'
      }
      acc += paramName + '=' + user
      return acc
    }, '')
    return usersList
  } else return `${paramName}=${users}`
}

function wtf() {
  console.log('wtf hapnd?', arguments)
}

function getUsers(users, key, fn) {
  const target = endpoint + '/users?' + parseUsers(users, 'login')
  console.log('users target', target)
  options.headers['Client-ID'] = key
  window.fetch(target, options)
    .then(res => {
      console.log('res.headers:', res.headers)
      return res.json()
    })
    .then(json => {
      fn(json)
    })
    .catch(err => {
      // TODO: better error handling than this
      wtf(err)
    })
}

function getStreams(users, key, fn) {
  const target = endpoint + '/streams?' + parseUsers(users, 'user_login')
  console.log('streams target', target)
  options.headers['Client-ID'] = key
  window.fetch(target, options)
    .then(res => {
      res.json()
    })
    .then(json => {
      fn(json)
    })
    .catch(err => {
      // TODO: better error handling than this
      wtf(err)
    })
}




/***/ })
/******/ ]);
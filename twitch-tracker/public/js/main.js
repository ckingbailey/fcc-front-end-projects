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
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return parseKeysToArray; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return parseParamsToString; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__lookup__ = __webpack_require__(4);


function parseKeysToArray(data, key) {
  return data.map(obj => {
    return obj[key]
  })
}

function parseParamsToString(route, params) {
  if (route.includes('?')) {
    route = route.slice(0, route.indexOf('?'))
    // console.log('route included "?"', route)
  }
  if (typeof params === 'object') {
    const paramsList = params.reduce((acc, param, i, arr) => {
      const paramName = Object(__WEBPACK_IMPORTED_MODULE_0__lookup__["a" /* lookupParamName */])(route, param)
      if (i !== 0) {
        acc += '&'
      }
      acc += paramName + '=' + param
      return acc
    }, '')
    return paramsList
  } else return `${Object(__WEBPACK_IMPORTED_MODULE_0__lookup__["a" /* lookupParamName */])(route, params)}=${params}`
}




/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__dom_manipulation__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__api_calls_fetch_twitch__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_parse__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__api_calls_storage_js__ = __webpack_require__(5);



 // NOTE: getLocal|setLocal stringifies|parse value for you

// constants
const isProd = window.env && window.env.production
const endpoint = isProd
  ? 'https://sheltered-dusk-25569.herokuapp.com/twitch' : 'http://localhost:3001/twitch'
const usersList = ['idlethumbs', 'freecodecamp', 'updownleftdie', 'omatum_greg', 'nlazcodes']
console.log('isProd? ' + isProd, 'api endpoint: ' + endpoint)

// DOM elements
const feed = document.getElementById('feed')
const searchForm = document.getElementById('searchForm')
searchForm.addEventListener('submit', handleSearchSubmit)
const searchField = document.getElementById('searchField')
const submitBtn = document.getElementById('submitSearch')
const searchResultsDisplay = document.createElement('div')
searchResultsDisplay.classList.add('search-results')
const overlay = document.createElement('div')
overlay.classList.add('overlay')

function handleSearchSubmit(ev) {
  ev.preventDefault()
  const term = ev.target.children['searchField'].value
  // console.log('1', document.activeElement)
  if (term) {
    console.log(term)
    Object(__WEBPACK_IMPORTED_MODULE_1__api_calls_fetch_twitch__["b" /* searchTwitch */])(term, response => {
      Object(__WEBPACK_IMPORTED_MODULE_0__dom_manipulation__["a" /* displaySearchResults */])(response, searchResultCard => {
        searchResultsDisplay.appendChild(searchResultCard)
      })
      searchField.insertAdjacentElement('afterend', searchResultsDisplay)
      searchResultsDisplay.insertAdjacentElement('beforebegin', overlay)
    })
  }
  submitBtn.blur()
  // console.log('2', document.activeElement)
}

// onload, load Twitch user data
// first look to localStorage
// if nothing in localStorage, qry server for data from Twitch
const storedUsers = Object(__WEBPACK_IMPORTED_MODULE_3__api_calls_storage_js__["a" /* getLocal */])('twitchUsersData')
if (storedUsers) {
  Object(__WEBPACK_IMPORTED_MODULE_1__api_calls_fetch_twitch__["a" /* default */])('/streams?', Object(__WEBPACK_IMPORTED_MODULE_2__utils_parse__["a" /* parseKeysToArray */])(storedUsers, 'login'), streamsData => {
    if (streamsData.data.length) {
      // if streamsData, iterate over each obj in the response looking for user matches
      storedUsers.forEach(user => {
        // fetch video for each user because Twitch only lets me get one at a time
        Object(__WEBPACK_IMPORTED_MODULE_1__api_calls_fetch_twitch__["a" /* default */])('/videos?first=1&', user.id, videosData => {
          user.last_stream = videosData.data[0]
          // for each stored user, iterate over streamsData checking for id match
          streamsData.data.forEach(stream => {
            // if it's a match, add the stream data and append element to DOM
            if (stream.user_id === user.id) {
              user.cur_stream = stream
              Object(__WEBPACK_IMPORTED_MODULE_0__dom_manipulation__["b" /* writeNewStreamer */])(feed, user)
            } else {
              user.cur_stream = null
              Object(__WEBPACK_IMPORTED_MODULE_0__dom_manipulation__["b" /* writeNewStreamer */])(feed, user)
            }
          })
        })
      })
    } else {
      storedUsers.forEach(user => {
        Object(__WEBPACK_IMPORTED_MODULE_1__api_calls_fetch_twitch__["a" /* default */])('/videos?first=1&', user.id, videosData => {
          user.last_stream = videosData.data[0]
          Object(__WEBPACK_IMPORTED_MODULE_0__dom_manipulation__["b" /* writeNewStreamer */])(feed, user)
        })
      })
    }
  })
} else {
  // if no stored users qry server to qry Twitch for users
  // then query for streams
  // store the user response and most recent video in an array at the key `twitchUsersData`
  Object(__WEBPACK_IMPORTED_MODULE_1__api_calls_fetch_twitch__["a" /* default */])('/users?', usersList, usersData => {
    Object(__WEBPACK_IMPORTED_MODULE_1__api_calls_fetch_twitch__["a" /* default */])('/streams?', Object(__WEBPACK_IMPORTED_MODULE_2__utils_parse__["a" /* parseKeysToArray */])(usersData.data, 'login'), streamsData => {
      if (streamsData.data.length) {
        // if streamsData, iterate over each obj in the response looking for user matches
        usersData.data.forEach(user => {
          // fetch video for each user because Twitch only lets me get one at a time
          Object(__WEBPACK_IMPORTED_MODULE_1__api_calls_fetch_twitch__["a" /* default */])('/videos?first=1&', user.id, videosData => {
            // TODO: validate that extant .last_stream is older than videosData.data[0]
            user.last_stream = videosData.data[0]
            const oldUsersData = Object(__WEBPACK_IMPORTED_MODULE_3__api_calls_storage_js__["a" /* getLocal */])('twitchUsersData')
            // if current user exists in storage replace it with new data
            if (oldUsersData) {
              if (oldUsersData.find(oldUser => oldUser.id === user.id)) {
                oldUsersData.splice(oldUsersData.findIndex(oldUser => oldUser.id === user.id),
                  1, user)
              } else oldUsersData.push(user)
              Object(__WEBPACK_IMPORTED_MODULE_3__api_calls_storage_js__["b" /* setLocal */])('twitchUsersData', oldUsersData)
            } else Object(__WEBPACK_IMPORTED_MODULE_3__api_calls_storage_js__["b" /* setLocal */])('twitchUsersData', [user])
            streamsData.data.forEach(stream => {
              if (stream.user_id === user.id) {
              // if it's a match, add the stream data and append element to DOM
                user.cur_stream = stream
                Object(__WEBPACK_IMPORTED_MODULE_0__dom_manipulation__["b" /* writeNewStreamer */])(feed, user)
              } else {
                user.cur_stream = null
                Object(__WEBPACK_IMPORTED_MODULE_0__dom_manipulation__["b" /* writeNewStreamer */])(feed, user)
              }
            })
          })
        })
      } else {
        // if no streams data, store and display usersData unmodified
        usersData.data.forEach(user => {
          // fetch video for each user because Twitch only lets me get one at a time
          Object(__WEBPACK_IMPORTED_MODULE_1__api_calls_fetch_twitch__["a" /* default */])('/videos?first=1&', user.id, videosData => {
            // TODO: validate that stored .last_stream is older than videosData.data[0]
            user.last_stream = videosData.data[0]
            const oldUsersData = Object(__WEBPACK_IMPORTED_MODULE_3__api_calls_storage_js__["a" /* getLocal */])('twitchUsersData')
            // if current user exists in storage replace it with new data
            if (oldUsersData) {
              if (oldUsersData.find(oldUser => oldUser.id === user.id)) {
                oldUsersData.splice(oldUsersData.findIndex(oldUser => oldUser.id === user.id),
                  1, user)
              } else oldUsersData.push(user)
              Object(__WEBPACK_IMPORTED_MODULE_3__api_calls_storage_js__["b" /* setLocal */])('twitchUsersData', oldUsersData)
            } else Object(__WEBPACK_IMPORTED_MODULE_3__api_calls_storage_js__["b" /* setLocal */])('twitchUsersData', [user])
            Object(__WEBPACK_IMPORTED_MODULE_0__dom_manipulation__["b" /* writeNewStreamer */])(feed, user)
          })
        })
      }
    })
  })
}


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return writeNewStreamer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return displaySearchResults; });
function createStreamerContainer(data, fn) {
  // streamer container components
  const [ streamer, imgContainer, textContainer, streamContainer ] =
    [ document.createElement('div'), document.createElement('div'),
      document.createElement('div'), document.createElement('div') ]
  const streamerAvatar = document.createElement('img')
  const userLink = document.createElement('a')
  const userHeading = document.createElement('h2')
  const [ userDescrip, curStream, lastStream ] =
    [ document.createElement('p'), document.createElement('p'),
      document.createElement('p')]
  streamer.classList.add('streamer-container', 'flex-container')
  streamer.appendChild(imgContainer).classList.add('flex-child', 'avatar-container')
  streamer.appendChild(textContainer).classList.add('flex-child', 'text-container')
  imgContainer.appendChild(streamerAvatar).classList.add('streamer-avatar')
  textContainer.appendChild(userHeading).classList.add('streamer-name')
  textContainer.appendChild(userDescrip).classList.add('description')
  textContainer.appendChild(streamContainer).classList.add('stream-container')
  userHeading.appendChild(userLink).classList.add('streamer-link')
  userLink.setAttribute('target', '_blank')
  streamContainer.appendChild(curStream).classList.add('current-stream')
  streamContainer.appendChild(lastStream).classList.add('prev-stream')
  fn(streamer, data)
}

function populateUserData(element, data, fn) {
  element.querySelector('.streamer-avatar').src = data.profile_image_url
  element.querySelector('.streamer-link').href = `https://www.twitch.tv/${data.login}`
  element.querySelector('.streamer-link').innerText = data.display_name
  element.querySelector('.description').innerText = data.description
  fn(element, data)
}

function populateStreamData(element, data, fn) {
  // I know, I'm sorry, this is a somewhat icky nested ternary. am I sorry? I'm not sorry
  const streamBlurb =
    (data.cur_stream &&
    data.cur_stream.title)
      ? data.cur_stream.title.slice(0, 50) +
        (data.cur_stream.title.length > 50 ? '...' : '') : 'OFFLINE'
  const lastStreamDate = data.last_stream && new Date(data.last_stream.published_at)
  const curStream = element.querySelector('.current-stream')
  const prevStream = element.querySelector('.prev-stream')
  if (data.cur_stream) {
    curStream.appendChild(document.createElement('i'))
    curStream.firstChild.innerText = 'CURRENTLY STREAMING: '
    curStream.appendChild(document.createTextNode(streamBlurb))
  } else {
    curStream.classList.add('offline')
    curStream.appendChild(document.createElement('span'))
    curStream.firstChild.innerText = 'OFFLINE'
  }
  if (data.last_stream) {
    prevStream.appendChild(document.createElement('i'))
    prevStream.firstChild.innerText = 'LAST STREAM: '
    prevStream.appendChild(document.createTextNode(data.last_stream.title.slice(0, 50)))
    prevStream.appendChild(document.createElement('br'))
    prevStream.appendChild(document.createTextNode(`${lastStreamDate.toDateString()}, ${lastStreamDate.toLocaleTimeString()}`))
  } else {
    prevStream.classList.add('no-videos')
    prevStream.appendChild(document.createElement('span'))
    prevStream.firstChild.innerText = 'no videos found'
  }
  fn(element, data)
}

// fn simply bakes together above DOM creation fns
function writeNewStreamer(container, data) {
  createStreamerContainer(data, (element, data) => {
    populateUserData(element, data, (element, data) => {
      populateStreamData(element, data, (element, data) => {
        container.appendChild(element)
      })
    })
  })
}

function writeNewSearchResultCard(data, fn) {
  const card = document.createElement('div')
  const addBtn = document.createElement('button')
  const name = document.createElement('p')
  const avatar = document.createElement('img')
  addBtn.innerText = '+'
  addBtn.classList.add('add-btn')
  addBtn.dataset.addStreamer = data._id
  name.innerText = data.name
  avatar.src = data.logo
  card.appendChild(addBtn)
  card.appendChild(name)
  card.appendChild(avatar)
  fn(card)
}

// iterates over search results to write DOM elements
// takes as args the results data and an ultimate callback
function displaySearchResults(results, fn) {
  console.log(results)
  results.channels.forEach(result => {
    writeNewSearchResultCard(result, element => {
      fn(element)
    })
  })
}




/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = fetchTwitchRoute;
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return searchTwitch; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_parse__ = __webpack_require__(0);
// users endpoint: GET https://api.twitch.tv/helix/users
// users query params: ?id=<String>&login=<String>
// user response: data: { display_name: String, id: String, offline_image-url: String, profile_image_url: String }
// streams endpoint: GET https://api.twitch.tv/helix/streams
// streams qry params: ?user_id=<String>&user_login=<String>&type=<"all"|"live"|"vodcast">&
// streams response: data: { pagination: String, started_at: String, thumbnail_url: String, title: String, type: "live"|"vodcast"|"", user_id: String, viewer_count: Number }
// application/vnd.twitchtv.v<version>+json

// fetch streams
// if user is not streaming, fetch users and display information about user

// dependencies


// constants
const endpoint = window.env.production
  ? 'https://sheltered-dusk-25569.herokuapp.com/twitch' : 'http://localhost:3001/twitch'

function wtf() {
  console.log('wtf hapnd?', ...arguments)
}

function fetchTwitchRoute(route, params, fn) {
  // console.log('args to fetchTwitch', route, params)
  const target = endpoint + route + Object(__WEBPACK_IMPORTED_MODULE_0__utils_parse__["b" /* parseParamsToString */])(route, params)
  // console.log('fetchTwitch target', target)
  const req = new window.Request(target)
  window.fetch(req)
    .then(res => {
      return res.json()
    })
    .then(json => {
      if (route.includes('streams')) {
        console.log('streams response', target, json)
      }
      return fn(json)
    })
    .catch(err => { // TODO: better err handling. what should I catch?
      wtf(err)
    })
}

function searchTwitch(term, fn) {
  const target = endpoint + '/search/channels?' + Object(__WEBPACK_IMPORTED_MODULE_0__utils_parse__["b" /* parseParamsToString */])('/search', term)
  const req = new window.Request(target)
  console.log('search target:', target)
  window.fetch(req)
    .then(res => {
      return res.json()
    })
    .then(json => {
      fn(json)
    })
}




/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return lookupParamName; });
// is it a user login or is it a user id?
function lookupUserParam(param) {
  return +param ? 'id' : 'login'
}

// lookup and return a single paramName
function lookupParamName(route, param) {
  const paramTable = {
    '/users': lookupUserParam(param),
    '/streams': 'user_' + lookupUserParam(param),
    '/videos': 'user_id',
    '/search': 'query'
  }
  return paramTable[route]
}




/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return setLocal; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return getLocal; });
function setLocal(key, val) {
  // check if storage accessible
  if (!('localStorage' in window)) {
    window.alert('This site wants to use html5 localStorage but your browser does not support it. Some features may not be available. Consider upgrading your browser to the most recent version.')
    return false
  }
  // stringify values to make them storage-ready
  val = JSON.stringify(val)
  try {
    window.localStorage.setItem(key, val)
  } catch (e) {
    if (e === 'QUOTA_EXCEEDED_ERR' || e.code === 22) {
      // should I make this a choice?
      window.alert('Local storage quota exceeded. Please clear storage and reload page to try again.')
    }
    // also check for security error?
    // but what does that security error look like if I'm to check for it?
  }
  return { [key]: val }
}

function getLocal(key) {
  if (!('localStorage' in window)) {
    window.alert('This site wants to access html5 localStorage but your browser does not support it. Some features may not be available. Consider upgrading your browser to the most recent version.')
    return false
  }
  var item = window.localStorage.getItem(key)
  if (!item) {
    return false
  } else {
    return JSON.parse(item)
  }
}




/***/ })
/******/ ]);
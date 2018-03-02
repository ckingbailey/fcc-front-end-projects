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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__lookup__ = __webpack_require__(3);


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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__api_calls_fetch_twitch_route__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__search__ = __webpack_require__(4);
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
searchField.addEventListener('input', handleSearchInput)

function handleSearchSubmit(ev) {
  ev.preventDefault()
  console.log(ev.target)
}

function handleSearchInput(ev) {
  console.log(ev.target.value)
  if (ev.target.value.length > 1) {
    Object(__WEBPACK_IMPORTED_MODULE_1__search__["a" /* default */])(ev.target.value, data => {
      console.log(data)
    })
  }
}

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
  console.log('args to popStrmData', data)
  // I know, I'm sorry, this is a somewhat icky nested ternary. am I sorry? I'm not sorry
  const streamBlurb =
    (data.cur_stream &&
    data.cur_stream.title)
      ? 'CURRENTLY STREAMING: ' + data.cur_stream.title.slice(0, 50) +
        (data.cur_stream.title.length > 50 ? '...' : '') : 'OFFLINE'
  const lastStream = data.last_stream
    ? 'LAST STREAM: ' + (new Date(data.last_stream.published_at)) : 'no videos found'
  element.querySelector('.current-stream').innerText = streamBlurb
  element.querySelector('.prev-stream').innerText = lastStream
  fn(element, data)
}

// onload, load Twitch user data
// first look to localStorage
// if nothing in localStorage, qry server for data from Twitch
const storedUsers = Object(__WEBPACK_IMPORTED_MODULE_3__api_calls_storage_js__["a" /* getLocal */])('twitchUsersData')
if (storedUsers) {
  console.log('storedUsers condition')
  Object(__WEBPACK_IMPORTED_MODULE_0__api_calls_fetch_twitch_route__["a" /* default */])('/streams?', Object(__WEBPACK_IMPORTED_MODULE_2__utils_parse__["a" /* parseKeysToArray */])(storedUsers, 'login'), streamsData => {
    if (streamsData.data.length) {
      console.log('streamsData condition')
      // if streamsData, iterate over each obj in the response looking for user matches
      storedUsers.forEach(user => {
        // fetch video for each user because Twitch only lets me get one at a time
        Object(__WEBPACK_IMPORTED_MODULE_0__api_calls_fetch_twitch_route__["a" /* default */])('/videos?first=1&', user.id, videosData => {
          console.log(user.id, videosData)
          user.last_stream = videosData.data[0]
          // for each stored user, iterate over streamsData checking for id match
          streamsData.data.forEach(stream => {
            // if it's a match, add the stream data and append element to DOM
            if (stream.user_id === user.id) {
              user.cur_stream = stream
              createStreamerContainer(user, (element, user) => {
                populateUserData(element, user, (element, user) => {
                  populateStreamData(element, user, (element) => {
                    feed.appendChild(element)
                  })
                })
              })
            } else {
              user.cur_stream = null
              createStreamerContainer(user, (element, user) => {
                populateUserData(element, user, (element, user) => {
                  populateStreamData(element, user, (element) => {
                    feed.appendChild(element)
                  })
                })
              })
            }
          })
        })
      })
    } else {
      console.log('!streamsData condition')
      storedUsers.forEach(user => {
        Object(__WEBPACK_IMPORTED_MODULE_0__api_calls_fetch_twitch_route__["a" /* default */])('/videos?first=1&', user.id, videosData => {
          console.log(user.id, videosData)
          user.last_stream = videosData.data[0]
          createStreamerContainer(user, (element, user) => {
            populateUserData(element, user, (element) => {
              populateStreamData(element, user, (element) => {
                feed.appendChild(element)
              })
            })
          })
        })
      })
    }
  })
} else {
  console.log('!storedUsers condition')
  // if no stored users qry server to qry Twitch for users
  // then query for streams
  // store the user response and most recent video in an array at the key `twitchUsersData`
  Object(__WEBPACK_IMPORTED_MODULE_0__api_calls_fetch_twitch_route__["a" /* default */])('/users?', usersList, usersData => {
    Object(__WEBPACK_IMPORTED_MODULE_0__api_calls_fetch_twitch_route__["a" /* default */])('/streams?', Object(__WEBPACK_IMPORTED_MODULE_2__utils_parse__["a" /* parseKeysToArray */])(usersData.data, 'login'), streamsData => {
      if (streamsData.data.length) {
        console.log('streamsData condition')
        // if streamsData, iterate over each obj in the response looking for user matches
        usersData.data.forEach(user => {
          // fetch video for each user because Twitch only lets me get one at a time
          Object(__WEBPACK_IMPORTED_MODULE_0__api_calls_fetch_twitch_route__["a" /* default */])('/videos?first=1&', user.id, videosData => {
            console.log(user.id, videosData)
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
                createStreamerContainer(user, (element, user) => {
                  populateUserData(element, user, (element, user) => {
                    populateStreamData(element, user, (element) => {
                      feed.appendChild(element)
                    })
                  })
                })
              } else {
                user.cur_stream = null
                createStreamerContainer(user, (element, user) => {
                  populateUserData(element, user, (element, user) => {
                    populateStreamData(element, user, (element) => {
                      feed.appendChild(element)
                    })
                  })
                })
              }
            })
          })
        })
      } else {
        // if no streams data, store and display usersData unmodified
        usersData.data.forEach(user => {
          // fetch video for each user because Twitch only lets me get one at a time
          Object(__WEBPACK_IMPORTED_MODULE_0__api_calls_fetch_twitch_route__["a" /* default */])('/videos?first=1&', user.id, videosData => {
            console.log(user.id, videosData)
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
            createStreamerContainer(user, (element, user) => {
              populateUserData(element, user, function(element) {
                feed.appendChild(element)
              })
            })
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
/* harmony export (immutable) */ __webpack_exports__["a"] = fetchTwitchRoute;
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

// function getUsers(users, key, fn) {
//   const target = endpoint + '/users?' + parseUsers(users, 'login')
//   console.log('users target', target)
//   options.headers['Client-ID'] = key
//   window.fetch(target, options)
//     .then(res => {
//       console.log('res.headers:', res.headers)
//       return res.json()
//     })
//     .then(json => {
//       fn(json)
//     })
//     .catch(err => {
//       // TODO: better error handling than this
//       wtf(err)
//     })
// }
//
// function getStreams(users, key, fn) {
//   const target = endpoint + '/streams?' + parseUsers(users, 'user_login')
//   console.log('streams target', target)
//   options.headers['Client-ID'] = key
//   window.fetch(target, options)
//     .then(res => {
//       return res.json()
//     })
//     .then(json => {
//       fn(json)
//     })
//     .catch(err => {
//       // TODO: better error handling than this
//       wtf(err)
//     })
// }

// export { getStreams, getUsers }


/***/ }),
/* 3 */
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
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = liveSearch;
// constants
const endpoint = 'https://api.twitch.tv/kraken/search/channels?query='
const options = {
  Method: 'GET',
  headers: { 'Client-ID': '' }
}

function liveSearch(apiKey, term, fn) {
  console.log(apiKey)
  options['Client-ID'] = apiKey
  window.fetch(`${endpoint}${term}`, options)
    .then(res => {
      return res.json()
    })
    .then(json => {
      fn(json)
    })
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
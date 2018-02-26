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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__search__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__api_calls_storage_js__ = __webpack_require__(3);



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
    Object(__WEBPACK_IMPORTED_MODULE_0__api_calls_fetch_key__["a" /* default */])(endpoint, key => {
      Object(__WEBPACK_IMPORTED_MODULE_2__search__["a" /* default */])(key, ev.target.value, data => {
        console.log(data)
      })
    })
  }
}

function createStreamerContainer(data, fn) {
  // streamer container components
  const [ streamerContainer, imgContainer, textContainer, streamContainer ] =
    [ document.createElement('div'), document.createElement('div'),
      document.createElement('div'), document.createElement('div') ]
  const streamerAvatar = document.createElement('img')
  const userLink = document.createElement('a')
  const userHeading = document.createElement('h2')
  const [ userDescrip, curStream, lastStream ] =
    [ document.createElement('p'), document.createElement('p'),
      document.createElement('p')]
  streamerContainer.classList.add('streamer-container', 'flex-container')
  imgContainer.classList.add('flex-child', 'avatar-container')
  textContainer.classList.add('flex-child', 'text-container')
  streamContainer.classList.add('stream-container')
  streamerContainer.appendChild(imgContainer)
  streamerContainer.appendChild(textContainer)
  streamerAvatar.classList.add('streamer-avatar')
  imgContainer.appendChild(streamerAvatar)
  userLink.classList.add('streamer-link')
  userHeading.classList.add('streamer-name')
  userLink.appendChild(userHeading)
  textContainer.appendChild(userLink)
  userDescrip.classList.add('description')
  textContainer.appendChild(userDescrip)
  curStream.classList.add('current-stream')
  streamContainer.appendChild(curStream)
  lastStream.classList.add('prev-stream')
  streamContainer.appendChild(lastStream)
  textContainer.appendChild(streamContainer)
  fn(streamerContainer, data)
  // TODO: what data do I want to display?
  // user name, whether they are streaming, what they are streaming, for how long, how many viewers
}

function populateUserData(element, data, fn) {
  element.querySelector('.streamer-avatar').src = data.profile_image_url
  element.querySelector('.streamer-link').href = `https://www.twitch.tv/${data.login}`
  element.querySelector('.streamer-name').innerText = data.display_name
  element.querySelector('.description').innerText = data.description
  fn(element, data)
}

function populateStreamData(element, data, fn) {
  element.querySelector('.current-stream').innerText = 'CURRENTLY STREAMING: ' + data.title
  element.querySelector('.stream-container').classList.add('is-streaming')
  fn(element, data)
}
// first try to get users from local storage
const storedUsers = Object(__WEBPACK_IMPORTED_MODULE_3__api_calls_storage_js__["a" /* getLocal */])('twitchUsersData')
if (storedUsers) {
  console.log('users from storage', typeof storedUsers, storedUsers)
  Object(__WEBPACK_IMPORTED_MODULE_0__api_calls_fetch_key__["a" /* default */])(endpoint, clientId => {
    console.log(clientId)
    if (clientId) {
      Object(__WEBPACK_IMPORTED_MODULE_1__api_calls_fetch_twitch__["a" /* getStreams */])(usersList, clientId, streamsData => {
        // always set top level object to its own data property
        streamsData = streamsData.data
        // if streamsData, add it to streamerContainers
        console.log('getStreams response:', streamsData)
        console.log('Boolean(streamsData.length)', Boolean(streamsData.length))
        if (streamsData.length) {
          // append streamsData to each corresponding usersData element
          streamsData.forEach(stream => {
            storedUsers.forEach(user => {
              if (user.id === stream.user_id) {
                const streamUser = Object.assign({}, user, stream)
                createStreamerContainer(streamUser, (element, streamUser) => {
                  console.log('element@createStreamerContainer', streamUser.user_id, element)
                  populateUserData(element, streamUser, (element, streamUser) => {
                    console.log('element@populateUserData', streamUser.user_id, element)
                    populateStreamData(element, streamUser, (element, steamUser) => {
                      console.log('element@populateStreamData', streamUser.user_id, element)
                      feed.appendChild(element)
                    })
                  })
                })
              } else {
                createStreamerContainer(user, (element, user) => {
                  populateUserData(element, user, function(element) {
                    feed.appendChild(element)
                  })
                })
              }
            })
          })
        } else {
          storedUsers.forEach(user => {
            createStreamerContainer(user, (element, user) => {
              populateUserData(element, user, function(element) {
                feed.appendChild(element)
              })
            })
          })
        }
      })
    }
  })
} else {
  // if no stored users
  // grab key from my server then query for users
  // then query for streams
  // store the user response and date of stream in an array at the key `twitchUsersData`
  Object(__WEBPACK_IMPORTED_MODULE_0__api_calls_fetch_key__["a" /* default */])(endpoint, clientId => {
    console.log(clientId)
    if (clientId) {
      Object(__WEBPACK_IMPORTED_MODULE_1__api_calls_fetch_twitch__["b" /* getUsers */])(usersList, clientId, usersData => {
        usersData = usersData.data
        // call getStreams after getUsers
        // populateStreamerContainer with streamsData and usersData
        // if no streamData, populateStreamerContainer with usersData only
        console.log('users list:', usersList, 'getUsers response:', usersData)
        Object(__WEBPACK_IMPORTED_MODULE_1__api_calls_fetch_twitch__["a" /* getStreams */])(usersList, clientId, streamsData => {
          streamsData = streamsData.data
          // if streamsData, add it to streamerContainers
          console.log('getStreams response:', streamsData)
          console.log('Boolean(streamsData.length)', Boolean(streamsData.length))
          if (streamsData.length) {
            // append streamsData to each corresponding usersData element
            Object(__WEBPACK_IMPORTED_MODULE_3__api_calls_storage_js__["b" /* setLocal */])('twitchUsersData',
              usersData.map(user => {
                const curStream = streamsData.filter(stream => {
                  return user.id === stream.user_id
                })[0]
                if (streamsData.filter(stream => user.id === stream.user_id)[0]) {
                  user.stream = { last_stream: curStream.started_at,
                    last_stream_id: curStream.id }
                  const streamingUser = Object.assign(user, { stream: curStream })
                  createStreamerContainer(streamingUser, (element, streamingUser) => {
                    console.log('element@createStreamerContainer', streamingUser.user_id, element)
                    populateUserData(element, streamingUser, (element, streamingUser) => {
                      console.log('element@populateUserData', streamingUser.user_id, element)
                      populateStreamData(element, streamingUser, (element, streamingUser) => {
                        console.log('element@populateStreamData', streamingUser.user_id, element)
                        feed.appendChild(element)
                      })
                    })
                  })
                } else {
                  createStreamerContainer(user, (element, user) => {
                    populateUserData(element, user, function(element) {
                      feed.appendChild(element)
                    })
                  })
                }
                return user
              })
            )
          } else {
            // if no streams data, store and display usersData unmodified
            Object(__WEBPACK_IMPORTED_MODULE_3__api_calls_storage_js__["b" /* setLocal */])('twitchUsersData', usersData)
            usersData.forEach(user => {
              createStreamerContainer(user, (element, user) => {
                populateUserData(element, user, function(element) {
                  feed.appendChild(element)
                })
              })
            })
          }
        })
      })
    }
  })
}


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




/***/ }),
/* 3 */
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


/***/ })
/******/ ]);
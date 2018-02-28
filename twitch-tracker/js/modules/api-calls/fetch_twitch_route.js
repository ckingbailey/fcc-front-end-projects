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
const endpoint = window.env.production
  ? 'https://sheltered-dusk-25569.herokuapp.com/twitch' : 'http://localhost:3001/twitch'

function lookupUserParam(param) {
  return typeof +param === 'number' ? 'id' : 'login'
}

// this fcn should lookup and return a single paramName
function lookupParamName(route, param) {
  const paramTable = {
    '/users': lookupUserParam(param),
    '/streams': 'user_' + lookupUserParam(param),
    '/videos': 'user_id',
    '/search': 'query'
  }
  return paramTable[route]
}

function parseParams(route, params) {
  if (typeof params === 'object') {
    const paramsList = params.reduce((acc, param, i, arr) => {
      const paramName = lookupParamName(route, param)
      if (i !== 0) {
        acc += '&'
      }
      acc += paramName + '=' + param
      return acc
    }, '')
    return '?' + paramsList
  } else return `?${lookupParamName(params)}=${params}`
}

function wtf() {
  console.log('wtf hapnd?', ...arguments)
}

export default function fetchTwitchRoute(route, params, fn) {
  const target = endpoint + route + parseParams(route, params)
  const req = new window.Request(target)
  window.fetch(req)
    .then(res => {
      return res.json()
    })
    .then(json => {
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

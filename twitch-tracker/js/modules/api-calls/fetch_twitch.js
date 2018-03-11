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
import { parseParamsToString } from '../utils/parse'

// constants
const endpoint = window.env.production
  ? 'https://sheltered-dusk-25569.herokuapp.com/twitch' : 'http://localhost:3001/twitch'

function wtf() {
  console.log('wtf hapnd?', ...arguments)
}

export default function fetchTwitchRoute(route, params, fn) {
  // console.log('args to fetchTwitch', route, params)
  const target = endpoint + route + parseParamsToString(route, params)
  // console.log('fetchTwitch target', target)
  const req = new window.Request(target)
  window.fetch(req)
    .then(res => {
      if (res.ok) return res.json()
      else {
        // if !res.ok callback will handle res as an error
        fn(res)
        wtf(res.status, res.statusText)
      }
    })
    .then(json => {
      if (route.includes('streams')) {
        // console.log('streams response', target, json)
      }
      // callback should handle error first, json second
      return fn(null, json)
    })
    .catch(err => { // TODO: better err handling. what should I catch?
      if (err.name === 'TypeError' && err.message === 'Failed to fetch') {
        fn(err)
      }
      wtf(err)
    })
}

function searchTwitch(term, fn) {
  const target = endpoint + '/search/channels?' + parseParamsToString('/search', term)
  const req = new window.Request(target)
  // console.log('search target:', target)
  window.fetch(req)
    .then(res => {
      return res.json()
    })
    .then(json => {
      fn(null, json)
    })
    .catch(err => {
      // console.log(typeof err, err)
      fn(err)
    })
}

export { searchTwitch }

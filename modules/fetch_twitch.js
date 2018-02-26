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
const HELIX_ENDPOINT = 'https://api.twitch.tv/helix'
const KRAKEN_ENDPOINT = 'https://api.twitch.tv/kraken'
const options = {
  Method: 'GET',
  headers: { 'Client-ID': '' }
}

function parseUsers (users, paramName) {
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

function wtf () {
  console.log('wtf hapnd?', arguments)
}

exports.getUsers = function getUsers (users, key, fn) {
  const target = HELIX_ENDPOINT + '/users?' + parseUsers(users, 'login')
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

exports.getStreams = function getStreams (users, key, fn) {
  const target = HELIX_ENDPOINT + '/streams?' + parseUsers(users, 'user_login')
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

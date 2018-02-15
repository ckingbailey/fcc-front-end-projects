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
  options.header['Client-ID'] = key
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

function getStreams(users, key, fn) {
  const target = endpoint + '/streams?' + parseUsers(users, 'user_login')
  options.header['Client-ID'] = key
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

export { getStreams, getUsers }

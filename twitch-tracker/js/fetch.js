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
const request = require('request')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').load()
}

// constants
const endpoint = 'https://api.twitch.tv/helix'
const CLIENT_ID = process.env.TWITCH_CLIENT_ID
const options = {
  url: endpoint,
  Method: 'GET',
  headers: { 'Client-ID': CLIENT_ID }
}
const args = process.argv.slice(2)

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

function handleResponse(err, res, body, fn) {
  if (err) throw new Error(err)
  else if (res.statusCode === 200) {
    console.log('success!', options)
    fn(body)
  } else wtf(options, `${res.statusCode}: ${res.statusMessage}`, body.message, res.headers)
}

function wtf() {
  console.log('wtf hapnd?', arguments)
}

function getUsers(users, fn) {
  if (!args || args.length < 1) {
    throw new Error('We need some users to query')
  }
  options.url += '/users?' + parseUsers(users, 'login')
  request(options, (err, res, body) => {
    handleResponse(err, res, body, fn)
  })
}

function getStreams(users, fn) {
  if (!args || args.length < 1) {
    throw new Error('We need some users to query')
  }
  options.url += '/streams?' + parseUsers(users, 'user_login')
  request(options, (err, res, body) => {
    handleResponse(err, res, body, fn)
  })
}

getUsers(args, (data) => {
  console.log(JSON.parse(data))
})

module.exports = { getStreams, getUsers }

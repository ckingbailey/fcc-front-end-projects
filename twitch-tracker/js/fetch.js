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

function wtf() {
  console.log('wtf hapnd?', arguments)
}

// currently this uses Twitch API v5 syntax
// v5 will be deprecated 12/31/18
// it's anyone's guess when v6 will be ready
function getStreams(users, queryParam, fn) {
  options.url += `/${queryParam}?`
  if (typeof users === 'object') {
    const usersList = users.reduce((acc, user, i, arr) => {
      if (i !== 0) {
        acc += '&'
      }
      acc += 'user_login=' + user
      return acc
    }, '')
    options.url += usersList
  } else options.url += `user_login=${users}`
  request(options, (err, res, body) => {
    if (err) throw new Error(err)
    else if (res.statusCode === 200) {
      console.log('success!', options)
      fn(body)
    } else wtf(options, `${res.statusCode}: ${res.statusMessage}`, res.headers)
  })
}

getStreams(args, 'streams', (data) => {
  console.log(JSON.parse(data))
})

module.exports = getStreams

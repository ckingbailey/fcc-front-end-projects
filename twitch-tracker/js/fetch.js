// users endpoint: GET https://api.twitch.tv/helix/users
// users query params: ?id=<String>&login=<String>
// user response: data: { display_name: String, id: String, offline_image-url: String, profile_image_url: String }
// streams endpoint: GET https://api.twitch.tv/helix/streams
// streams qry params: ?user_id=<String>&user_login=<String>&type=<"all"|"live"|"vodcast">&
// streams response: data: { pagination: String, started_at: String, thumbnail_url: String, title: String, type: "live"|"vodcast"|"", user_id: String, viewer_count: Number }

// fetch streams
// if user is not streaming, fetch users and display information about user

// dependencies
const request = require('request')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').load()
}

// constants
const endpoint = 'https://api.twitch.tv/kraken'
const CLIENT_ID = process.env.TWITCH_CLIENT_ID

function wtf() {
  console.log('wtf hapnd?', arguments)
}

function getStreams(users, fn) {
  // TODO: this could all be a little more concise and less repetitive
  let target = `${endpoint}/streams?client_id=${CLIENT_ID}`
  if (typeof users === 'object') {
    const usersList = users.reduce((acc, user, i, arr) => {
      acc += 'user_login=' + user + '&'
      // if it's not the last index, append '&' to usersList string
      if (i < arr.length - 1) {
        acc += '&'
      }
      return acc
    }, '')
    target += usersList
  } else target += `&user_login=${users}`
  request(target, (err, res, body) => {
    if (err) throw new Error(err)
    else if (res.statusCode === 200) fn(body)
    else console.log('wtf happend?', target, CLIENT_ID, res.statusCode)
  })
}

getStreams('freecodecamp', (data) => {
  console.log('success:', JSON.parse(data))
})

module.exports = getStreams

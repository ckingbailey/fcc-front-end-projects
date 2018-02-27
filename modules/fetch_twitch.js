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
const TWITCH_CLIENT_ID = process.env.TWITCH_CLIENT_ID

module.exports = function fetchTwitch (req, res) {
  const reqParam = req.url.slice(1, req.url.indexOf('?'))
  const apiVersion = '/' + (reqParam.includes('search') ? 'kraken' : 'helix')
  const options = {
    url: `https://api.twitch.tv${apiVersion}${req.url}`,
    Method: 'GET',
    headers: { 'Client-ID': TWITCH_CLIENT_ID }
  }
  request(options, (err, response, body) => {
    if (err) throw new Error(err)
    else {
      res.send(JSON.parse(body))
    }
  })
}

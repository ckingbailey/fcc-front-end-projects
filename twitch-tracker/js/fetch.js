// users endpoint: GET https://api.twitch.tv/helix/users
// users query params: ?id=<String>&login=<String>
// user response: data: { display_name: String, id: String, offline_image-url: String, profile_image_url: String }
// streams endpoint: GET https://api.twitch.tv/helix/streams
// streams qry params: ?user_id=<String>&user_login=<String>&type=<"all"|"live"|"vodcast">&
// streams response: data: { pagination: String, started_at: String, thumbnail_url: String, title: String, user_id: String, viewer_count: Number }

// fetch streams
// if user is not streaming, fetch users and display information about user

// dependencies
import request from 'request'
import dotenv from 'dotenv'
if (process.env.NODE_ENV !== 'production') {
  dotenv.load()
}

// constants
const endpoint = 'https://api.twitch.tv/helix'
const CLIENT_ID = process.env.CLIENT_ID

export default function getStreams(users, fn) {
  // TODO: this could all be a little more concise and less repetitive
  if (typeof users !== 'object') {
    request(`${endpoint}/streams?client_id=${CLIENT_ID}&user_login=${users}`, (err, res, body) => {
      if (err) throw new Error(err)
      else if (res.status.includes(200)) fn(body)
    })
  } else {
    const usersList = users.reduce((acc, user, i, arr) => {
      acc += 'user_login=' + user + '&'
      // if it's not the last index, append '&' to usersList string
      if (i < arr.length - 1) {
        acc += '&'
      }
      return acc
    }, '')
    request(`${endpoint}/streams?client_id=${CLIENT_ID}&${usersList}`, (err, res, body) => {
      if (err) throw new Error(err)
      else if (res.status.includes(200)) fn(body)
    })
  }
}

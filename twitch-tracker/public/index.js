import getKey from '../modules/api-calls/fetch_key'
import { getStreams, getUsers } from '../modules/api-calls/fetch_twitch'

const container = document.getElementById('mainContainer')
const endpoint = 'https://sheltered-dusk-25569.herokuapp.com/twitch'

function createStreamContainer(streamData) {
  const userContainer = document.createElement('div')
  userContainer.classList.add('streamer-container')
  container.appendChild(userContainer)
  // TODO: what data do I want to display?
  // user name, whether they are streaming, what they are streaming, for how long, how many viewers
}

// grab key from my server then query for user streams
// if no streams, query those logins for user data
// TODO: what user data is displayed?
getKey(endpoint, clientId => {
  getStreams(['idlethumbs', 'freecodecamp'], clientId, data => {
    // TODO: this should iterate over data
    // passing each entry to cSC
    // if no data at an entry, call getUsers()
    console.log(data)
  })
})

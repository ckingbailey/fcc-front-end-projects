import getKey from './api-calls/fetch_key'
import { getStreams, getUsers } from './api-calls/fetch_twitch'

const container = document.getElementById('mainContainer')
const isProd = window.env && window.env.production
const endpoint = isProd
  ? 'https://sheltered-dusk-25569.herokuapp.com/twitch' : 'http://localhost:3001/twitch'
const usersList = ['idlethumbs', 'freecodecamp']
console.log('isProd? '+ isProd, 'api endpoint: ' + endpoint)

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
  console.log(clientId)
  if (clientId) {
    getStreams(usersList, clientId, streamData => {
      // TODO: this should iterate over data
      // passing each entry to cSC
      // if no data at an entry, call getUsers()
      console.log('users list:', usersList, 'getStreams response:', streamData)
      if (!streamData) {
        getUsers(usersList, clientId, usersData => {
          console.log('users list:', usersList, 'getUsers response:', usersData)
        })
      }
    })
  }
})

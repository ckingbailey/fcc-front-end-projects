import getKey from './api-calls/fetch_key'
import { getStreams, getUsers } from './api-calls/fetch_twitch'

const feed = document.getElementById('feed')
const isProd = window.env && window.env.production
const endpoint = isProd
  ? 'https://sheltered-dusk-25569.herokuapp.com/twitch' : 'http://localhost:3001/twitch'
const usersList = ['idlethumbs', 'freecodecamp', 'phanxgames', 'omatum_greg', 'nlazcodes']
console.log('isProd? ' + isProd, 'api endpoint: ' + endpoint)

function createStreamerContainer(data, fn) {
  // streamer container components
  const [ streamerContainer, imgContainer, textContainer, streamContainer ] =
    [ document.createElement('div'), document.createElement('div'),
      document.createElement('div'), document.createElement('div') ]
  const streamerAvatar = document.createElement('img')
  const userLink = document.createElement('a')
  const userHeading = document.createElement('h2')
  const userDescrip = document.createElement('p')
  const curStream = document.createElement('p')
  const lastStream = document.createElement('p')
  streamerContainer.classList.add('streamer-container', 'flex-container')
  imgContainer.classList.add('flex-child')
  textContainer.classList.add('flex-child')
  streamerContainer.classList.add('flex-child')
  streamerContainer.appendChild(imgContainer)
  streamerContainer.appendChild(textContainer)
  streamerAvatar.classList.add('streamer-avatar')
  imgContainer.appendChild(streamerAvatar)
  userLink.classList.add('streamer-link')
  userHeading.classList.add('streamer-name')
  userLink.appendChild(userHeading)
  textContainer.appendChild(userLink)
  userDescrip.classList.add('description')
  textContainer.appendChild(userDescrip)
  curStream.classList.add('current-stream')
  streamContainer.appendChild(curStream)
  lastStream.classList.add('prev-stream')
  streamContainer.appendChild(lastStream)
  fn(streamerContainer, data)
  // TODO: what data do I want to display?
  // user name, whether they are streaming, what they are streaming, for how long, how many viewers
}

function populateStreamerContainer(element, data, fn) {
  element.querySelector('.streamer-avatar').src = data.profile_image_url
  element.querySelector('.streamer-link').href = `https://www.twitch.tv/${data.login}`
  element.querySelector('.streamer-name').innerText = data.display_name
  element.querySelector('.description').innerText = data.description
  fn(element, data)
}
// grab key from my server then query for user streams
// if no streams, query those logins for user data
// TODO: what user data is displayed?
getKey(endpoint, clientId => {
  console.log(clientId)
  if (clientId) {
    getUsers(usersList, clientId, usersData => {
      console.log('users list:', usersList, 'getUsers response:', usersData)
      if (usersData.data) {
        usersData.data.forEach(obj => {
          createStreamerContainer(obj, (element, obj) => {
            populateStreamerContainer(element, obj, function(element) {
              feed.appendChild(element)
            })
          })
        })
      }
    })
  }
})

import getKey from './api-calls/fetch_key'
import { getStreams, getUsers } from './api-calls/fetch_twitch'

const feed = document.getElementById('feed')
const isProd = window.env && window.env.production
const endpoint = isProd
  ? 'https://sheltered-dusk-25569.herokuapp.com/twitch' : 'http://localhost:3001/twitch'
const usersList = ['idlethumbs', 'freecodecamp', 'updownleftdie', 'omatum_greg', 'nlazcodes']
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
  textContainer.appendChild(streamContainer)
  fn(streamerContainer, data)
  // TODO: what data do I want to display?
  // user name, whether they are streaming, what they are streaming, for how long, how many viewers
}

function populateUserData(element, data, fn) {
  element.querySelector('.streamer-avatar').src = data.profile_image_url
  element.querySelector('.streamer-link').href = `https://www.twitch.tv/${data.login}`
  element.querySelector('.streamer-name').innerText = data.display_name
  element.querySelector('.description').innerText = data.description
  fn(element, data)
}

function populateStreamData(element, data, fn) {
  element.querySelector('.current-stream').innerText = data.title
  fn(element, data)
}
// grab key from my server then query for user streams
// if no streams, query those logins for user data
// TODO: what user data is displayed?
getKey(endpoint, clientId => {
  console.log(clientId)
  if (clientId) {
    getUsers(usersList, clientId, usersData => {
      // call getStreams after getUsers
      // populateStreamerContainer with streamsData and usersData
      // if no streamData, populateStreamerContainer with usersData only
      console.log('users list:', usersList, 'getUsers response:', usersData)
      getStreams(usersList, clientId, streamsData => {
        // if streamsData, add it to streamerContainers
        console.log('getStreams response:', streamsData)
        console.log('Boolean(streamsData.data)', Boolean(streamsData.data))
        if (streamsData.data) {
          // append streamsData to each corresponding usersData element
          streamsData.data.forEach(stream => {
            usersData.data.forEach(user => {
              if (user.id === stream.user_id) {
                const streamUser = Object.assign({}, user, stream)
                createStreamerContainer(streamUser, (element, streamUser) => {
                  console.log('element@createStreamerContainer', streamUser.user_id, element)
                  populateUserData(element, streamUser, (element, streamUser) => {
                    console.log('element@populateUserData', streamUser.user_id, element)
                    populateStreamData(element, streamUser, (element, steamUser) => {
                      console.log('element@populateStreamData', streamUser.user_id, element)
                      feed.appendChild(element)
                    })
                  })
                })
              } else {
                createStreamerContainer(user, (element, user) => {
                  populateUserData(element, user, function(element) {
                    feed.appendChild(element)
                  })
                })
              }
            })
          })
        } else {
          usersData.data.forEach(user => {
            createStreamerContainer(user, (element, user) => {
              populateUserData(element, user, function(element) {
                feed.appendChild(element)
              })
            })
          })
        }
      })
    })
  }
})

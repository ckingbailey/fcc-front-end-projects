import getKey from './api-calls/fetch_key'
import { getStreams, getUsers } from './api-calls/fetch_twitch'
import liveSearch from './search'
import { setLocal, getLocal } from './api-calls/storage.js' // NOTE: getLocal|setLocal stringifies|parse value for you

// constants
const isProd = window.env && window.env.production
const endpoint = isProd
  ? 'https://sheltered-dusk-25569.herokuapp.com/twitch' : 'http://localhost:3001/twitch'
const usersList = ['idlethumbs', 'freecodecamp', 'updownleftdie', 'omatum_greg', 'nlazcodes']
console.log('isProd? ' + isProd, 'api endpoint: ' + endpoint)

// DOM elements
const feed = document.getElementById('feed')
const searchForm = document.getElementById('searchForm')
searchForm.addEventListener('submit', handleSearchSubmit)
const searchField = document.getElementById('searchField')
searchField.addEventListener('input', handleSearchInput)

function handleSearchSubmit(ev) {
  ev.preventDefault()
  console.log(ev.target)
}

function handleSearchInput(ev) {
  console.log(ev.target.value)
  if (ev.target.value.length > 1) {
    getKey(endpoint, key => {
      liveSearch(key, ev.target.value, data => {
        console.log(data)
      })
    })
  }
}

function createStreamerContainer(data, fn) {
  // streamer container components
  const [ streamerContainer, imgContainer, textContainer, streamContainer ] =
    [ document.createElement('div'), document.createElement('div'),
      document.createElement('div'), document.createElement('div') ]
  const streamerAvatar = document.createElement('img')
  const userLink = document.createElement('a')
  const userHeading = document.createElement('h2')
  const [ userDescrip, curStream, lastStream ] =
    [ document.createElement('p'), document.createElement('p'),
      document.createElement('p')]
  streamerContainer.classList.add('streamer-container', 'flex-container')
  imgContainer.classList.add('flex-child', 'avatar-container')
  textContainer.classList.add('flex-child', 'text-container')
  streamContainer.classList.add('stream-container')
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
  element.querySelector('.current-stream').innerText = 'CURRENTLY STREAMING: ' + data.title
  element.querySelector('.stream-container').classList.add('is-streaming')
  fn(element, data)
}
// first try to get users from local storage
const storedUsers = getLocal('twitchUsersData')
if (storedUsers) {
  console.log('users from storage', typeof storedUsers, storedUsers)
  getKey(endpoint, clientId => {
    console.log(clientId)
    if (clientId) {
      getStreams(usersList, clientId, streamsData => {
        // always set top level object to its own data property
        streamsData = streamsData.data
        // if streamsData, add it to streamerContainers
        console.log('getStreams response:', streamsData)
        console.log('Boolean(streamsData.length)', Boolean(streamsData.length))
        if (streamsData.length) {
          // append streamsData to each corresponding usersData element
          streamsData.forEach(stream => {
            storedUsers.forEach(user => {
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
          storedUsers.forEach(user => {
            createStreamerContainer(user, (element, user) => {
              populateUserData(element, user, function(element) {
                feed.appendChild(element)
              })
            })
          })
        }
      })
    }
  })
} else {
  // if no stored users
  // grab key from my server then query for users
  // then query for streams
  // store the user response and date of stream in an array at the key `twitchUsersData`
  getKey(endpoint, clientId => {
    console.log(clientId)
    if (clientId) {
      getUsers(usersList, clientId, usersData => {
        usersData = usersData.data
        // call getStreams after getUsers
        // populateStreamerContainer with streamsData and usersData
        // if no streamData, populateStreamerContainer with usersData only
        console.log('users list:', usersList, 'getUsers response:', usersData)
        getStreams(usersList, clientId, streamsData => {
          streamsData = streamsData.data
          // if streamsData, add it to streamerContainers
          console.log('getStreams response:', streamsData)
          console.log('Boolean(streamsData.length)', Boolean(streamsData.length))
          if (streamsData.length) {
            // append streamsData to each corresponding usersData element
            setLocal('twitchUsersData',
              usersData.map(user => {
                const curStream = streamsData.filter(stream => {
                  return user.id === stream.user_id
                })[0]
                if (streamsData.filter(stream => user.id === stream.user_id)[0]) {
                  user.stream = { last_stream: curStream.started_at,
                    last_stream_id: curStream.id }
                  const streamingUser = Object.assign(user, { stream: curStream })
                  createStreamerContainer(streamingUser, (element, streamingUser) => {
                    console.log('element@createStreamerContainer', streamingUser.user_id, element)
                    populateUserData(element, streamingUser, (element, streamingUser) => {
                      console.log('element@populateUserData', streamingUser.user_id, element)
                      populateStreamData(element, streamingUser, (element, streamingUser) => {
                        console.log('element@populateStreamData', streamingUser.user_id, element)
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
                return user
              })
            )
          } else {
            // if no streams data, store and display usersData unmodified
            setLocal('twitchUsersData', usersData)
            usersData.forEach(user => {
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
}

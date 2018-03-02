import fetchTwitchRoute from './api-calls/fetch_twitch_route'
import liveSearch from './search'
import { parseKeysToArray } from './utils/parse'
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
    liveSearch(ev.target.value, data => {
      console.log(data)
    })
  }
}

function createStreamerContainer(data, fn) {
  // streamer container components
  const [ streamer, imgContainer, textContainer, streamContainer ] =
    [ document.createElement('div'), document.createElement('div'),
      document.createElement('div'), document.createElement('div') ]
  const streamerAvatar = document.createElement('img')
  const userLink = document.createElement('a')
  const userHeading = document.createElement('h2')
  const [ userDescrip, curStream, lastStream ] =
    [ document.createElement('p'), document.createElement('p'),
      document.createElement('p')]
  streamer.classList.add('streamer-container', 'flex-container')
  streamer.appendChild(imgContainer).classList.add('flex-child', 'avatar-container')
  streamer.appendChild(textContainer).classList.add('flex-child', 'text-container')
  imgContainer.appendChild(streamerAvatar).classList.add('streamer-avatar')
  textContainer.appendChild(userHeading).classList.add('streamer-name')
  textContainer.appendChild(userDescrip).classList.add('description')
  textContainer.appendChild(streamContainer).classList.add('stream-container')
  userHeading.appendChild(userLink).classList.add('streamer-link')
  userLink.setAttribute('target', '_blank')
  streamContainer.appendChild(curStream).classList.add('current-stream')
  streamContainer.appendChild(lastStream).classList.add('prev-stream')
  fn(streamer, data)
}

function populateUserData(element, data, fn) {
  element.querySelector('.streamer-avatar').src = data.profile_image_url
  element.querySelector('.streamer-link').href = `https://www.twitch.tv/${data.login}`
  element.querySelector('.streamer-link').innerText = data.display_name
  element.querySelector('.description').innerText = data.description
  fn(element, data)
}

function populateStreamData(element, data, fn) {
  console.log('args to popStrmData', data)
  // I know, I'm sorry, this is a somewhat icky nested ternary. am I sorry? I'm not sorry
  const streamBlurb =
    (data.cur_stream &&
    data.cur_stream.title)
      ? data.cur_stream.title.slice(0, 50) +
        (data.cur_stream.title.length > 50 ? '...' : '') : 'OFFLINE'
  const lastStreamDate = data.last_stream && new Date(data.last_stream.published_at)
  const curStream = element.querySelector('.current-stream')
  const prevStream = element.querySelector('.prev-stream')
  if (data.cur_stream) {
    curStream.appendChild(document.createElement('i'))
    curStream.firstChild.innerText = 'CURRENTLY STREAMING: '
    curStream.appendChild(document.createTextNode(streamBlurb))
  } else {
    curStream.classList.add('offline')
    curStream.appendChild(document.createElement('span'))
    curStream.firstChild.innerText = 'OFFLINE'
  }
  if (data.last_stream) {
    prevStream.appendChild(document.createElement('i'))
    prevStream.firstChild.innerText = 'LAST STREAM: '
    prevStream.appendChild(document.createTextNode(data.last_stream.title.slice(0, 50)))
    prevStream.appendChild(document.createElement('br'))
    prevStream.appendChild(document.createTextNode(`${lastStreamDate.toDateString()}, ${lastStreamDate.toLocaleTimeString()}`))
  } else {
    prevStream.classList.add('no-videos')
    prevStream.appendChild(document.createElement('span'))
    prevStream.firstChild.innerText = 'no videos found'
  }
  fn(element, data)
}

// onload, load Twitch user data
// first look to localStorage
// if nothing in localStorage, qry server for data from Twitch
const storedUsers = getLocal('twitchUsersData')
if (storedUsers) {
  console.log('storedUsers condition')
  fetchTwitchRoute('/streams?', parseKeysToArray(storedUsers, 'login'), streamsData => {
    if (streamsData.data.length) {
      console.log('streamsData condition')
      // if streamsData, iterate over each obj in the response looking for user matches
      storedUsers.forEach(user => {
        // fetch video for each user because Twitch only lets me get one at a time
        fetchTwitchRoute('/videos?first=1&', user.id, videosData => {
          console.log(user.id, videosData)
          user.last_stream = videosData.data[0]
          // for each stored user, iterate over streamsData checking for id match
          streamsData.data.forEach(stream => {
            // if it's a match, add the stream data and append element to DOM
            if (stream.user_id === user.id) {
              user.cur_stream = stream
              createStreamerContainer(user, (element, user) => {
                populateUserData(element, user, (element, user) => {
                  populateStreamData(element, user, (element) => {
                    feed.appendChild(element)
                  })
                })
              })
            } else {
              user.cur_stream = null
              createStreamerContainer(user, (element, user) => {
                populateUserData(element, user, (element, user) => {
                  populateStreamData(element, user, (element) => {
                    feed.appendChild(element)
                  })
                })
              })
            }
          })
        })
      })
    } else {
      console.log('!streamsData condition')
      storedUsers.forEach(user => {
        fetchTwitchRoute('/videos?first=1&', user.id, videosData => {
          console.log(user.id, videosData)
          user.last_stream = videosData.data[0]
          createStreamerContainer(user, (element, user) => {
            populateUserData(element, user, (element) => {
              populateStreamData(element, user, (element) => {
                feed.appendChild(element)
              })
            })
          })
        })
      })
    }
  })
} else {
  console.log('!storedUsers condition')
  // if no stored users qry server to qry Twitch for users
  // then query for streams
  // store the user response and most recent video in an array at the key `twitchUsersData`
  fetchTwitchRoute('/users?', usersList, usersData => {
    fetchTwitchRoute('/streams?', parseKeysToArray(usersData.data, 'login'), streamsData => {
      if (streamsData.data.length) {
        console.log('streamsData condition')
        // if streamsData, iterate over each obj in the response looking for user matches
        usersData.data.forEach(user => {
          // fetch video for each user because Twitch only lets me get one at a time
          fetchTwitchRoute('/videos?first=1&', user.id, videosData => {
            console.log(user.id, videosData)
            // TODO: validate that extant .last_stream is older than videosData.data[0]
            user.last_stream = videosData.data[0]
            const oldUsersData = getLocal('twitchUsersData')
            // if current user exists in storage replace it with new data
            if (oldUsersData) {
              if (oldUsersData.find(oldUser => oldUser.id === user.id)) {
                oldUsersData.splice(oldUsersData.findIndex(oldUser => oldUser.id === user.id),
                  1, user)
              } else oldUsersData.push(user)
              setLocal('twitchUsersData', oldUsersData)
            } else setLocal('twitchUsersData', [user])
            streamsData.data.forEach(stream => {
              if (stream.user_id === user.id) {
              // if it's a match, add the stream data and append element to DOM
                user.cur_stream = stream
                createStreamerContainer(user, (element, user) => {
                  populateUserData(element, user, (element, user) => {
                    populateStreamData(element, user, (element) => {
                      feed.appendChild(element)
                    })
                  })
                })
              } else {
                user.cur_stream = null
                createStreamerContainer(user, (element, user) => {
                  populateUserData(element, user, (element, user) => {
                    populateStreamData(element, user, (element) => {
                      feed.appendChild(element)
                    })
                  })
                })
              }
            })
          })
        })
      } else {
        // if no streams data, store and display usersData unmodified
        usersData.data.forEach(user => {
          // fetch video for each user because Twitch only lets me get one at a time
          fetchTwitchRoute('/videos?first=1&', user.id, videosData => {
            console.log(user.id, videosData)
            // TODO: validate that stored .last_stream is older than videosData.data[0]
            user.last_stream = videosData.data[0]
            const oldUsersData = getLocal('twitchUsersData')
            // if current user exists in storage replace it with new data
            if (oldUsersData) {
              if (oldUsersData.find(oldUser => oldUser.id === user.id)) {
                oldUsersData.splice(oldUsersData.findIndex(oldUser => oldUser.id === user.id),
                  1, user)
              } else oldUsersData.push(user)
              setLocal('twitchUsersData', oldUsersData)
            } else setLocal('twitchUsersData', [user])
            createStreamerContainer(user, (element, user) => {
              populateUserData(element, user, function(element) {
                feed.appendChild(element)
              })
            })
          })
        })
      }
    })
  })
}

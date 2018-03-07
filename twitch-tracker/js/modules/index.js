import { writeNewStreamer, displayFetchStreamerError, displaySearchResults } from './dom_manipulation'
import fetchTwitchRoute, { searchTwitch } from './api-calls/fetch_twitch'
import { parseKeysToArray } from './utils/parse'
import { setLocal, getLocal } from './api-calls/storage.js' // NOTE: getLocal|setLocal stringifies|parse value for you

// constants
const isProd = window.env && window.env.production
const endpoint = isProd
  ? 'https://sheltered-dusk-25569.herokuapp.com/twitch' : 'http://localhost:3001/twitch'
const usersList = ['idlethumbs', 'freecodecamp', 'updownleftdie', 'omatum_greg', 'nlazcodes']
console.log('isProd? ' + isProd, 'api endpoint: ' + endpoint)

// DOM elements
const main = document.getElementById('mainContainer')
const feed = document.getElementById('feed')
const searchForm = document.getElementById('searchForm')
searchForm.addEventListener('submit', handleSearchSubmit)
const searchField = document.getElementById('searchField')
const submitBtn = document.getElementById('submitSearch')
const searchResultsDisplay = document.createElement('div')
searchResultsDisplay.classList.add('search-results')
const overlay = document.createElement('div')
overlay.classList.add('overlay')

function handleSearchSubmit(ev) {
  ev.preventDefault()
  const term = ev.target.children['searchContainer'].children['searchField'].value
  // console.log('1', document.activeElement)
  if (term) {
    console.log(term)
    searchTwitch(term, (err, response) => {
      if (err) {
        displaySearchResults(err, null, errorCard => {
          searchResultsDisplay.appendChild(errorCard)
        })
        searchField.insertAdjacentElement('afterend', searchResultsDisplay)
        main.insertAdjacentElement('beforebegin', overlay)
      } else {
        displaySearchResults(response, searchResultCard => {
          searchResultsDisplay.appendChild(searchResultCard)
        })
        searchField.insertAdjacentElement('afterend', searchResultsDisplay)
        main.insertAdjacentElement('beforebegin', overlay)
      }
    })
  }
  submitBtn.blur()
  // console.log('2', document.activeElement)
}

// onload, load Twitch user data
// first look to localStorage
// if nothing in localStorage, qry server for data from Twitch
const storedUsers = getLocal('twitchUsersData')
if (storedUsers) {
  fetchTwitchRoute('/streams?', parseKeysToArray(storedUsers, 'login'), (err, streamsData) => {
    if (err) displayFetchStreamerError(feed, err)
    else {
      if (streamsData.data.length) {
        // if streamsData, iterate over each obj in the response looking for user matches
        storedUsers.forEach(user => {
          // fetch video for each user because Twitch only lets me get one at a time
          fetchTwitchRoute('/videos?first=1&', user.id, (err, videosData) => {
            if (err) console.error(err) // TODO: how to properly handle an error here?
            else {
              user.last_stream = videosData.data[0]
              // for each stored user, iterate over streamsData checking for id match
              streamsData.data.forEach(stream => {
                // if it's a match, add the stream data and append element to DOM
                if (stream.user_id === user.id) {
                  user.cur_stream = stream
                  writeNewStreamer(feed, user)
                } else {
                  user.cur_stream = null
                  writeNewStreamer(feed, user)
                }
              })
            }
          })
        })
      } else {
        storedUsers.forEach(user => {
          fetchTwitchRoute('/videos?first=1&', user.id, (err, videosData) => {
            if (err) console.error(err) // TODO: how to properly handle an error here?
            else {
              user.last_stream = videosData.data[0]
              writeNewStreamer(feed, user)
            }
          })
        })
      }
    }
  })
} else {
  // if no stored users qry server to qry Twitch for users
  // then query for streams
  // store the user response and most recent video in an array at the key `twitchUsersData`
  fetchTwitchRoute('/users?', usersList, (err, usersData) => {
    if (err) displayFetchStreamerError(feed, err)
    else {
      fetchTwitchRoute('/streams?', parseKeysToArray(usersData.data, 'login'), (err, streamsData) => {
        if (err) console.error(err) // TODO: how to properly handle an error here?
        else {
          if (streamsData.data.length) {
            // if streamsData, iterate over each obj in the response looking for user matches
            usersData.data.forEach(user => {
              // fetch video for each user because Twitch only lets me get one at a time
              fetchTwitchRoute('/videos?first=1&', user.id, (err, videosData) => {
                if (err) console.error(err) // TODO: how to properly handle an error here?
                else {
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
                      writeNewStreamer(feed, user)
                    } else {
                      user.cur_stream = null
                      writeNewStreamer(feed, user)
                    }
                  })
                }
              })
            })
          } else {
            // if no streams data, store and display usersData unmodified
            usersData.data.forEach(user => {
              // fetch video for each user because Twitch only lets me get one at a time
              fetchTwitchRoute('/videos?first=1&', user.id, (err, videosData) => {
                if (err) console.error(err)
                else {
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
                  writeNewStreamer(feed, user)
                }
              })
            })
          }
        }
      })
    }
  })
}

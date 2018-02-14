const container = document.getElementById('mainContainer')
const endpoint = 'http://localhost:3001'

function createStreamContainer(streamData) {
  const userContainer = document.createElement('div')
  userContainer.classList.add('streamer-container')
  container.appendChild(userContainer)
  // what data do I want to display?
  // user name, whether they are streaming, what they are streaming, for how long, how many viewers
}

function getUsers(login) {
  const users = typeof login !== 'object'
    ? Object.keys.length === 1
      ? login[Object.keys[0]] : null : null // fill this in later. quitting time now
  const target = endpoint + '/users?' + users
  window.fetch(target)
    .then(res => {
      // do something
      // probably createStreamContainer
    })
}

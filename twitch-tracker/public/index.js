import getStreams from './fetch'

const container = document.getElementById('mainContainer')

function createStreamContainer(streamData) {
  const userContainer = document.createElement('div')
  userContainer.classList.add('streamer-container')
  container.appendChild(userContainer)
  // what data do I want to display?
  // user name, whether they are streaming, what they are streaming, for how long, how many viewers
}

getStreams('freecodecamp', (data) => {
  console.log(data)
})

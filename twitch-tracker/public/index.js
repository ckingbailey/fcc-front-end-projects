import getStreams from './fetch'

const container = document.getElementById('mainContainer')

function createStreamContainer(streamData) {
  const userContainer = document.createElement('div')
  userContainer.classList.add('streamer-container')
}

getStreams('freecodecamp', (data) {

})

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

// fn simply bakes together above DOM creation fns
function writeNewStreamer(container, data) {
  createStreamerContainer(data, (element, data) => {
    populateUserData(element, data, (element, data) => {
      populateStreamData(element, data, (element, data) => {
        container.appendChild(element)
      })
    })
  })
}

function writeNewSearchResultCard(data, fn) {
  const card = document.createElement('div')
  const addBtn = document.createElement('button')
  const name = document.createElement('p')
  const avatar = document.createElement('img')
  addBtn.innerText = '+'
  addBtn.classList.add('add-btn')
  addBtn.dataset.addStreamer = data._id
  name.innerText = data.name
  name.classList.add('result-name')
  avatar.src = data.logo
  avatar.classList.add('result-avatar')
  card.appendChild(addBtn)
  card.appendChild(name)
  card.appendChild(avatar)
  fn(card)
}

// iterates over search results to write DOM elements
// takes as args the results data and an ultimate callback
function displaySearchResults(results, fn) {
  console.log(results)
  results.channels.forEach(result => {
    writeNewSearchResultCard(result, element => {
      fn(element)
    })
  })
}

export { writeNewStreamer, displaySearchResults }

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

// in case of error in fetch streamers
function displayFetchStreamerError(container, errData) {
  const errText = document.createElement('p')
  errText.innerText = 'Unable to retrieve streamers data'
  errText.classList.add('fetch-streamers-error')
  container.appendChild(errText)
}

// TODO: this fn should validate args first
function writeNewSearchResultCard(data, element, fn) {
  // QUESTION: how to reference container element to check for its existence
  if (element && element.nodeName) {
    element.querySelector('button').dataset.addStreamer = data._id
    element.querySelector('p').innerText = data.name
    element.querySelector('img').src = data.logo
    fn(element)
  } else {
    const card = document.createElement('div')
    const addBtn = document.createElement('button')
    const name = document.createElement('p')
    const avatar = document.createElement('img')
    card.classList.add('result-item')
    addBtn.innerText = '+'
    addBtn.classList.add('add-btn')
    addBtn.type = 'button'
    addBtn.dataset.addStreamer = data._id
    addBtn.addEventListener('click', e =>
      console.log(addBtn.dataset.addStreamer, 'event target is', e.target)
    )
    name.innerText = data.name
    name.classList.add('result-name')
    avatar.src = data.logo
    avatar.classList.add('result-avatar')
    card.appendChild(addBtn)
    card.appendChild(name)
    card.appendChild(avatar)
    // QUESTION: do I need to pass container here, or can I rely on the fn that calls wNSRC?
    fn(card)
  }
}

function writeNewErrorCard(err, data, fn) {
  const card = document.createElement('div')
  const errText = document.createElement('span')
  card.id = 'searchErrorMsg'
  card.appendChild(errText)
  if (err) {
    card.classList.add('search-error')
    errText.innerText = 'Unable to retrieve search results'
  } else {
    card.classList.add('search-error')
    errText.innerText = 'No results found for your search'
  }
  fn(card)
}

// iterates over search results to write DOM elements
// takes as args the results data and an ultimate callback
// TODO: validate arguments
// QUESTION: how to validate error arg?
function displaySearchResults(err, results, container, fn) {
  // console.log(results)
  if (err || !results) {
    console.log('err was passed to displaySrchRes')
    return writeNewErrorCard(err, null, fn)
  } else {
    console.log('err was not passed to displaySrchRes')
    // TODO: check for existining of .result elements
    // if they exist, iterate over them until either
    // - (1) all result data is consumed, or
    // - (2) all .result elements are filled, in which case create more
    const elements = container.querySelectorAll('.result-item')
    if (elements.length) {
      console.log('elements condition of displaySrchRes', elements)
      // only follow this course if there are search results
      if (results.channels.length) {
        console.log('search results returned')
        if (elements.length >= results.channels.length) {
          console.log('elements is longer than results in displaySrchRes',
            elements.length, results.channels.length)
          elements.slice(0, results.channels.length).forEach((el, i) => {
            writeNewSearchResultCard(results.channels[i], el, fn)
          })
        } else {
          console.log('elements is shorter than results in displaySrchRes',
            elements.length, results.channels.length)
          results.channels.forEach((el, i) => {
            writeNewSearchResultCard(el, elements[i], fn)
          })
        }
      } else {
        console.log('no search results returned')
        writeNewErrorCard(null, results, fn)
      }
    } else {
      console.log('!elements condition of displaySrchRes', elements)
      results.channels.forEach(result => {
        writeNewSearchResultCard(result, null, fn)
      })
    }
  }
}

// TODO: different unrender pattern for results vs. error
function unrenderSearchResults(resultsContainer, fn) {
  console.log('unrenderSearchResults, pls', resultsContainer)
  // TODO: strip content from #searchResults children
  resultsContainer.querySelectorAll('button').forEach(button => {
    button.dataset.addStreamer = ''
  })
  resultsContainer.querySelectorAll('p').forEach(p => {
    p.innerText = ''
  })
  resultsContainer.querySelectorAll('img').forEach(img => {
    img.removeAttribute('src')
  })
  fn(resultsContainer)
}

export { writeNewStreamer, displayFetchStreamerError, displaySearchResults, unrenderSearchResults }

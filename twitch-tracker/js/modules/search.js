// constants
const endpoint = 'https://api.twitch.tv/kraken/search/channels?query='
const options = {
  Method: 'GET',
  headers: { 'Client-ID': '' }
}

export default function liveSearch(apiKey, term, fn) {
  console.log(apiKey)
  options['Client-ID'] = apiKey
  window.fetch(`${endpoint}${term}`, options)
    .then(res => {
      return res.json()
    })
    .then(json => {
      fn(json)
    })
}

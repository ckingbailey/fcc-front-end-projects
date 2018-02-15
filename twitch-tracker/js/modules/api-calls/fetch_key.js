export default function getKey(target, fn) {
  window.fetch(endpoint)
    .then(res => {
      return res.text()
    })
    .then(key => {
      fn(key)
    })
}

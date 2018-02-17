export default function getKey(target, fn) {
  window.fetch(target)
    .then(res => {
      return res.text()
    })
    .then(key => {
      fn(key)
    })
    .catch(err => {
      throw new Error(err)
    })
}

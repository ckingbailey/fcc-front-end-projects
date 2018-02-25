function setLocal(key, val) {
  // check if storage accessible
  if (!('localStorage' in window)) {
    window.alert('This site wants to use html5 localStorage but your browser does not support it. Some features may not be available. Consider upgrading your browser to the most recent version.')
    return false
  }
  // stringify values to make them storage-ready
  val = JSON.stringify(val)
  try {
    window.localStorage.setItem(key, val)
  } catch (e) {
    if (e === 'QUOTA_EXCEEDED_ERR' || e.code === 22) {
      // should I make this a choice?
      window.alert('Local storage quota exceeded. Please clear storage and reload page to try again.')
    }
    // also check for security error?
    // but what does that security error look like if I'm to check for it?
  }
  return { [key]: val }
}

function getLocal(key) {
  if (!('localStorage' in window)) {
    window.alert('This site wants to access html5 localStorage but your browser does not support it. Some features may not be available. Consider upgrading your browser to the most recent version.')
    return false
  }
  var item = window.localStorage.getItem(key)
  if (!item) {
    return false
  } else {
    return JSON.parse(item)
  }
}

export { setLocal, getLocal }

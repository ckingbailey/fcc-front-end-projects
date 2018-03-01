// is it a user login or is it a user id?
function lookupUserParam(param) {
  return typeof +param === 'number' ? 'id' : 'login'
}

// lookup and return a single paramName
function lookupParamName(route, param) {
  const paramTable = {
    '/users': lookupUserParam(param),
    '/streams': 'user_' + lookupUserParam(param),
    '/videos': 'user_id',
    '/search': 'query'
  }
  return paramTable[route]
}

export { lookupParamName }

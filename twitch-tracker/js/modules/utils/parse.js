import { lookupParamName } from './lookup'

function parseKeysToArray(data, key) {
  return data.map(obj => {
    return obj[key]
  })
}

function parseParamsToString(route, params) {
  if (route.includes('?')) {
    route = route.slice(0, route.indexOf('?'))
    console.log('route included "?"', route)
  }
  if (typeof params === 'object') {
    const paramsList = params.reduce((acc, param, i, arr) => {
      const paramName = lookupParamName(route, param)
      if (i !== 0) {
        acc += '&'
      }
      acc += paramName + '=' + param
      return acc
    }, '')
    return paramsList
  } else return `${lookupParamName(route, params)}=${params}`
}

export { parseKeysToArray, parseParamsToString }

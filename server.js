'use strict'

// dependencies
const express = require('express')
const app = express()
const path = require('path')
const request = require('request')

// when in development do as developers do
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').load()
}

// config
const PORT = process.env.PORT || 3001
const WEATHER_KEY = process.env.WEATHER_KEY
const WEATHER_URL = 'http://api.openweathermap.org/data/2.5/weather'
const pubPath = path.resolve(__dirname, 'public')
app.use((req, res, next) => {
  // in development allow other origins
  const allowOrigin = process.env.NODE_ENV === 'production' ?
    'http://ckingbailey.com' : '*'
  res.setHeader('Access-Control-Allow-Origin', allowOrigin)
  res.setHeader('Vary', 'Origin')
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

app.use(express.static(pubPath))

app.post('/weather', (req, res) => {
  // probably get weather here instead of returning key to front-end
  // parse req for units, lat, lon
  const units = 'imperial'
  const latlon = `lat=${req.body.lat}&lon=${req.body.lon}`
  const target = `${WEATHER_URL}?APPID=${WEATHER_KEY}&${latlon}&units=imperial`
  res.set('Content-Type', 'text/plain').send(WEATHER_KEY)
})

const listener = app.listen(PORT, () => {
  console.log('Listening on port ' + listener.address().port)
})

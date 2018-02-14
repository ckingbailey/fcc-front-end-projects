'use strict'

// dependencies
const bodyParser = require('body-parser')
const express = require('express')
const path = require('path')
const qs = require('querystring')
const request = require('request')

const app = express()

// modules
const fetchTwitch = require(path.resolve(__dirname, 'modules/api-calls/fetch_twitch.js'))

// when in development do as developers do
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').load()
}

// config
const PORT = process.env.PORT || 3001
const WEATHER_KEY = process.env.WEATHER_KEY
const WEATHER_URL = 'http://api.openweathermap.org/data/2.5/weather'
const TWITCH_CLIENT_ID = process.env.TWITCH_CLIENT_ID
// const pubPath = path.resolve(__dirname, 'public')

app.use(bodyParser.urlencoded({ extended: false }))

app.use((req, res, next) => {
  // in development allow other origins
  // make a fcn to dynamically set A-C-A-O
  const allowOrigin = '*'
  res.setHeader('Access-Control-Allow-Origin', allowOrigin)
  res.setHeader('Vary', 'Origin')
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

// twitch route now simply returns the appropriate Client_Id
app.get('/twitch', (req, res) => {
  res.send(TWITCH_CLIENT_ID)
})

// routes
app.post('/weather', (req, res) => {
  // probably get weather here instead of returning key to front-end
  // parse req for units, lat, lon
  if (!req.body) return res.status(400).send('We need your POST data, bub')
  console.log('incoming request body:', req.body)
  const units = 'units=imperial'
  const latlon = `lat=${req.body.lat}&lon=${req.body.lon}`
  const target = `${WEATHER_URL}?APPID=${WEATHER_KEY}&${latlon}&${units}`
  request(target, (err, response, body) => {
    // I'm recycling the arg name `res` is that bad?
    if (err) res.status(500).send('There was a problem with the request')
    else if (!body) res.status(500).send('Where\'s the body?')
    else if (body) {
      console.log('openweatherapi response:', JSON.parse(body))
      res.set('Content-Type', 'application/json')
      res.send(JSON.parse(body))
    }
  })
})

const listener = app.listen(PORT, () => {
  console.log('Listening on port ' + listener.address().port)
})

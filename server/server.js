'use strict'

// dependencies
const express = require('express')
const app = express()

// when in development do as developers do
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').load()
}

// config
const PORT = process.env.PORT || 3001
const WEATHER_KEY = process.env.WEATHER_KEY
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://ckingbailey.com')
  res.setHeader('Vary', 'Origin')
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

app.get('/weather', (req, res) => {
  // probably get weather here instead of returning key to front-end
  // parse req for units, lat, lon
  res.set('Content-Type', 'text/plain').send(WEATHER_KEY)
})

const listener = app.listen(PORT, (req, res) => {
  const listeningOn = 'Listening on port ' + listener.address().port
  console.log(listeningOn)
})

process.env.NODE_ENV = 'development'
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const PORT = process.env.PORT || 8181
const knex = require('./db/knex.js')
const knexLogger = require('knex-logger')
// code formating shortcut ctrl+shift+I
// checking server works with giving server local time
app.get('/status', (req, res) => {
  const localTime = new Date().toLocaleTimeString()
  res.status(200).send(`Server time is ${localTime}.`)
})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(knexLogger(knex))

// cors
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
	// res.header('Access-Control-Allow-Origin', req.header('Origin'));
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS')
	// res.header('Access-Control-Allow-Credentials', 'true')
  next()
})

const router = require('./routes/')
app.use('/api/', router)

app.get('*', (req, res) => {
  res.sendStatus(404)
})

app.listen(PORT, () => {
  console.log(`Server running port: ${PORT}.`)
})

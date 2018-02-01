require('dotenv').config()
const express = require('express')
    , app = express()
    , auth = require('./auth')
    , swag = require('./models/swag')
    , bodyParser = require('body-parser')
    , session = require('express-session')
    , checkForSession = require('./checkForSession')
    , port = process.env.SERVER_PORT || 4000

app.use(bodyParser.json())
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}))
// app.use((req, res, next) => {
  //   console.log('session user', req.session.user)
  //   next()
  // })
  // app.use(checkForSession)

app.use('/auth', checkForSession, auth)
  
app.get('/api/swag', (req, res) => {
  res.status(200).send(swag)
})

app.listen(port, () => { console.log(`Listening on ${port}.`) })
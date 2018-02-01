const auth = require('express')()

const users = require('./models/users')
let id = 0

auth.post('/login', (req, res) => {
  const { username, password } = req.body
  const user = users.find(user => user.username === username && user.password === password)
  if (user) {
    req.session.user.username = user.username
    res.status(200).send(user)
  }
  else res.status(500).send("Unauthorized")
})

auth.post('/register', (req, res) => {
  const { username, password } = req.body
  if (users.find(user => user.username === username)) return res.status(500).send("Pick a new username")
  users.push({ id: ++id, username, password })
  req.session.user.username = username
  res.status(200).send(req.session.user)
})

auth.post('/signout', (req, res) => {
  req.session.destroy()
  res.status(200).send(req.session)
})

auth.post('/user', (req, res) => {
  res.status(200).send(req.session.user)
})

module.exports = auth
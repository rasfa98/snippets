const mongoose = require('./config/mongoose')
const express = require('./config/express')
const session = require('express-session')
const credentials = require('./config/credentials')
const helmet = require('helmet')
const csrf = require('csurf')
const path = require('path')

const app = express.run()

mongoose.run().catch(err => {
  console.log(err)
  process.exit(1)
})

app.use(helmet())

app.use(helmet.contentSecurityPolicy({
  directives: { defaultSrc: ["'self'"] }
}))

app.use(session({
  name: 'snippet',
  secret: credentials.secret,
  saveUninitialized: false,
  resave: false,
  cookie: {
    secure: false,
    httpOnly: true,
    maxAge: 99999999
  }
}))

app.use(csrf())

app.use((req, res, next) => {
  res.locals.csrfToken = req.csrfToken()

  next()
})

app.use((req, res, next) => {
  res.locals.flash = req.session.flash
  res.locals.delete = req.session.delete

  delete req.session.flash
  delete req.session.delete

  next()
})

app.use((req, res, next) => {
  res.locals.login = req.session.login
  res.locals.userID = req.session.userID

  next()
})

app.use((req, res, next) => {
  res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0')

  next()
})

app.use('/', require('./routes/home'))
app.use('/filter', require('./routes/filterRoutes'))
app.use('/login', require('./routes/login'))
app.use('/register', require('./routes/register'))
app.use('/manage', require('./routes/manage'))
app.use('/snippet', require('./routes/snippetRoutes'))
app.use('/signout', require('./routes/signout'))

app.use((req, res) => res.status(404).sendFile(path.join(__dirname, '/views/error/404.html')))
app.use((req, res) => res.status(500).sendFile(path.join(__dirname, '/views/error/500.html')))

const express = require('express')
const handlebars = require('express-handlebars')
const path = require('path')
const mongoose = require('./config/mongoose')
const bodyParser = require('body-parser')
const session = require('express-session')
const credentials = require('./config/credentials')
const helmet = require('helmet')
const csrf = require('csurf')

const app = express()
const port = 8000

mongoose.run().catch(err => {
  console.log(err)
  process.exit(1)
})

app.engine('.hbs', handlebars({
  defaultLayout: 'main',
  extname: '.hbs'
}))

app.set('view engine', '.hbs')

app.use(helmet())

app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self'"]
  }
}))

app.use(session({
  name: 'snippet',
  secret: credentials.secret,
  saveUninitialized: false,
  resave: false,
  cookie: {
    secure: false,
    httpOnly: true,
    maxAge: 90000000
  }
}))

app.use(express.static(path.join(__dirname, '/public')))
app.use(bodyParser.urlencoded({ extended: true }))

app.use((req, res, next) => {
  res.locals.flash = req.session.flash

  delete req.session.flash

  next()
})

app.use(csrf())

app.use((req, res, next) => {
  res.locals.login = req.session.login
  res.locals.userID = req.session.userID
  res.locals.csrfToken = req.csrfToken()

  next()
})

app.use('/', require('./routes/home'))
app.use('/filter', require('./routes/filterRoutes'))
app.use('/login', require('./routes/login'))
app.use('/register', require('./routes/register'))
app.use('/manage', require('./routes/manage'))
app.use('/snippet', require('./routes/snippetRoutes'))
app.use('/signout', require('./routes/signout'))

app.use((req, res) => res.status(404).render('404'))
app.use((req, res) => res.status(500).sendStatus(500))

app.listen(port, console.log('Server running...'))

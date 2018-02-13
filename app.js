const express = require('express')
const handlebars = require('express-handlebars')
const path = require('path')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const session = require('express-session')
const credentials = require('./config/credentials')
const expressConfig = require('./config/express')
const mongooseConfig = require('./config/mongoose')

mongoose.connect(mongooseConfig.connectionString)

const app = express()

app.engine('.hbs', handlebars({
  defaultLayout: 'main',
  extname: '.hbs'
}))

app.set('view engine', '.hbs')

app.use(session({
  name: 'snippet',
  secret: credentials.secret,
  saveUnitialized: true,
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

app.use((req, res, next) => {
  res.locals.login = req.session.login

  next()
})

app.use('/', require('./routes/home'))
app.use('/login', require('./routes/login'))
app.use('/register', require('./routes/register'))

app.use('/manage', require('./routes/manage'))
app.use('/snippet', require('./routes/snippetRoutes'))
app.use('/signout', require('./routes/signout'))

app.use((req, res) => res.status(404).render('404'))

app.listen(expressConfig.port, console.log('Server running...'))

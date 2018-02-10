const express = require('express')
const handlebars = require('express-handlebars')
const path = require('path')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const session = require('express-session')
const credentials = require('./config/credentials')

mongoose.connect('mongodb://db/examination2')

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
  res.locals.login = req.session.login
  next()
})

app.use('/', require('./routes/home'))
app.use('/', require('./routes/view'))
app.use('/', require('./routes/register'))
app.use('/', require('./routes/login'))

app.use((req, res, next) => {
  if (req.session.login) {
    next()
  } else {
    res.send(403)
  }
})

app.use('/', require('./routes/create'))
app.use('/', require('./routes/delete'))
app.use('/', require('./routes/edit'))
app.use('/', require('./routes/signout'))

app.use((req, res) => res.status(404).render('404'))

app.listen(8000, console.log('Server running...'))

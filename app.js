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
  saveUnitialized: false,
  resave: true,
  cookie: {
    secure: false,
    httpOnly: true,
    maxAge: 90000000
  }
}))

app.use(express.static(path.join(__dirname, '/public')))

app.use(bodyParser.urlencoded({ extended: true }))

app.use('/', require('./routes/home'))
app.use('/', require('./routes/create'))
app.use('/', require('./routes/view'))
app.use('/', require('./routes/delete'))
app.use('/', require('./routes/edit'))
app.use('/', require('./routes/login'))
app.use('/', require('./routes/register'))

app.listen(8000, console.log('Server running...'))

const express = require('express')
const handlebars = require('express-handlebars')
const path = require('path')
const mongoose = require('mongoose')

mongoose.connect('mongodb://db/examination2')

const app = express()

const PORT = 8000

// View engine
app.engine('.hbs', handlebars({
  defaultLayout: 'main',
  extname: '.hbs'
}))

app.set('view engine', '.hbs')

app.use(express.static(path.join(__dirname, '/public')))

app.use('/', require('./routes/create'))

app.listen(PORT, console.log(`Server running on PORT: ${PORT}...`))

const express = require('express')
const handlebars = require('express-handlebars')
const path = require('path')

const app = express()

app.engine('.hbs', handlebars({
  defaultLayout: 'main',
  extname: '.hbs'
}))

app.set('view engine', '.hbs')

app.use(express.static(path.join(__dirname, '/public')))

app.use('/', (req, res) => res.render('index'))

app.listen(8000)

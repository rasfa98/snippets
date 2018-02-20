/**
 * Express configuration.
 *
 * @module config/express.js
 * @author Rasmus Falk
 * @version 1.0.0
 */

 'use strict'

 const express = require('express')
 const handlebars = require('express-handlebars')
 const path = require('path')
 const bodyParser = require('body-parser')

/**
  * Configures and starts the express application.
  *
  * @returns {object}
  */
 module.exports.run = () => {
   const app = express()
   const port = 8000

   app.engine('.hbs', handlebars({
     defaultLayout: 'main',
     extname: '.hbs'
   }))

   app.set('view engine', '.hbs')

   app.use(express.static(path.join(__dirname, '../public')))
   app.use(bodyParser.urlencoded({ extended: true }))

   app.listen(port, console.log(`Server running on PORT: ${port}...`))

   return app
 }

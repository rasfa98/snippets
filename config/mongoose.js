/**
 * Mongoose configuration.
 *
 * @module config/mongoose.js
 * @author Rasmus Falk
 * @version 1.0.0
 */

 'use strict'

 const mongoose = require('mongoose')

 /**
  * Connects to the database.
  *
  * @returns {Promise}
  */
 module.exports.run = async () => {
   const connectionString = 'mongodb://db/snippets'

   mongoose.Promise = global.Promise

   mongoose.connection.on('connected', () => console.log('Mongoose connection is open.'))
   mongoose.connection.on('error', (err) => console.log(`Mongoose connection error has occured: ${err}.`))
   mongoose.connection.on('disconnected', () => console.log('Mongoose connection is closed.'))

   process.on('SIGINT', () => {
     mongoose.connection.close(() => {
       console.log('Mongoose connection is closed due to application termination.')
       process.exit(0)
     })
   })

   return mongoose.connect(connectionString)
 }

/**
 * Module for checking the different errors.
 *
 * @module lib/checkError.js
 * @author Rasmus Falk
 * @version 1.0.0
 */

 'use strict'

 const flash = require('../lib/flash')
 const path = require('path')

 /**
  * Check each error.
  *
  * @param {object} err Error.
  * @param {object} req Req object.
  * @param {object} res Res object.
  */
 module.exports = (err, req, res) => {
   if (err.name === 'CastError') {
     res.sendFile(path.join(__dirname, '../views/error/404.html'))
   } else if (err.name === 'BulkWriteError') {
     flash(req, res, 'danger', 'The userID is not available.')
   } else if (err.name === 'ValidationError') {
     const value = Object.keys(err.errors)[0]

     flash(req, res, 'danger', err.errors[value].message)
   } else {
     console.log('ERROR:', err)
   }
 }

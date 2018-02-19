/**
 * Module for checking the different errors.
 *
 * @module lib/checkError.js
 * @author Rasmus Falk
 * @version 1.0.0
 */

 'use strict'

 module.exports = (err, req, res) => {
   if (err.name === 'CastError') { res.render('404') }

   if (err.name === 'BulkWriteError') {
     req.session.flash = { type: 'danger', text: 'The userID is not available.' }

     res.redirect('/register')
   }
 }

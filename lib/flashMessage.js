/**
 * Module for flash messages.
 *
 * @module lib/flashMessage.js
 * @author Rasmus Falk
 * @version 1.0.0
 */

 'use strict'

 function create (req, type, message) {
   req.session.flash = {
     type: type,
     message: message
   }
 }

 // Exports
 module.exports.create = create

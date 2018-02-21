/**
 * Module for creating new flash messages.
 *
 * @module lib/flash.js
 * @author Rasmus Falk
 * @version 1.0.0
 */

 'use strict'

 /**
  * Creates a new flash message.
  *
  * @param req Req object.
  * @param res Res object.
  * @param type Type of flash.
  * @param text Text for flash message.
  * @param redirect Path to where the user will be redirected when the flash is created.
  */
 module.exports = (req, res, type, text, redirect = 'back') => {
   req.session.flash = {
     type: type,
     text: text
   }

   res.redirect(redirect)
 }

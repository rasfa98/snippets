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
  * @param text Text of flash message.
  * @param modal Is it a modal flash.
  * @param redirect Path to where user will be redirected when flash is created.
  */
 module.exports = (req, res, type, text, redirect = 'back', modal = false, id = undefined) => {
   req.session.flash = {
     type: type,
     text: text,
     modal: modal,
     id: id
   }

   res.redirect(redirect)
 }

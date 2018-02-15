/**
 * Module for handling authorization.
 *
 * @module lib/authorized.js
 * @author Rasmus Falk
 * @version 1.0.0
 */

'use strict'

// Exports
module.exports = function (req, res, next) {
  req.session.login ? next() : res.send(403)
}

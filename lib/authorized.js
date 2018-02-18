/**
 * Module for handling authorization.
 *
 * @module lib/authorized.js
 * @author Rasmus Falk
 * @version 1.0.0
 */

'use strict'

/**
 * Checks if a user is authorized.
 *
 * @param {object} req Req object.
 * @param {object} res Res object.
 * @param {function} next Function needed to continue in the chain.
 */
module.exports = (req, res, next) => {
  req.session.login ? next() : res.send(403)
}

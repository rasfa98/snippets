/**
 * Module for handling authorization.
 *
 * @module lib/authorized.js
 * @author Rasmus Falk
 * @version 1.0.0
 */

'use strict'

const Snippet = require('../models/Snippet')
const checkError = require('../lib/checkError')

/**
 * Checks if a user is authorized.
 *
 * @param {object} req Req object.
 * @param {object} res Res object.
 * @param {function} next Function needed to continue in the chain.
 */
module.exports = async (req, res, next) => {
  try {
    if (req.session.login) {
      if (req.params.id) {
        const snippet = await Snippet.find({ _id: req.params.id, createdBy: req.session.userID })

        snippet.length === 0 ? res.sendStatus(403) : next()
      } else { next() }
    } else {
      res.sendStatus(403)
    }
  } catch (err) {
    checkError(err, req, res)
  }
}

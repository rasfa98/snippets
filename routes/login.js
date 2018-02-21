/**
 * Module for the login routes.
 *
 * @module routes/login.js
 * @author Rasmus Falk
 * @version 1.0.0
 */

'use strict'

const router = require('express').Router()
const User = require('../models/User')
const checkError = require('../lib/checkError')
const flash = require('../lib/flash')

router.route('/')
    .get((req, res) => req.session.login ? res.redirect('/manage') : res.render('login'))
    .post(async (req, res) => {
      try {
        const user = await User.findOne({ userID: req.body.userID })

        if (user) {
          const match = await user.compare(req.body.password)

          if (match) {
            req.session.login = true
            req.session.userID = user.userID
            res.locals.login = req.session.login
            res.locals.userID = req.session.userID

            res.redirect('/manage')
          } else { flash(req, res, 'danger', 'The userID or password is incorrect.') }
        } else { flash(req, res, 'danger', 'The userID or password is incorrect.') }
      } catch (err) { checkError(err, req, res) }
    })

// Exports
module.exports = router

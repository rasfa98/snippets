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

router.route('/')
    .get((req, res) => res.render('login'))
    .post(async (req, res) => {
      try {
        const user = await User.findOne({ userID: req.body.userID })
        const match = await user.compare(req.body.password)

        if (match) {
          req.session.login = true
          req.session.userID = user.userID
          res.locals.login = req.session.login

          res.redirect('/manage')
        }
      } catch (err) {
        req.session.flash = { type: 'danger', text: 'The userID or password is incorrect.' }
        res.redirect('/login')
      }
    })

// Exports
module.exports = router

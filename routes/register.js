/**
 * Module for the register routes.
 *
 * @module routes/register.js
 * @author Rasmus Falk
 * @version 1.0.0
 */

'use strict'

const router = require('express').Router()
const User = require('../models/User')
const checkError = require('../lib/checkError')
const flash = require('../lib/flash')

router.route('/')
    .get((req, res) => req.session.login ? res.redirect('/manage') : res.render('register'))
    .post(async (req, res) => {
      try {
        const user = new User({
          userID: req.body.userID,
          password: req.body.password
        })

        if (user.password.length > 3) {
          await user.save()

          flash(req, res, 'success', 'Account created successfully!', '/login')
        } else { flash(req, res, 'danger', 'Please use a password with a minimum of 4 characters.') }
      } catch (err) { checkError(err, req, res) }
    })

// Exports
module.exports = router

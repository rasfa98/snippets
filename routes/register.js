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

router.route('/')
    .get((req, res) => res.render('register'))
    .post(async (req, res) => {
      try {
        if (req.body.password === req.body.passwordRepeat) {
          const user = new User({
            userID: req.body.userID,
            password: req.body.password
          })

          await user.save()

          req.session.flash = { type: 'success', text: 'Account created successfully!' }

          res.redirect('/login')
        } else {
          req.session.flash = { type: 'danger', text: 'The passwords do not match.' }

          res.redirect('/register')
        }
      } catch (err) {
        checkError(err, req, res)
      }
    })

// Exports
module.exports = router

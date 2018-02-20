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
        const user = new User({
          userID: req.body.userID,
          password: req.body.password
        })

        await user.save()

        req.session.flash = { type: 'success', text: 'Account created successfully!' }

        res.redirect('/login')
      } catch (err) {
        checkError(err, req, res)
      }
    })

// Exports
module.exports = router

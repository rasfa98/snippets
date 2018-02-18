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

router.route('/')
    .get((req, res) => res.render('register'))
    .post(async (req, res) => {
      try {
        const user = new User({
          userID: req.body.userID,
          password: req.body.password
        })

        await user.save()
        req.session.login = true
        req.session.userID = user.userID
        res.locals.login = req.session.login

        req.session.flash = { type: 'info', text: `Welcome ${user.userID}! Here you can view, update and delete your own snippets.\
        If you want to see the snippets created by other users go to the "home" page!` }

        res.redirect('/manage')
      } catch (err) {
        if (err.name === 'BulkWriteError') {
          req.session.flash = { type: 'danger', text: 'The userID is not available.' }

          res.redirect('/register')
        }
      }
    })

// Exports
module.exports = router

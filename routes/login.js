/**
 * Module for the login routes.
 *
 * @module routes/login.js
 * @author Rasmus Falk
 * @version 1.0.0
 */

'use strict'

const router = require('express').Router()
const flashMessage = require('../lib/flashMessage')
const User = require('../models/User')

router.route('/')
    .get((req, res) => res.render('login'))
    .post((req, res) => {
      User.findOne({ userID: req.body.userID })
      .then(user => {
        user.compare(req.body.password)
        .then(match => {
          if (match) {
            req.session.login = true
            req.session.userID = user.userID
            res.locals.login = req.session.login

            res.redirect('/manage')
          }
        })
      })
      .catch(() => {
        flashMessage.create(req, 'danger', 'The userID or password is incorrect.')

        res.redirect('/login')
      })
    })

// Exports
module.exports = router

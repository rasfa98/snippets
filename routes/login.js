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
    .post((req, res) => {
      User.findOne({userID: req.body.userID, password: req.body.password})
      .then(user => {
        if (user) {
          req.session.login = true
          req.session.userID = user.userID
          res.locals.login = req.session.login
          res.redirect('/')
        }
      })
      .catch(e => console.log('ERROR:', e))
    })

// Exports
module.exports = router

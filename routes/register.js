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

router.route('/register')
    .get((req, res) => res.render('register'))
    .post((req, res) => {
      const user = new User({
        userID: req.body.userID,
        password: req.body.password
      })

      User.find({})
      .then(data => console.log(data))

      user.save()
      .then(res.redirect('/'))
    })

// Exports
module.exports = router

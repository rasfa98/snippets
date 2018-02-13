/**
 * Module for the home routes.
 *
 * @module routes/home.js
 * @author Rasmus Falk
 * @version 1.0.0
 */

'use strict'

const router = require('express').Router()
const Snippet = require('../models/Snippet')
// const User = require('../models/User')

router.route('/')
    .get((req, res) => {
      // Clear DB
      // User.remove({}).then(data => console.log(data))
      // Snippet.remove({}).then(data => console.log(data))

      Snippet.find({})
      .then(data => {
        const context = {
          snippets: data.map(x => {
            return { id: x.id, title: x.title, createdBy: x.createdBy }
          })
        }

        res.render('home', context)
      })
      .catch(e => console.log('ERROR:', e))
    })

// Exports
module.exports = router

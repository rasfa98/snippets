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

router.route('/')
    .get((req, res) => {
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

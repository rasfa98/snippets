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
    .get(async (req, res) => {
      const data = await Snippet.find({})

      const context = {
        snippets: data.map(x => {
          return { id: x.id, title: x.title, createdBy: x.createdBy }
        })
      }

      res.render('home', context)
    })

// Exports
module.exports = router

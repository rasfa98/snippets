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
      try {
        const snippets = await Snippet.find({})

        const context = {
          snippets: snippets.map(x => {
            return { id: x._id, title: x.title, createdBy: x.createdBy }
          })
        }

        res.render('home', context)
      } catch (err) {
        console.log(err)
      }
    })

// Exports
module.exports = router

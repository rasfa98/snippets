/**
 * Module for the filter routes.
 *
 * @module routes/filter.js
 * @author Rasmus Falk
 * @version 1.0.0
 */

'use strict'

const router = require('express').Router()
const Snippet = require('../models/Snippet')

router.route('/:tag')
    .get((req, res) => {
      Snippet.find({ tags: req.params.tag })
      .then(data => {
        const context = {
          tag: req.params.tag,
          snippets: data.map(x => {
            return { id: x.id, title: x.title, createdBy: x.createdBy, date: x.date }
          })
        }

        res.render('filter', context)
      })
      .catch(e => console.log('ERROR:', e))
    })

// Exports
module.exports = router

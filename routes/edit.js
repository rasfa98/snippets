/**
 * Module for the edit routes.
 *
 * @module routes/view.js
 * @author Rasmus Falk
 * @version 1.0.0
 */

'use strict'

const router = require('express').Router()
const Snippet = require('../models/Snippet')

router.route('/snippet/edit/:id')
    .get((req, res) => {
      const id = req.params.id

      Snippet.findOne({_id: id})
    .then(data => {
      const context = {
        id: data.id, title: data.title, body: data.body
      }

      res.render('edit', context)
    })
    .catch(e => console.log('ERROR:', e))
    })
    .post((req, res) => {
      const id = req.params.id

      Snippet.findOneAndUpdate({_id: id}, { title: req.body.snippetTitle, body: req.body.snippetBody }, { runValidators: true })
      .then(res.redirect('/'))
    })

// Exports
module.exports = router

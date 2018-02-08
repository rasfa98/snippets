/**
 * Module for the view routes.
 *
 * @module routes/view.js
 * @author Rasmus Falk
 * @version 1.0.0
 */

'use strict'

const router = require('express').Router()
const Snippet = require('../models/Snippet')

router.route('/snippet/view/:id')
    .get((req, res) => {
      const id = req.params.id

      Snippet.findOne({_id: id})
    .then(data => {
      const context = {
        id: data.id, title: data.title, body: data.body
      }

      res.render('view', context)
    })
    .catch(e => console.log('ERROR:', e))
    })

// Exports
module.exports = router

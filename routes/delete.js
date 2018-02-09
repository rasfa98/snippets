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

router.route('/snippet/delete/:id')
    .get((req, res) => {
      const id = req.params.id

      Snippet.findOneAndRemove({_id: id})
    .then(data => {
      res.redirect('/')
    })
    .catch(e => console.log('ERROR:', e))
    })

// Exports
module.exports = router

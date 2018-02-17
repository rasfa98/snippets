/**
 * Module for the filter routes.
 *
 * @module routes/filterRoutes.js
 * @author Rasmus Falk
 * @version 1.0.0
 */

'use strict'

const router = require('express').Router()
const Snippet = require('../models/Snippet')

router.route('/tag/:tag')
    .get((req, res) => {
      Snippet.find({ tags: req.params.tag })
      .then(data => {
        const context = {
          value: req.params.tag,
          type: 'tag',
          snippets: data.map(x => {
            return { id: x.id, title: x.title, createdBy: x.createdBy }
          })
        }

        res.render('filter', context)
      })
      .catch(e => console.log('ERROR:', e))
    })

router.route('/user/:user')
    .get((req, res) => {
      Snippet.find({ createdBy: req.params.user })
      .then(data => {
        const context = {
          value: req.params.user,
          type: 'user',
          snippets: data.map(x => {
            return { id: x.id, title: x.title, createdBy: x.createdBy }
          })
        }

        res.render('filter', context)
      })
      .catch(e => console.log('ERROR:', e))
    })

// Exports
module.exports = router

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
    .get(async (req, res) => {
      const data = await Snippet.find({ tags: req.params.tag })

      const context = {
        value: req.params.tag,
        type: 'tag',
        snippets: data.map(x => {
          return { id: x.id, title: x.title, createdBy: x.createdBy }
        })
      }

      res.render('filter', context)
    })

router.route('/user/:user')
    .get(async (req, res) => {
      const data = await Snippet.find({ createdBy: req.params.user })

      const context = {
        value: req.params.user,
        type: 'user',
        snippets: data.map(x => {
          return { id: x.id, title: x.title, createdBy: x.createdBy }
        })
      }

      res.render('filter', context)
    })

// Exports
module.exports = router

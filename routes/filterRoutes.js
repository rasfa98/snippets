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
const checkError = require('../lib/checkError')

router.route('/tag/:tag')
    .get(async (req, res) => {
      try {
        const snippets = await Snippet.find({ tags: req.params.tag })

        const context = {
          value: req.params.tag,
          type: 'tag',
          count: snippets.length,
          snippets: snippets.map(x => {
            return { id: x._id, title: x.title, createdBy: x.createdBy }
          })
        }

        res.render('filter', context)
      } catch (err) { checkError(err, req, res) }
    })

router.route('/user/:user')
    .get(async (req, res) => {
      try {
        const snippets = await Snippet.find({ createdBy: req.params.user })

        const context = {
          value: req.params.user,
          type: 'user',
          count: snippets.length,
          snippets: snippets.map(x => {
            return { id: x._id, title: x.title, createdBy: x.createdBy }
          })
        }

        res.render('filter', context)
      } catch (err) { checkError(err, req, res) }
    })

// Exports
module.exports = router

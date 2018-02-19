/**
 * Module for the manage snippets routes.
 *
 * @module routes/manage.js
 * @author Rasmus Falk
 * @version 1.0.0
 */

'use strict'

const router = require('express').Router()
const Snippet = require('../models/Snippet')
const authorized = require('../lib/authorized')
const checkError = require('../lib/checkError')

router.route('/')
    .get(authorized, async (req, res) => {
      try {
        const snippets = await Snippet.find({ createdBy: req.session.userID })

        const context = {
          snippets: snippets.map(x => {
            return { id: x._id, title: x.title, date: x.date }
          })
        }

        res.render('manage', context)
      } catch (err) {
        checkError(err, req, res)
      }
    })

// Exports
module.exports = router

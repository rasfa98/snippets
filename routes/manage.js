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

router.route('/')
    .get(authorized, async (req, res) => {
      const data = await Snippet.find({createdBy: req.session.userID})

      const context = {
        snippets: data.map(x => {
          return { id: x.id, title: x.title, date: x.date }
        })
      }

      res.render('manage', context)
    })

// Exports
module.exports = router

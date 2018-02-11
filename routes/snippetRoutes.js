/**
 * Module for the snippet routes.
 *
 * @module routes/snippetRoutes.js
 * @author Rasmus Falk
 * @version 1.0.0
 */

'use strict'

const router = require('express').Router()
const Snippet = require('../models/Snippet')

// Create
router.route('/create')
    .get((req, res) => res.render('snippet/create'))
    .post((req, res) => {
      const snippet = new Snippet({
        title: req.body.snippetTitle,
        body: req.body.snippetBody,
        createdBy: req.session.userID
      })

      snippet.save()
      .then(res.redirect('/'))
    })

// Delete
router.route('/delete/:id')
    .get((req, res) => {
      const id = req.params.id

      Snippet.findOneAndRemove({_id: id})
      .then(res.redirect('/'))
      .catch(e => console.log('ERROR:', e))
    })

// Edit
router.route('/edit/:id')
    .get((req, res) => {
      const id = req.params.id

      Snippet.findOne({_id: id})
      .then(data => {
        const context = {
          id: data.id, title: data.title, body: data.body
        }

        res.render('snippet/edit', context)
      })
      .catch(e => console.log('ERROR:', e))
    })
    .post((req, res) => {
      const id = req.params.id

      Snippet.findOneAndUpdate({_id: id}, { title: req.body.snippetTitle, body: req.body.snippetBody }, { runValidators: true })
      .then(res.redirect('/'))
    })

// View
router.route('/view/:id')
    .get((req, res) => {
      const id = req.params.id

      Snippet.findOne({_id: id})
      .then(data => {
        const context = {
          id: data.id, title: data.title, body: data.body
        }

        res.render('snippet/view', context)
      })
      .catch(e => console.log('ERROR:', e))
    })

// Exports
module.exports = router

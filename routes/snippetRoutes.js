/**
 * Module for the snippet routes.
 *
 * @module routes/snippetRoutes.js
 * @author Rasmus Falk
 * @version 1.0.0
 */

'use strict'

const router = require('express').Router()
const flashMessage = require('../lib/flashMessage')
const Snippet = require('../models/Snippet')
const authorized = require('../lib/authorized')

// Create
router.route('/create')
    .get(authorized, (req, res) => res.render('snippet/create'))
    .post(authorized, (req, res) => {
      const tags = req.body.snippetTags.split(',')
      .map(x => x.trim())

      const snippet = new Snippet({
        title: req.body.snippetTitle,
        body: req.body.snippetBody,
        createdBy: req.session.userID,
        tags: tags
      })

      snippet.save()
      .then(() => {
        flashMessage.create(req, 'success', 'Snippet created successfully!')

        res.redirect('/manage')
      })
      .catch(e => console.log('ERROR:', e))
    })

// Delete
router.route('/delete/:id')
    .get(authorized, (req, res) => {
      Snippet.findOneAndRemove({_id: req.params.id, userID: req.params.userID})
      .then(() => {
        flashMessage.create(req, 'success', 'Snippet successfully deleted.')

        res.redirect('/manage')
      })
      .catch(e => console.log('ERROR:', e))
    })

// Edit
router.route('/edit/:id')
    .get(authorized, (req, res) => {
      Snippet.findOne({_id: req.params.id, userID: req.params.userID})
      .then(data => {
        const context = {
          id: data.id, title: data.title, body: data.body, date: Date.now(), tags: data.tags
        }

        res.render('snippet/edit', context)
      })
      .catch(e => console.log('ERROR:', e))
    })
    .post(authorized, (req, res) => {
      const id = req.params.id

      const tags = req.body.snippetTags.split(',')
      .map(x => x.trim())

      Snippet.findOneAndUpdate({ _id: id }, {
        title: req.body.snippetTitle,
        body: req.body.snippetBody,
        tags: tags },
        { runValidators: true })
      .then(snippet => {
        flashMessage.create(req, 'success', 'Edit(s) has been saved.')

        res.redirect(`/snippet/edit/${snippet._id}`)
      })
      .catch(e => console.log('ERROR:', e))
    })

// View
router.route('/view/:id')
    .get((req, res) => {
      const id = req.params.id

      Snippet.findOne({_id: id})
      .then(data => {
        const context = {
          id: data.id, title: data.title, body: data.body, tags: data.tags
        }

        if (context.tags[0] === '') { context.tags = undefined }

        res.render('snippet/view', context)
      })
      .catch(e => console.log('ERROR:', e))
    })

// Exports
module.exports = router

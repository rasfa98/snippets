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
const authorized = require('../lib/authorized')
const filter = require('../lib/filter')

// Create
router.route('/create')
    .get(authorized, (req, res) => res.render('snippet/create'))
    .post(authorized, async (req, res) => {
      const tags = filter.addTags(req)

      const snippet = new Snippet({
        title: req.body.snippetTitle,
        body: req.body.snippetBody,
        createdBy: req.session.userID,
        tags: tags
      })

      await snippet.save()
      req.session.flash = { type: 'success', text: 'Snippet created successfully!' }

      res.redirect('/manage')
    })

// Delete
router.route('/delete/:id')
    .get(authorized, async (req, res) => {
      await Snippet.findOneAndRemove({_id: req.params.id, userID: req.params.userID})

      req.session.flash = { type: 'success', text: 'Snippet successfully deleted.' }

      res.redirect('/manage')
    })

// Edit
router.route('/edit/:id')
    .get(authorized, async (req, res) => {
      const data = await Snippet.findOne({_id: req.params.id, userID: req.params.userID})

      const context = {
        id: data.id, title: data.title, body: data.body, date: Date.now(), tags: data.tags
      }

      res.render('snippet/edit', context)
    })
    .post(authorized, async (req, res) => {
      const id = req.params.id

      const tags = filter.addTags(req)

      const snippet = await Snippet.findOneAndUpdate({ _id: id }, {
        title: req.body.snippetTitle,
        body: req.body.snippetBody,
        tags: tags },
        { runValidators: true })

      req.session.flash = { type: 'success', text: 'Edit(s) has been saved.' }

      res.redirect(`/snippet/edit/${snippet._id}`)
    })

// View
router.route('/view/:id')
    .get(async (req, res) => {
      const id = req.params.id

      const data = await Snippet.findOne({_id: id})
      const context = {
        id: data.id, title: data.title, body: data.body, tags: data.tags
      }

      if (context.tags[0] === '') { context.tags = undefined }

      res.render('snippet/view', context)
    })

// Exports
module.exports = router

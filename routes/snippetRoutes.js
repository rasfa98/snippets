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
const checkError = require('../lib/checkError')
const flash = require('../lib/flash')

// Create
router.route('/create')
    .get(authorized, (req, res) => res.render('snippet/create'))
    .post(authorized, async (req, res) => {
      try {
        const snippet = new Snippet({
          title: req.body.snippetTitle,
          body: req.body.snippetBody,
          createdBy: req.session.userID,
          tags: filter.addTags(req)
        })

        await snippet.save()

        flash(req, res, 'success', 'Snippet successfully created!', '/manage')
      } catch (err) { checkError(err, req, res) }
    })

// Delete
router.route('/delete/:id')
    .get(authorized, async (req, res) => {
      req.session.delete = { type: 'danger', text: 'Do you want to delete this snippet?', id: req.params.id }
      res.redirect('back')
    })
    .post(authorized, async (req, res) => {
      try {
        await Snippet.findOneAndRemove({ _id: req.params.id, createdBy: req.session.userID })

        flash(req, res, 'success', 'Snippet successfully deleted.')
      } catch (err) { checkError(err, req, res) }
    })

// Edit
router.route('/edit/:id')
    .get(authorized, async (req, res) => {
      try {
        const snippet = await Snippet.findOne({ _id: req.params.id })
        const context = { id: snippet.id, title: snippet.title, body: snippet.body, tags: snippet.tags }

        res.render('snippet/edit', context)
      } catch (err) { checkError(err, req, res) }
    })
    .post(authorized, async (req, res) => {
      try {
        await Snippet.findOneAndUpdate({ _id: req.params.id, createdBy: req.session.userID }, {
          title: req.body.snippetTitle,
          body: req.body.snippetBody,
          tags: filter.addTags(req)
        }, { runValidators: true })

        flash(req, res, 'success', 'Edit(s) has been saved.')
      } catch (err) { checkError(err, req, res) }
    })

// View
router.route('/view/:id')
    .get(async (req, res) => {
      try {
        const snippet = await Snippet.findOne({ _id: req.params.id })
        const context = { id: snippet.id, title: snippet.title, body: snippet.body, createdBy: snippet.createdBy, tags: snippet.tags }

        context.tags = snippet.tags.map(x => {
          return { text: x, url: encodeURI(x) }
        })

        res.render('snippet/view', context)
      } catch (err) { checkError(err, req, res) }
    })

// Exports
module.exports = router

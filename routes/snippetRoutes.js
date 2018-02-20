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

// Create
router.route('/create')
    .get(authorized, (req, res) => res.render('snippet/create'))
    .post(authorized, async (req, res) => {
      try {
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
      } catch (err) {
        checkError(err, req, res)
      }
    })

// Delete
router.route('/delete/:id')
    .get(authorized, async (req, res) => {
      req.session.flash = { type: 'info', text: `Do you want to delete this snippet?`, modal: true, id: req.params.id }
      res.redirect('/manage')
    })
    .post(authorized, async (req, res) => {
      try {
        await Snippet.findOneAndRemove({ _id: req.params.id, createdBy: req.session.userID })

        req.session.flash = { type: 'success', text: 'Snippet successfully deleted.' }

        res.redirect('/manage')
      } catch (err) {
        checkError(err, req, res)
      }
    })

// Edit
router.route('/edit/:id')
    .get(authorized, async (req, res) => {
      try {
        const snippet = await Snippet.findOne({ _id: req.params.id })

        const context = {
          id: snippet.id, title: snippet.title, body: snippet.body, tags: snippet.tags
        }

        res.render('snippet/edit', context)
      } catch (err) {
        checkError(err, req, res)
      }
    })
    .post(authorized, async (req, res) => {
      try {
        const tags = filter.addTags(req)

        const snippet = await Snippet.findOneAndUpdate({ _id: req.params.id, createdBy: req.session.userID }, {
          title: req.body.snippetTitle,
          body: req.body.snippetBody,
          tags: tags
        }, { runValidators: true })

        req.session.flash = { type: 'success', text: 'Edit(s) has been saved.' }

        res.redirect(`/snippet/edit/${snippet._id}`)
      } catch (err) {
        checkError(err, req, res)
      }
    })

// View
router.route('/view/:id')
    .get(async (req, res) => {
      try {
        const snippet = await Snippet.findOne({ _id: req.params.id })

        const context = {
          id: snippet.id, title: snippet.title, body: snippet.body, tags: snippet.tags, createdBy: snippet.createdBy
        }

        res.render('snippet/view', context)
      } catch (err) {
        checkError(err, req, res)
      }
    })

// Exports
module.exports = router

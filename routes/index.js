'use strict'

const express = require('express')
const Post = require('../models')
const debug = require('debug')('reigndesign:routes')

const router = express.Router()

router.get('/', (req, res, next) => {
  debug('get /')
  Post.find().sort('-created_at').find((err, data) => {
    if (err) return next(new Error(err.message))

    res.render('index', { data })
  })
})

router.delete('/:id', (req, res, next) => {
  debug('delete /')
  const id = req.params.id

  Post.findOneAndRemove({ objectID: id }, (err, data) => {
    if (err) return next(new Error(err.message))

    Post.find((err, data) => {
      if (err) return next(new Error(err.message))

      res.render('index', { data })
    })
  })
})

module.exports = router

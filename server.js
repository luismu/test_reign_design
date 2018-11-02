'use strict'

const express = require('express')
const debug = require('debug')('reigndesign:server')

const routes = require('./routes')

const { cron, prettyDate } = require('./utils')
const methodOverride = require('method-override')

const app = express()
app.locals.prettyDate = prettyDate

const PORT = process.env.PORT || 3000

cron()

app.set('view engine', 'pug')

app.use(methodOverride('_method'))
app.use('/', routes)

app.use((err, req, res, next) => {
  debug(err)
  res.status(500).send({ error: err.message })
})

app.listen(PORT, () => debug(`Server listening in port ${PORT}`))

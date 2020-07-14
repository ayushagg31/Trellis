const express = require('express')
const boardHandler = require('./boardHandler')
const listHandler = require('./listHandler')
const cardHandler = require('./cardHandler')

const app = express()

app.use('/boards', boardHandler)
app.use('/lists', listHandler)
app.use('/cards', cardHandler)

module.exports = app



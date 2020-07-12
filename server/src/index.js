/* eslint-disable no-unused-vars */
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const helmet = require('helmet')

const app = express()
const PORT = 8080

app.get('/', (req, res) => {
    res.json({
        message: 'success'
    }).status(201)
})

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})

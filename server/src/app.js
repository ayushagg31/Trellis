const express = require('express')
/* eslint-disable no-unused-vars */
const cors = require('cors')
const morgan = require('morgan')
const helmet = require('helmet')
const mongoose = require('mongoose')
const apiHandler = require('./api/apiHandler')
const { notFoundHandler, errorHandler } = require('./middleware')

const app = express()

mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})


app.use(morgan('tiny'))
app.use(helmet())
app.use(cors({
    origin: process.env.CORS_URL
}))

app.use(express.json())

app.get('/', (req, res) => {
    res.json({
        message: 'success',
        staus: res.statusCode
    })
})
app.use('/api/', apiHandler)
app.use(notFoundHandler)
app.use(errorHandler)


if (process.env.NODE_ENV === 'production') {
    app.use(express.static('../../client/build'))
}


module.exports = app

const jwt = require('jsonwebtoken')

const notFoundHandler = ('*', (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`)
    res.status(404)
    next(error)
})

const auth = (req, res, next) => {
    const token = req.header('x-auth-token')
    try {
        if (!token)
            return res.status(401)
                .json({ msg: 'No authentication token, access denied.' })

        const verified = jwt.verify(token, process.env.JWT_SECRET)
        if (!verified)
            return res.status(401)
                .json({ msg: 'Token verification failed, access denied.' })
        req.user = verified.id
        next()
    } catch (error) {
        next(error)
    }
}

/* eslint-disable-next-line no-unused-vars */
const errorHandler = (error, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode
    res.status(statusCode)
    if (process.env.NODE_ENV === 'production')
        return res.json({ message: 'error occured' })

    res.json({
        message: error.message,
        stack: error.stack,
        status: statusCode
    })
}

module.exports =
    module.exports = {
        auth,
        notFoundHandler,
        errorHandler,
    }

const { Router } = require('express')
const Activity = require('../models/activity')

const router = Router()

// create new activity
router.post('/', async (req, res, next) => {
    try {
        const activity = new Activity(req.body)
        const respData = await activity.save()
        res.send(respData)
    } catch (error) {
        if (error.name === 'ValidationError')
            res.status(422)
        next(error)
    }
})

module.exports = router
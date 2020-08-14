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

// delete activity based on id
router.delete('/:id', async (req, res, next) => {
    const _id = req.params.id
    try {
        const activity = await Activity.findByIdAndDelete(_id)
        if (!activity)
            return res.status(404).send()
        res.send(activity)
    } catch (error) {
        next(error)
    }
})

module.exports = router
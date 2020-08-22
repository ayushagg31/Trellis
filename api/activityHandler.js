const { Router } = require('express')
const Activity = require('../models/activity')
const Board = require('../models/board')
const { auth } = require('../middleware')

const router = Router()

// // get all activities
// router.get('/', async (req, res, next) => {
//     try {
//         const activities = await Activity.find()
//         res.json(activities)
//     } catch (error) {
//         next(error)
//     }
// })

// create new activity
router.post('/', auth, async (req, res, next) => {
    try {
        const boardId = req.body.boardId
        const board = await Board.findOne({ _id: boardId, userId: req.user })
        if (!board)
            return res.status(404).send()
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
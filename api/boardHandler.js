const { Router } = require('express')
const Board = require('../models/board')
const List = require('../models/list')
const Card = require('../models/card')
const Activity = require('../models/activity')
const { auth } = require('../middleware')
const router = Router()

// fetch all the boards for a user
router.get('/', auth, async (req, res, next) => {
    try {
        const boardsList = await Board.find({ userId: req.user })
        res.json(boardsList)
    } catch (error) {
        console.log(error)
        next(error)
    }
})

// create new board for a user
router.post('/', async (req, res, next) => {
    try {
        const board = new Board(req.body)
        const respData = await board.save()
        res.send(respData)
    } catch (error) {
        if (error.name === 'ValidationError')
            res.status(422)
        next(error)
    }
})

// get board based on id for a user
router.get('/:id', auth, async (req, res, next) => {
    const _id = req.params.id
    try {
        const board = await Board.findOne({ _id, userId: req.user })
        if (!board)
            return res.status(404).send()
        res.send(board)
    } catch (error) {
        next(error)
    }
})

// get lists based on boardId
router.get('/:id/lists', auth, async (req, res, next) => {
    const _id = req.params.id
    try {
        const board = await Board.findOne({ _id, userId: req.user })
        if (!board)
            return res.status(404).send()
        const lists = await List.find({ boardId: _id })
        res.send(lists)
    } catch (error) {
        next(error)
    }
})

// get cards based on boardId
router.get('/:id/cards', auth, async (req, res, next) => {
    const _id = req.params.id
    try {
        const board = await Board.findOne({ _id, userId: req.user })
        if (!board)
            return res.status(404).send()
        const cards = await Card.find({ boardId: _id })
        res.send(cards)
    } catch (error) {
        next(error)
    }
})

// get activities based on boardId
router.get('/:id/activities', auth, async (req, res, next) => {
    const _id = req.params.id
    const _last = req.query.last
    const _limit = Number.parseInt(req.query.limit, 10) || 10
    try {
        const board = await Board.findOne({ _id, userId: req.user })
        if (!board)
            return res.status(404).send()
        const query = { boardId: _id }
        if (_last)
            query._id = {'$lt': _last}
        const activities = await Activity.find(query, null, { limit: _limit + 1, sort: { _id: 'desc' } })
        res.append('X-Has-More', activities.length === _limit + 1 ? 'true' : 'false')
        res.send(activities.slice(0, _limit))
    } catch (error) {
        next(error)
    }
})

// update board content based on id
router.patch('/:id', auth, async (req, res, next) => {
    const _id = req.params.id
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'image']
    const isValidOperation = updates.every(
        (update) => allowedUpdates.includes(update))
    if (!isValidOperation)
        return res.status(400).send({ error: 'Invalid updates!' })
    try {
        const board = await Board.
            findOneAndUpdate({ _id, userId: req.user }, req.body, { new: true, runValidators: true })
        if (!board)
            return res.status(404).send({ error: 'Board not found!' })
        res.send(board)
    } catch (error) {
        next(error)
    }
})


// delete board based on id
router.delete('/:id', auth, async (req, res, next) => {
    const _id = req.params.id
    try {
        const board = await Board.findOneAndDelete({ _id, userId: req.user })
        if (!board)
            return res.status(404).send()
        // find all lists within board and delete them as well
        const lists = await List.find({ boardId: _id })
        lists.forEach(async (list) => {
            // find all cards within each lists and delete them as well
            const cards = await Card.find({ listid: list._id })
            cards.forEach(async (card) => (
                await Card.deleteOne({ _id: card._id })))
            await List.deleteOne({ _id: list._id })
        })
        // find all activities within board and delete them as well
        const activities = await Activity.find({ boardId: _id })
        activities.forEach(async (activity) => {
            await Activity.deleteOne({ _id: activity._id })
        })
        res.send(board)
    } catch (error) {
        next(error)
    }
})


module.exports = router

const { Router } = require('express')
const Board = require('../models/board')
const List = require('../models/list')
const Card = require('../models/card')
const { auth } = require('../middleware')
const router = Router()

// // fetch all the list entries from the db
// router.get('/', async (req, res, next) => {
//     try {
//         const listEntries = await List.find()
//         res.json(listEntries)
//     } catch (error) {
//         next(error)
//     }
// })

// create new entry of list
router.post('/', auth, async (req, res, next) => {
    try {
        const boardId = req.body.boardId
        const board = await Board.findOne({ _id: boardId, userId: req.user })
        if (!board)
            return res.status(404).send()
        const list = new List(req.body)
        const respData = await list.save()
        res.send(respData)
    } catch (error) {
        if (error.name === 'ValidationError')
            res.status(422)
        next(error)
    }
})


// get list based on listId
router.get('/:id', async (req, res, next) => {
    const _id = req.params.id
    try {
        const lists = await List.findById(_id)
        if (!lists)
            return res.status(404).send()
        res.send(lists)
    } catch (error) {
        next(error)
    }
})

// fetch cards based on list-id
router.get('/:id/cards', async (req, res, next) => {
    const _id = req.params.id
    try {
        const lists = await List.findById(_id)
        if (!lists)
            return res.status(404).send()
        const cards = await Card.find({ listID: _id })
        res.send(cards)
    } catch (error) {
        next(error)
    }
})

// update list content based on id
router.patch('/:id', async (req, res, next) => {
    const _id = req.params.id
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'order']
    const isValidOperation = updates.every(
        (update) => allowedUpdates.includes(update))
    if (!isValidOperation)
        return res.status(400).send({ error: 'Invalid updates!' })
    try {
        const list = await List.findByIdAndUpdate(_id, req.body, { new: true, runValidators: true })
        if (!list)
            return res.status(404).send({ error: 'List not found!' })
        res.send(list)
    } catch (error) {
        next(error)
    }
})

// delete list based on id
router.delete('/:id', async (req, res, next) => {
    const _id = req.params.id
    try {
        const list = await List.findByIdAndDelete(_id)
        if (!list)
            return res.status(404).send()
        // find all cards within list and delete them as well
        const cards = await Card.find({ listid: _id })
        cards.forEach(async (card) => (
            await Card.deleteOne({ _id: card._id })))
        res.send(list)
    } catch (error) {
        next(error)
    }
})

module.exports = router


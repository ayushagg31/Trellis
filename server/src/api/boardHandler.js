const { Router } = require('express')
const Board = require('../models/board')
const List = require('../models/list')

const router = Router()

// fetch all the board entries
router.get('/', async (req, res, next) => {
    try {
        const boardsList = await Board.find()
        res.json(boardsList)
    } catch (error) {
        next(error)
    }
})

// create new board entry
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

// get board based on id
router.get('/:id', async (req, res, next) => {
    const _id = req.params.id
    try {
        const board = await Board.findById(_id)
        if (!board)
            return res.status(404).send()
        res.send(board)
    } catch (error) {
        next(error)
    }
})

router.get('/:id/lists', async (req, res, next) => {
    const _id = req.params.id
    try {
        const board = await Board.findById(_id)
        if (!board)
            return res.status(404).send()
        const lists = await List.find({ boardId: _id })
        res.send(lists)
    } catch (error) {
        next(error)
    }
})


module.exports = router

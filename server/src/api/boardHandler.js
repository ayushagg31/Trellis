const { Router } = require('express')
const Board = require('../models/board')

const router = Router()


router.get('/', async (req, res, next) => {
    try {
        const boardsList = await Board.find()
        res.json(boardsList)
    } catch (error) {
        next(error)
    }
})

router.post('/', async (req, res, next) => {
    try {
        const board = new Board(req.body)
        const respData = await board.save()
        res.send(respData)
    } catch (error) {
        if (error.name === 'ValidationError')
            res.status(422)
        else
            res.status(400)
        next(error)
    }
})

module.exports = router


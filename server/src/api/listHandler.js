const { Router } = require('express')
const List = require('../models/list')
const Card = require('../models/card')
const router = Router()


router.get('/', async (req, res, next) => {
    try {
        const listEntries = await List.find()
        res.json(listEntries)
    } catch (error) {
        next(error)
    }
})

router.post('/', async (req, res, next) => {
    try {
        const list = new List(req.body)
        const respData = await list.save()
        res.send(respData)
    } catch (error) {
        if (error.name === 'ValidationError')
            res.status(422)
        else
            res.status(400)
        next(error)
    }
})


// get list based on board id
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

module.exports = router


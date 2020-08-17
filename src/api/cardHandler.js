const { Router } = require('express')
const Card = require('../models/card')

const router = Router()

// fetch all the card entries from db
router.get('/', async (req, res, next) => {
    try {
        const cardEntries = await Card.find()
        res.json(cardEntries)
    } catch (error) {
        next(error)
    }
})

// create new card entry
router.post('/', async (req, res, next) => {
    try {
        const card = new Card(req.body)
        const respData = await card.save()
        res.send(respData)
    } catch (error) {
        if (error.name === 'ValidationError')
            res.status(422)
        next(error)
    }
})

// get cards based on cardId
router.get('/:id', async (req, res, next) => {
    const _id = req.params.id
    try {
        const cards = await Card.findById(_id)
        if (!cards)
            return res.status(404).send({ error: 'Card not found!' })
        res.send(cards)
    } catch (error) {
        next(error)
    }
})

// update card content based on id
router.patch('/:id', async (req, res, next) => {
    const _id = req.params.id
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'listId', 'order']
    const isValidOperation = updates.every(
        (update) => allowedUpdates.includes(update))
    if (!isValidOperation)
        return res.status(400).send({ error: 'Invalid updates!' })
    try {
        const card = await Card.findByIdAndUpdate(_id, req.body, { new: true, runValidators: true })
        if (!card)
            return res.status(404).send({ error: 'Card not found!' })
        res.send(card)
    } catch (error) {
        next(error)
    }
})

// delete card based on id
router.delete('/:id', async (req, res, next) => {
    const _id = req.params.id
    try {
        const card = await Card.findByIdAndDelete(_id)
        if (!card)
            return res.status(404).send()
        res.send(card)
    } catch (error) {
        next(error)
    }
})


module.exports = router


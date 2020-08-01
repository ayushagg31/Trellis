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
            return res.status(404).send()
        res.send(cards)
    } catch (error) {
        next(error)
    }
})



module.exports = router


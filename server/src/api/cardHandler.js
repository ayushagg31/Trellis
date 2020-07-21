const { Router } = require('express')
const Card = require('../models/card')

const router = Router()


router.get('/', async (req, res, next) => {
    try {
        const cardEntries = await Card.find()
        res.json(cardEntries)
    } catch (error) {
        next(error)
    }
})

router.post('/', async (req, res, next) => {
    try {
        const card = new Card(req.body)
        const respData = await card.save()
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


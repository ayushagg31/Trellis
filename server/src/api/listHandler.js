const { Router } = require('express')
const List = require('../models/list')

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

module.exports = router


/* eslint-disable no-undef */
const request = require('supertest')
const app = require('../src/app')
const sinon = require('sinon')
const List = require('../src/models/list')
const Card = require('../src/models/card')
const mongoose = require('mongoose')
const { listOne, cardOne, listOneId, boardOne,cardOneId, cardTwoId, setupCard } = require('./fixtures/db')


afterEach(() => {
    sinon.restore()
})

describe('POST@/api/cards', () => {
    it('Should create a new card', async () => {
        await List.deleteMany()
        await new List(listOne).save()
        await Card.deleteMany()
        await request(app).post('/api/cards').send(cardOne).expect(200)
    })
    it('Should not create card without any data', async () => {
        await request(app).post('/api/cards').send({}).expect(422)
    })

    it('Should not create card without name', async () => {
        await request(app).post('/api/cards').send({ listId: listOneId }).expect(422)
    })

    it('Should not create card without listId', async () => {
        await request(app).post('/api/cards').send({ name: 'cardTestOne' }).expect(422)
    })

    test('Should not create card with invalid listId', async () => {
        await request(app).post('/api/cards').send({ name: 'cardTestrandom', listId:'nbvnbvnm'}).expect(422)
    })
})

describe('Get@/api/cards', () => {
    it('Should show all cards', async () => {
        const resp = await request(app).get('/api/cards').send().expect(200)
        const cardEntries = await Card.find({})
        expect(JSON.stringify(resp.body)).toEqual(JSON.stringify(cardEntries))
    })
    it('Should show empty card-db', async () => {
        await Card.deleteMany()
        const resp = await request(app).get('/api/cards').send().expect(200)
        const cardEntries = await Card.find({})
        expect(JSON.stringify(resp.body)).toEqual(JSON.stringify(cardEntries))
    })
})


describe('Get@/api/cards/{id}', () => {
    it('Should display card on valid id', async () => {
        await setupCard(cardOne, listOne, boardOne)
        await request(app).get(`/api/cards/${cardOneId}`).send().expect(200)
    })

    it('Shouldn\'t display card on invalid id - 404', async () => {
        await request(app).get(`/api/cards/${cardTwoId}`).send().expect(404)
    })

    it('Should show server error - 500', async () => {
        sinon.stub(mongoose.Model, 'findById').rejects({})
        await request(app).get(`/api/cards/${cardOneId}`).send().expect(500)
    })

})




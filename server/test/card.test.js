/* eslint-disable no-undef */
const request = require('supertest')
const app = require('../src/app')
const sinon = require('sinon')
const Card = require('../src/models/card')
const mongoose = require('mongoose')
const { listOne, listOneId, listTwo,
    boardOne, boardTwo, boardOneId, boardTwoId,
    cardOne, cardTwo, cardOneId, cardTwoId,
    setupCard, setupList, listTwoId } = require('./fixtures/db')

afterEach(() => {
    sinon.restore()
})

describe('POST@/api/cards', () => {
    it('Should create a new card', async () => {
        await setupList(listOne, boardOne)
        await request(app).post('/api/cards').send(cardOne).expect(200)
    })
    it('Should not create card without any data', async () => {
        await request(app).post('/api/cards').send({}).expect(422)
    })

    it('Should not create card without name', async () => {
        await request(app).post('/api/cards').send({ listId: listOneId, boardId: boardOneId, order: 'aba' }).expect(422)
    })

    it('Should not create card without listId', async () => {
        await request(app).post('/api/cards').send({ name: 'cardTestOne', boardId: boardOneId, order: 'aca' }).expect(422)
    })

    it('Should not create card without boardId', async () => {
        await request(app).post('/api/cards').send({ name: 'cardTestOne', listId: listOneId, order: 'aka' }).expect(422)
    })

    it('Should not create card without order', async () => {
        await request(app).post('/api/cards').send({ name: 'cardTestOne', listId: listOneId, boardId: boardOneId }).expect(422)
    })

    it('Should not create card with invalid listId', async () => {
        await request(app).post('/api/cards').send({
            name: 'cardTestrandom',
            listId: 'nbvnbvnm',
            boardId: boardOneId,
            order: 'aba'
        }).expect(422)
    })

    it('Should not create card with invalid boardId', async () => {
        await request(app).post('/api/cards').send({
            name: 'cardTestrandom',
            listId: listOneId,
            boardId: 'nvnnvn',
            order: 'aca'
        }).expect(422)
    })

    it('Should return internal server error when mongoose fails to save', async () => {
        await setupList(listTwo, boardTwo)
        sinon.stub(mongoose.Model.prototype, 'save').rejects({})
        await request(app).post('/api/cards').send(cardTwo).expect(500)
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

    it('Should show server error - 500 internal server error', async () => {
        sinon.stub(mongoose.Model, 'find').rejects({})
        await request(app).get('/api/cards').send().expect(500)
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

const updateCard = {
    name: 'sampleCard',
    listId: listTwoId,
    order: 'zza'
}

describe('PATCH@/api/cards/{id}', () => {
    it('Should update an existing card on all valid fields', async () => {
        await setupCard(cardOne, listOne, boardOne)
        await request(app).patch(`/api/cards/${cardOneId}`).send(updateCard).expect(200)
    })

    it('Should not update, if card doesn\'t exist', async () => {
        await request(app).patch(`/api/cards/${cardTwoId}`).send(updateCard).expect(404)
    })

    it('Should not update card on invalid fields like boardId, _id', async () => {
        await request(app).patch(`/api/cards/${cardTwoId}`).send({ boardId: boardTwoId, _id: cardTwoId }).expect(400)
    })

    it('Should return internal server error when mongoose fails to connect', async () => {
        sinon.stub(mongoose.Model, 'findByIdAndUpdate').rejects({})
        await request(app).patch(`/api/cards/${cardTwoId}`).send(updateCard).expect(500)
    })
})

describe('DELETE@/api/cards/{id}', () => {
    it('Should delete an existing cards', async () => {
        await setupCard(cardOne, listOne, boardOne)
        await request(app).delete(`/api/cards/${cardOneId}`).send().expect(200)
    })

    it('Should show 404 on deleting of non-existant cards', async () => {
        await request(app).delete(`/api/cards/${cardTwoId}`).send().expect(404)
    })

    it('Should return internal server error when mongoose fails to connect', async () => {
        sinon.stub(mongoose.Model, 'findByIdAndDelete').rejects({})
        await setupCard(cardOne, listOne, boardOne)
        await request(app).delete(`/api/cards/${cardOneId}`).send().expect(500)
    })
})

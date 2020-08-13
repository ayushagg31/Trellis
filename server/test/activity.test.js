/* eslint-disable no-undef */
const request = require('supertest')
const sinon = require('sinon')
const app = require('../src/app')
const mongoose = require('mongoose')
const { boardOne, setupBoard, activityOne } = require('./fixtures/db')


afterEach(() => {
    sinon.restore()
})

describe('POST@/api/activities', () => {
    it('Should create a new activity', async () => {
        setupBoard(boardOne)
        await request(app).post('/api/activities').send(activityOne).expect(200)
    })

    it('Should not create activity without text', async () => {
        await request(app).post('/api/activities').send({ boardId: boardOne }).expect(422)
    })

    it('Should not create activity without boardId', async () => {
        await request(app).post('/api/activities').send({ text: 'random text' }).expect(422)
    })

    it('Should not create activity with invalid boardId', async () => {
        await request(app).post('/api/activities').send({ text: 'random text', boardId: 'xxxxx' }).expect(422)
    })

    it('Should return internal server error when mongoose fails to save', async () => {
        sinon.stub(mongoose.Model.prototype, 'save').rejects({})
        await request(app).post('/api/activities').send(activityOne).expect(500)
    })
})

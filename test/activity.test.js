/* eslint-disable no-undef */
const request = require('supertest')
const sinon = require('sinon')
const app = require('../src/app')
const mongoose = require('mongoose')
const Activity = require('../src/models/activity')
const { boardOne, setupBoard, activityOne, activityOneId, setupActivity } = require('./fixtures/db')


afterEach(() => {
    sinon.restore()
})


describe('Get@/api/activities', () => {
    it('Should fetch all the activities', async () => {
        const resp = await request(app).get('/api/activities').send().expect(200)
        const activtiyLog = await Activity.find({})
        expect(JSON.stringify(resp.body)).toEqual(JSON.stringify(activtiyLog))
    })

    it('Should show empty activity-db', async () => {
        await Activity.deleteMany()
        const resp = await request(app).get('/api/activities').send().expect(200)
        const activtiyLog = await Activity.find({})
        expect(JSON.stringify(resp.body)).toEqual(JSON.stringify(activtiyLog))
    })

    it('Should show server error - 500 internal server error', async () => {
        sinon.stub(mongoose.Model, 'find').rejects({})
        await request(app).get('/api/activities').send().expect(500)
    })
})


describe('POST@/api/activities', () => {
    it('Should create a new activity', async () => {
        await setupBoard(boardOne)
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


describe('DELETE@/api/activities/{id}', () => {
    it('Should delete an existing activity', async () => {
        await setupActivity(activityOne, boardOne)
        await request(app).delete(`/api/activities/${activityOneId}`).send().expect(200)
    })

    it('Should show 404 on deleting of non-existant activity', async () => {
        await request(app).delete(`/api/activities/${new mongoose.Types.ObjectId()}`).send().expect(404)
    })

    it('Should return internal server error when mongoose fails to connect', async () => {
        sinon.stub(mongoose.Model, 'findByIdAndDelete').rejects({})
        await setupActivity(activityOne, boardOne)
        await request(app).delete(`/api/activities/${activityOneId}`).send().expect(500)
    })
})

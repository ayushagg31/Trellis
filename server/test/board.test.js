/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const request = require('supertest')
const sinon = require('sinon')
const app = require('../src/app')
const Board = require('../src/models/board')
const List = require('../src/models/list')
const mongoose = require('mongoose')
const { listOne, boardTwo, boardOne, boardOneId, boardTwoId, setupBoard, setupList } = require('./fixtures/db')

afterEach(() => {
    sinon.restore()
})

describe('POST@/api/boards', () => {
    it('Should create a new board', async () => {
        await Board.deleteMany()
        await request(app).post('/api/boards').send(boardTwo).expect(200)
    })

    it('Should not create board without name', async () => {
        await request(app).post('/api/boards').send({}).expect(422)
    })

    it('Should return internal server error when mongoose fails to save', async () => {
        sinon.stub(mongoose.Model, 'create').rejects({})
        await request(app).post('/api/boards').send(boardTwo).expect(500)
    })
})

describe('Get@/api/boards', () => {
    it('Should show add the boards from db', async () => {
        const resp = await request(app).get('/api/boards').send().expect(200)
        const boardEntries = await Board.find({})
        expect(JSON.stringify(resp.body)).toEqual(JSON.stringify(boardEntries))
    })

    it('Should show empty board-db', async () => {
        await Board.deleteMany()
        const resp = await request(app).get('/api/boards').send().expect(200)
        const boardEntries = await Board.find({})
        expect(JSON.stringify(resp.body)).toEqual(JSON.stringify(boardEntries))
    })

    it('Should show server error - 500 internal server error', async () => {
        sinon.stub(mongoose.Model, 'find').rejects({})
        await request(app).get('/api/boards').send().expect(500)
    })
})

describe('Get@/api/boards/{id}', () => {
    it('Should display board on valid id', async () => {
        await setupBoard(boardOne)
        await request(app).get(`/api/boards/${boardOneId}`).send().expect(200)
    })

    it('Shouldn\'t display board on invalid id - 404', async () => {
        await request(app).get(`/api/boards/${boardTwoId}`).send().expect(404)
    })

    it('Should show server error - 500', async () => {
        sinon.stub(mongoose.Model, 'findById').rejects({})
        await request(app).get(`/api/boards/${boardOneId}`).send().expect(500)
    })

})


describe('Get@/api/boards/{id}/lists', () => {
    it('Should display all lists with valid boardId', async () => {
        await setupList(listOne, boardOne)
        await request(app).get(`/api/boards/${boardOneId}/lists`).send().expect(200)
    })

    it('Should show 404 on invalid boardId', async () => {
        await request(app).get(`/api/boards/${boardTwoId}/lists`).send().expect(404)
    })

    it('Should show server error on failure', async () => {
        sinon.stub(mongoose.Model, 'find').rejects({})
        await request(app).get(`/api/boards/${boardOneId}/lists`).send().expect(500)
    })

    it('Should show empty lists', async () => {
        await setupBoard(boardTwo)
        const resp = await request(app).get(`/api/boards/${boardTwoId}/lists`).send()
        expect(resp.body).toHaveLength(0)
    })
})
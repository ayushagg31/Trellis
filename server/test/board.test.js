/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const request = require('supertest')
const app = require('../src/app')
const Board = require('../src/models/board')
const { boardTwo } = require('./fixtures/db')

describe('POST@/api/boards', () => {
    it('Should create a new board', async () => {
        await Board.deleteMany()
        await request(app).post('/api/boards').send(boardTwo).expect(200)
    })
    it('Should not create board without name', async () => {
        await request(app).post('/api/boards').send({}).expect(422)
    })
})

describe('Get@/api/boards', () => {
    it('should show add the boards from db', async () => {
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
})


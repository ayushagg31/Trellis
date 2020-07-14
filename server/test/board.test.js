/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const request = require('supertest')
const app = require('../src/app')
const Board = require('../src/models/board')
const {boardTwo, setupBoard} = require('./fixtures/db')


beforeEach(setupBoard)


test('Should create a new board', async () => {
    await request(app).post('/api/boards').send(boardTwo).expect(200)
})

test('Should show all boards', async () => {
    const resp = await request(app).get('/api/boards').send().expect(200)
    const boardEntries = await Board.find({})
    expect(JSON.stringify(resp.body)).toEqual(JSON.stringify(boardEntries))
    
})


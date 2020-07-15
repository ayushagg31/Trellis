/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const request = require('supertest')
const app = require('../src/app')
const List = require('../src/models/list')
const Board = require('../src/models/board')
const { boardOneId, boardOne, listOne, listTwo } = require('./fixtures/db')


describe('POST@/api/lists', () => {
    it('Should create a new list', async () => {
        await Board.deleteMany()
        await new Board(boardOne).save()
        await List.deleteMany()
        await request(app).post('/api/lists').send(listOne).expect(200)
    })

    it('Should not create list without any data', async () => {
        await request(app).post('/api/lists').send({}).expect(422)
    })

    it('Should not create list without name', async () => {
        await request(app).post('/api/lists').send({ boardId: boardOneId }).expect(422)
    })
    it('Should not create list without boardId', async () => {
        await request(app).post('/api/lists').send({ name: 'listTestOne' }).expect(422)
    })
    it('Should not create list with invalid boardId', async () => {
        await request(app).post('/api/lists').send({ name: 'listTestOne', boardId: 'randomBoardId' }).expect(422)

    })
})

describe('Get@/api/lists', () => {
    it('Should show all lists', async () => {
        const resp = await request(app).get('/api/lists').send().expect(200)
        const listEntries = await List.find({})
        expect(JSON.stringify(resp.body)).toEqual(JSON.stringify(listEntries))
    })
    it('Should show empty list-db', async () => {
        await List.deleteMany()
        const resp = await request(app).get('/api/lists').send().expect(200)
        const listEntries = await List.find({})
        expect(JSON.stringify(resp.body)).toEqual(JSON.stringify(listEntries))
    })
})



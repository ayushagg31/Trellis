/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const request = require('supertest')
const app = require('../src/app')
const List = require('../src/models/list')
const { listTwo, setupList } = require('./fixtures/db')

beforeEach(
    setupList
)

test('Should create a new list', async () => {
    await request(app).post('/api/lists').send(listTwo).expect(200)

})

test('Should show all lists', async () => {
    const resp = await request(app).get('/api/lists').send().expect(200)
    const listEntries = await List.find({})
    expect(JSON.stringify(resp.body)).toEqual(JSON.stringify(listEntries))
})


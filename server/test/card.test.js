/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const request = require('supertest')
const app = require('../src/app')
const Card = require('../src/models/card')
const { cardTwo, setupCard } = require('./fixtures/db')

beforeEach(
    setupCard
)

test('Should create a new card', async () => {
    await request(app).post('/api/cards').send(cardTwo).expect(200)

})

test('Should show all cards', async () => {
    const resp = await request(app).get('/api/cards').send().expect(200)
    const cardEntries = await Card.find({})
    expect(JSON.stringify(resp.body)).toEqual(JSON.stringify(cardEntries))
})


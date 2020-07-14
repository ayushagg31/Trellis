const mongoose = require('mongoose')
const Board = require('../../src/models/board')
const List = require('../../src/models/list')
const Card = require('../../src/models/card')

const boardOneId = new mongoose.Types.ObjectId()
const boardOne = {
    _id: boardOneId,
    name: 'boardOne'
}

const boardTwoId = new mongoose.Types.ObjectId()
const boardTwo = {
    _id: boardTwoId,
    name: 'boardTwo'
}

const listOneId = new mongoose.Types.ObjectId()
const listOne = {
    _id: listOneId,
    name: 'listOne',
    boardId: boardOneId.toString()
}

const listTwoId = new mongoose.Types.ObjectId()
const listTwo = {
    _id: listTwoId,
    name: 'listTwo',
    boardId: boardOneId.toString()
}

const cardOneId = new mongoose.Types.ObjectId()
const cardOne = {
    _id: cardOneId,
    name: 'cardOne',
    listId: listOneId.toString()
}

const cardTwoId = new mongoose.Types.ObjectId()
const cardTwo = {
    _id: cardTwoId,
    name: 'cardTwo',
    listId: listOneId.toString()
}

const setupBoard = async () => {
    await Board.deleteMany()
    await new Board(boardOne).save()
}

const setupList = async () => {
    setupBoard
    await List.deleteMany()
    await new List(listOne).save()
}

const setupCard = async () => {
    setupList
    await Card.deleteMany()
    await new Card(cardOne).save()
}

module.exports = {
    boardOneId,
    boardOne,
    boardTwo,
    setupBoard,
    listOneId,
    listOne,
    listTwo,
    setupList,
    cardOneId,
    cardOne,
    cardTwo,
    setupCard

}
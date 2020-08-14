const mongoose = require('mongoose')
const Board = require('../../src/models/board')
const List = require('../../src/models/list')
const Card = require('../../src/models/card')
const Activity = require('../../src/models/activity')

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
const activityOneId = new mongoose.Types.ObjectId()
const activityOne = {
    _id: activityOneId,
    text: 'random sting',
    boardId: boardOneId
}

const listOneId = new mongoose.Types.ObjectId()
const listOne = {
    _id: listOneId,
    name: 'listOne',
    boardId: boardOneId.toString(),
    order: 'n'
}

const listTwoId = new mongoose.Types.ObjectId()
const listTwo = {
    _id: listTwoId,
    name: 'listTwo',
    boardId: boardTwoId.toString(),
    order: 'xz'
}

const cardOneId = new mongoose.Types.ObjectId()
const cardOne = {
    _id: cardOneId,
    name: 'cardOne',
    listId: listOneId.toString(),
    boardId: boardOneId.toString(),
    order: 'ab'
}

const cardTwoId = new mongoose.Types.ObjectId()
const cardTwo = {
    _id: cardTwoId,
    name: 'cardTwo',
    listId: listTwoId.toString(),
    boardId: boardTwoId.toString(),
    order: 'aban'
}

const setupBoard = async (boardData) => {
    await Board.deleteMany()
    await new Board(boardData).save()
}

const setupList = async (listData, boardData) => {
    await setupBoard(boardData)
    await List.deleteMany()
    await new List(listData).save()
}

const setupCard = async (cardData, listData, boardData) => {
    await setupList(listData, boardData)
    await Card.deleteMany()
    await new Card(cardData).save()
}

const setupActivity = async (activityData, boardData) => {
    await setupBoard(boardData)
    await Activity.deleteMany()
    await new Activity(activityData).save()
}

module.exports = {
    boardOneId,
    boardOne,
    boardTwo,
    boardTwoId,
    setupBoard,
    listOneId,
    listTwoId,
    listOne,
    listTwo,
    setupList,
    cardOneId,
    cardTwoId,
    cardOne,
    cardTwo,
    setupCard,
    activityOne,
    activityOneId,
    setupActivity

}
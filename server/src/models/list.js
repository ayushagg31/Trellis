const mongoose = require('mongoose')
const Board = require('./board')
const { Schema } = mongoose


const listSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    boardId: { 
        type: Schema.Types.ObjectId, 
        ref: Board,
        required: true 
    }
},
{
    timestamps: true
})

const list = mongoose.model('listSchema', listSchema)

module.exports = list

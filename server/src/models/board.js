const mongoose = require('mongoose')
const { Schema } = mongoose

const boardSchema = new Schema({
    name: {
        type: String,
        required: true
    }
},
{
    timestamps: true
})

const board = mongoose.model('boardSchema', boardSchema)


module.exports = board

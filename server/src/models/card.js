const mongoose = require('mongoose')
const List = require('./list')
const { Schema } = mongoose

const cardSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    listId: { 
        type: Schema.Types.ObjectId, 
        ref: List,
        required: true 
    }
},
{
    timestamps: true
})

const card = mongoose.model('cardSchema', cardSchema)

module.exports = card

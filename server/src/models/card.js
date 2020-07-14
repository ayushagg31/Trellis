const mongoose = require('mongoose')
const { Schema } = mongoose

const cardSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    listId: { 
        type: Schema.Types.ObjectId, 
        ref: 'list',
        required: true 
    }
},
{
    timestamps: true
})

module.exports = mongoose.model('card', cardSchema)

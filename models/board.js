const mongoose = require('mongoose')
const { Schema } = mongoose

const boardSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    image: {
        color: {
            type: String,
            required: true
        },
        thumb: {
            type: String,
        },
        full: {
            type: String,
        }
    }
},
{
    timestamps: true
})

module.exports = mongoose.model('board', boardSchema)

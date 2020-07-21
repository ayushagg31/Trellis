const mongoose = require('mongoose')
const { Schema } = mongoose


const listSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    boardId: { 
        type: Schema.Types.ObjectId, 
        ref: 'board',
        required: true 
    }
},
{
    timestamps: true
})

module.exports = mongoose.model('list', listSchema)

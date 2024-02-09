const mongoose = require('mongoose');
const { Schema } = mongoose;

const workSpaceSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    description:{
        type: String,
    },
    members:{
        type: Array,
    },
    ownerId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }
})

const workSpace = mongoose.model('workSpace', workSpaceSchema);
workSpace.createIndexes();
module.exports = workSpace;
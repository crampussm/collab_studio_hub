const mongoose = require('mongoose');
const { Schema } = mongoose;

const taskSchema = new Schema({
    workspceId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    ownerId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    name:{
        type: String,
        required: true,
        unique: true
    },
    description:{
        type: String,
    },
    videoLink:{
        type: String,
        required: true,
    },
    videoEditors:{
        type: Array,
    },
    captionWriters:{
        type: Array,
    },
    thumbnailEditors:{
        type: Array,
    },
    tdtWriters:{
        type: Array,
    },
    videoEditingStatus:{
        type: String,
        default: "pending"
    },
    captionWritingStatus:{
        type: String,
        default: "pending"
    },
    thumbnailEditingStatus:{
        type: String,
        default: "pending"
    },
    tdtWritingStatus:{
        type: String,
        default: "pending"
    }
})

const Task = mongoose.model('Task', taskSchema);
Task.createIndexes();
module.exports = Task;
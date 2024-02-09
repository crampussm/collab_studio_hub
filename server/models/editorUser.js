const mongoose = require('mongoose');
const { Schema } = mongoose;

const editorUserSchema = new Schema({
    firstname:{
        type: String,
        required: true
    },
    lastname:{
        type: String,
        required: true
    },
    username:{
        type: String,
        required: true,
        unique: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    type:{
        type: String,
        default: "editor"
    },
})

const UserEditor = mongoose.model('UserEditor', editorUserSchema);
UserEditor.createIndexes();
module.exports = UserEditor;
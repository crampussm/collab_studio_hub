const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserCreatorSchema = new Schema({
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
        default: "creator"
    },
  });

const UserCreator = mongoose.model('UserCreator', UserCreatorSchema);
UserCreator.createIndexes()
module.exports = UserCreator;
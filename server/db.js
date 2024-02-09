const mongoose = require('mongoose');
const mongoURI = "mongodb://localhost:27017/collabstudiohub";

const connectMongo = ()=>{
    mongoose.connect(mongoURI).then(console.log("Database Connected"))
}

module.exports = connectMongo;
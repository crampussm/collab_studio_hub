const connectMongo = require('./db');
const express = require('express');
var cors = require('cors');

connectMongo();
const app = express();
app.use(cors());
const PORT = 8000;


app.use(express.json());
// Available Routes
app.use('/creator', require("./routes/creator"));
app.use('/editor', require("./routes/editor"));

app.listen(PORT, () => {
  console.log(`Example app listening on PORT ${PORT}`);
})
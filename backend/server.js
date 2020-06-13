const express = require('express');
const app = express();

const PORT = 4000;
const cors = require('cors');

const mongoose = require('mongoose');
const DB = require('./database/DB.js');

app.use(cors());
app.use(express.json());

//MongoDB Connection
mongoose.connect(DB.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(
    ()=> {
        console.log('Database is connected')
    },
    err => {
        console.log('cannot connect to the database' + err)
    }
);


// Express Route
const gamesRouter = require('./routes/game.route');

app.use('/games', gamesRouter);

app.use('/uploads', express.static('uploads'));

//PORT
app.listen(PORT,function () {
    console.log('Server is running on port : ',PORT);
});
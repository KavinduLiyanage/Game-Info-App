const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Game
let gameSchema = new Schema({
    gameName : {
        type : String
    },
    gameDes : {
        type : String
    },
    gamePrice : {
        type : Number
    }
}, {
    collection: 'game'
});

module.exports = mongoose.model('Game',gameSchema);

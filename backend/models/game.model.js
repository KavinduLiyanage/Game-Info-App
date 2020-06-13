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
    },
    images: {
        type: Array,
        default: [],
    },
    gameCategory: {
        type: String,
    },
    gameReleaseDate: {
        type: String,
    }
}, {
    collection: 'game'
});

module.exports = mongoose.model('Game',gameSchema);

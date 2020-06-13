const express = require("express");
const gameRoutes = express.Router();

// Game Model
let Game = require("../models/game.model");

// Defined add new game route
gameRoutes.route('/add').post(function (req,res) {
    let game = new Game(req.body);
    game.save()
        .then(game => {
            res.status(200).json({'game': 'game is added successfully'})
        })
        .catch(err => {
            res.status(400).send("unable to save to database");
        });
});

// Defined get all games data route
gameRoutes.route('/').get(function (req,res) {
    Game.find(function (err, game) {
        if(err)
            console.log(err);
        else
            res.json(game);
    });
});

// Defined get specific game details using id
gameRoutes.route('/edit/:id').get(function (req,res) {
    let id = req.params.id;
    Game.findById(id, function (err, game) {
        res.json(game);
    });
});

// Defined update game details using id
gameRoutes.route('/update/:id').post(function (req, res) {
    Game.findById(req.params.id, function (err, game) {
        if (!game)
            res.status(404).send("game is not found");
        else {
            game.gameName = req.body.gameName;
            game.gameDes = req.body.gameDes;
            game.gamePrice = req.body.gamePrice;

            game.save().then(game => {
                res.json('Update Complete');
            })
                .catch(err => {
                    res.status(400).send("unable to update database");
                });
        }
    });
});

// Defined delete game using id
gameRoutes.route('/delete/:id').get(function (req,res) {
    Game.findOneAndDelete({_id: req.params.id}, function (err, game) {
        if (err)res.json(err);
        else res.json('Successfully removed');
    });
});

module.exports = gameRoutes;
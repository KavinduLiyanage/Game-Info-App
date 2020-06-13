const express = require("express");
const gameRoutes = express.Router();
const multer = require("multer");

// Game Model
let Game = require("../models/game.model");

gameRoutes.route('/').get(function (req,res) {
    Game.find(function (err, game) {
        if(err)
            console.log(err);
        else
            res.json(game);
    });
});

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`);
    },
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        if (ext !== ".jpg" || ext !== ".png") {
            return cb(res.status(400).end("only jpg, png are allowed"), false);
        }
        cb(null, true);
    },
});

const upload = multer({storage: storage}).single("file");

// Defined upload image route
gameRoutes.post("/uploadImage", (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            return res.json({ success: false, err });
        }
        return res.json({
            success: true,
            image: res.req.file.path,
            fileName: res.req.file.filename,
        });
    });
});

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
gameRoutes.route('/getgames').get(function (req,res) {
    Game.find()
        .exec((err, games) => {
        if (err) return res.status(400).json({ success: false, err });
        res.status(200).json({ success: true, games });
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
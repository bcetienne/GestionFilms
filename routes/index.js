var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/videoLibrary', function(err, db) {
    if (err) throw err;
    /* GET home page. */
    router.get('/', function (req, res, next) {
        db.collection('movies').find().toArray(function(err, result) {
            res.render('index', {title: 'Films', movies: result});
        });
    });
});

module.exports = router;

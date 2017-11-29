var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;

/**
 * Compares the values in the inputs retrieved from the input of the values in the database
 * @param title String  Movie title from db
 * @param type  String  Movie type from db
 * @param year  Integer Movie year from db
 * @param director  String  Movie's director from db
 */
function verifyInput(title, type, year, director) {
    var titleValue = req.body.movieTitle;
    var typeValue = req.body.movieType;
    var yearValue = req.body.movieRelease;
    var directorValue = req.body.movieDirector;

    if (titleValue !== title || typeValue !== type || yearValue !== year || directorValue !== director) {
        return true;
    }
}

MongoClient.connect('mongodb://localhost:27017/videoLibrary', function(err, db) {
    if (err) throw err;
    /* GET information's film. */
    router.post('/', function (req, res, next) {
        /**
         | req.body si post
         | req.query si get
         */
            // Retrieves the query sent by the select that has the movie name of the index page.
        var id = req.body.movie;
        // Retrieves information about an id from the movies collection returned by the query
        // and stores it in the docs variable.
        db.collection('movies').findOne({"_id": ObjectId(id)}, function(err, docs) {
            // Displays recovered information in the console
            console.log(docs);
            // Displays the information view with variables,
            // title which is the title of the page and movie which is the variable that will store
            // the values returned by the docs variable.
            // You will have to call the movie variable in the information view to display the content.
            res.render('information', {title: 'Informations sur le film', movie: docs});
        });
    });

    /* Changes */
    router.post('/modify', function (req, res) {
        var id = req.body.movieID;
        var titleValue = req.body.movieTitle;
        var typeValue = req.body.movieType;
        var yearValue = req.body.movieRelease;
        var directorValue = req.body.movieDirector;
        var dataValue = {
            title: titleValue,
            releaseYear: yearValue,
            type: typeValue,
            direcotr: directorValue
        };
        // TODO
        // Checking the equality of inputs
        // example : db.movies.updateOne({title: "Django Unchained"}, {$set:{type: "action"}})
        //if (verifyInput(title, type, year, director) == true){
        db.collection('movies').updateOne({"_id": ObjectId(id)}, {$set:dataValue});
        //}
        res.redirect('/');
    });

    /* Deletions */
    router.post('/delete', function (req, res) {
        var title = req.body.movieTitle;
        db.collection('movies').deleteOne({title: title});
        res.redirect('/');
    });

    /* Add */
    router.post('/add', function (req, res) {
        var titleValue = req.body.movieTitle;
        var yearValue = req.body.movieRelease;
        var typeValue = req.body.movieType;
        var directorValue = req.body.movieDirector;
        var dataValue = {
            "title": titleValue,
            "releaseYear": yearValue,
            "type": typeValue,
            "director": directorValue
        };
        // TODO
        // Checking the equality of inputs
        //if (verifyInput() == true){
        // Query to add to database
        db.collection('movies').insertOne(dataValue);
        //}
        res.redirect('/');
    });
});

module.exports = router;
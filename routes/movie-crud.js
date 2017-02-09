 
var express = require('express');
var router = express.Router();
bodyParser = require('body-parser'), //parses information from POST


//Any requests to this controller must pass through this 'use' function
//Copy and pasted from method-override
router.use(bodyParser.urlencoded({ extended: true }))


var mongoose = require('mongoose');

var movieSchema = mongoose.Schema({
 
  moviTitle: String,
  moviYear: String,
  moviLanguage: String,
  moviGenre: String,
  moviPoster: String,
  moviDirector: String,
  moviActors: String,
  Status: String
 });
var Movie = mongoose.model('Movie', movieSchema, 'movie');

//Movie
router.get('/getMovie', function (req, res) {
    console.log("REACHED GET FUNCTION ON SERVER");
    Movie.find({}, function (err, docs) {
         res.json(docs);
         
    });
});

router.get('/getMovie/:id', function (req, res) {
    console.log("REACHED GET ID FUNCTION ON SERVER");
     Movie.find({_id: req.params.id}, function (err, docs) {
         res.json(docs);
         
    });
});

router.post('/addMovie', function(req, res){
 console.log(req.body);
  
 
  var title = req.body.Title;
  var year = req.body.Year;
  var language = req.body.Language;
  var genre = req.body.Genre;
  var poster = req.body.Poster;
  var director = req.body.Director;
  var actors = req.body.Actors;
  Status: 'false';

  var movie = new Movie({
   
    moviTitle: title,
    moviYear: year,
    moviLanguage: language,
    moviGenre: genre,
    moviPoster: poster,
    moviDirector: director,
    moviActors: actors,
    Status: 'false'
   
  });

  movie.save(function(err, docs){
    if ( err ) throw err;
    console.log(docs);
    res.json(docs);
  });


  });

router.delete('/deleteMovie/:id', function(req, res){
   console.log("REACHED Delete FUNCTION ON SERVER");
      Movie.remove({_id:req.params.id}, function(err, docs){
        res.json(docs);
    });
});

router.put('/updatemovie/:moviTitle/:val',function(req,res){
  Movie.findOneAndUpdate({moviTitle: req.params.moviTitle},{$set:{Status: req.params.val}},function(err,docs){
console.log(docs);
  });

});

/*router.put('/updateMovie/:moviTitle/:val', function(req, res){
   Movie.findOneAndUpdate({moviTitle:req.params.Title},
    {$set:{Status: req.params.val}},
     function (err, data) {
      console.log(data);
      res.json(data);
    });
})*/

/* rating code  */

var ratingSchema = mongoose.Schema({
  moviename: String,
  ratingvalue: Number
});

var Rating = mongoose.model('Rating', ratingSchema, 'rating');

router.post('/ratinginsert/:m/:r', function(req, res){
 //console.log(req.body);
  
 
  var moviename = req.params.m;
  var ratingvalue = req.params.r;
  

  var rating = new Rating({
   
    moviename: moviename,
    ratingvalue: ratingvalue
    
  });

rating.save(function(err,docs){

});
});

router.get('/ratingDisplay', function(req,res){
  rating.aggregate([{$group : {_id : '$moviename', AverageRating : {$avg : '$ratingvalue'}}}], function(err,docs){
    res.json(docs);
  });
});


// catch 404 and forward to error handler
router.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

module.exports = router;




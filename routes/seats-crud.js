
var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
bodyParser = require('body-parser'); 
router.use(bodyParser.urlencoded({ extended: true }));




var seatsSchema = mongoose.Schema({
 
  moviTitle: String,
  theatre: String,
  city: String,
  showdate: String,
  seat_no: [],
  quantity: String,
  amount: String,
  e_mail: String,
  phone_no: String,
  bookdate: Date 
  
 });
var Seats = mongoose.model('Booking', seatsSchema, 'Booking');


router.post('/newTicket/:t/:c/:t1/:s/:sn/:sq/:a/:e/:p/:dt', function(req, res){

  
var booking = new Seats({
   
    moviTitle: req.params.t,//title,
    theatre: req.params.c,//theatre,
    city: req.params.t1,//city,
    showdate:req.params.s, //showdate,
    seat_no:JSON.parse(req.params.sn), //seat_no,
    quantity:req.params.sq, //quantity,
    amount:req.params.a, //amount,
    e_mail: req.params.e,//e_mail,
    phone_no: req.params.p ,//phone_no,
    bookdate:req.params.dt//bookdate
   
  });
alert(e_mail+"  "+phone_no);
 booking.save(function(err, docs){
    if ( err ) throw err;
    console.log(docs);
    res.json(docs);
  });


  });

router.get('/bookedseats/:t/:th/:s', function (req, res) {
    console.log("REACHED GET FUNCTION ON SERVER");
    Seats.find({moviTitle:req.params.t,theatre:req.params.th,showdate:req.params.s}, function (err, docs) {
         res.json(docs);
         
    });
});

router.get('/selectTickets/:t/:e', function (req, res) {
    console.log("REACHED GET ID FUNCTION ON SERVER");
     Seats.find({moviTitle:req.params.t,e_mail:req.params.e}, function (err, docs) {
         res.json(docs);
         
    });
});

router.delete('/deleteTicket/:id', function(req, res){
   console.log("REACHED Delete FUNCTION ON SERVER");
      Seats.remove({_id:req.params.id}, function(err, docs){
        res.json(docs);
    });
})




module.exports = router;




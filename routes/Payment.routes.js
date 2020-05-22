var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');
//var VerifyToken = require('./VerifyToken');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
var Payment = require('./../models/PaymentModel');

router.post('/create', function(req, res) {

        let request = req.body;
        let Customer_id = req.body.Customer_id;

        Payment.create({
          Mechanic_Name: req.body.Mechanic_Name,
          Garage_Name: req.body.Garage_Name,
          Customer_id: req.body.Customer_id,
          Payment_type: req.body.Payment_type,
          Payment_amount: req.body.payment_amount,
          Date_of_payment: req.body.Date_of_payments,
          Pay_by_email_id: req.body.Pay_by_email_id,
          Pay_by_name: req.body.Pay_by_name,
          Pay_by_Image: req.body.Pay_by_Image,
          Booking_id: req.body.Booking_id,
        }, 

       async function (err, data) {
          if (err) return res.status(500).send("There was a problem inserting the data.");
          console.log(err)
          res.json({Status:"Success",Message:"Payment Details Inserted successfully", Data : {},Code:200});
        });

});

router.post('/getlist', function (req, res) {
        Payment.find({Pay_by_email_id:req.body.Pay_by_email_id}, function (err, Payment_Details) {
          res.json({Status:"Success",Message:"Payment Details", Data : Payment_Details ,Code:200});
        });
});
// // DELETES A USER FROM THE DATABASE
router.post('/delete/', function (req, res) {
      Payment.findByIdAndRemove(req.body.Payment_id, function (err, user) {
          if (err) return res.status(500).send("There was a problem deleting details.");
          res.success(200, "Data Deleted Successfully");
      });
});

module.exports = router;
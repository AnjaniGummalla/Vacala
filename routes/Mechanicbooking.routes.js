var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
var MechanicbookingModel = require('./../models/MechanicbookingModel');


router.post('/create', async function(req, res) {
  try{
     await MechanicbookingModel.create({
           Customer_Name : req.body.Customer_Name,
           Customer_Phone : req.body.Customer_Phone,
           Customer_Address : req.body.Customer_Address,
           Customer_Email : req.body.Customer_Email,
           Vehicle_Type : req.body.Vehicle_Type,
           Services : req.body.Services,
           Pickup_Date : req.body.Pickup_Date,
           Pickup_Time : req.body.Pickup_Time,
           Delivery_Time : req.body.Delivery_Time,
           Delivery_Date : req.body.Delivery_Date,
           Vehicle_Type: req.body.Vehicle_Type,
           Vehicle_No: req.body.Vehicle_No,
           Lubricant_type:req.body.Lubricant_type,
           Mechanic_Name:req.body.Mechanic_Name,
           Mechanic_Phone:req.body.Mechanic_Phone,
           Pick_up:req.body.Pick_up,
           Payment:req.body.Payment
        }, 
        function (err, user) {
          console.log(user)
        res.json({Status:"Success",Message:"Added successfully", Data :user ,Code:200}); 
    });      
}
catch(e){
      res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
}
});


router.get('/getlist', function (req, res) {
  
        MechanicbookingModel.find({}, function (err, Servicebookingdetails) {
          res.json({Status:"Success",Message:"Servicebookingdetails", Data : Servicebookingdetails ,Code:200});
        });
});


router.post('/edit', function (req, res) {
        MechanicbookingModel.findByIdAndUpdate(req.body.Servicebooking_id, req.body, {new: true}, function (err, UpdatedDetails) {
            if (err) returnres.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
             res.json({Status:"Success",Message:"Servicebookingdetails Updated", Data : UpdatedDetails ,Code:200});
        });
});
// // DELETES A USER FROM THE DATABASE
router.post('/delete', function (req, res) {
      MechanicbookingModel.findByIdAndRemove(req.body.Servicebooking_id, function (err, user) {
          if (err) return res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
          res.json({Status:"Success",Message:"Servicebooking Deleted successfully", Data : {} ,Code:200});
      });
});
module.exports = router;
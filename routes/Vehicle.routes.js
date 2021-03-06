var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
var VehicleModel = require('./../models/VehicleModel');


router.post('/create', async function(req, res) {
  try{
     await VehicleModel.create({
           Customer_id : req.body.Customer_id,
           Vehiclepickup_Status:req.body.Vehiclepickup_Status,
           Vehicledelivery_Status:req.body.Vehicledelivery_Status,
           Vehicleservice_Status: req.body.Vehicleservice_Status,
           Vehicle_Image : req.body.Vehicle_Image,
           Vehicle_Name : req.body.Vehicle_Name,
           Vehicle_Type : req.body.Vehicle_Type,
           Vehicle_No : req.body.Vehicle_No,
           Vehicle_Brand : req.body.Vehicle_Brand,
           Vehicle_Model : req.body.Vehicle_Model,
           Lubricant_Used : req.body.Lubricant_Used,
           Year_of_Purchase : req.body.Year_of_Purchase,
           Kilometer_Travelled : req.body.Kilometer_Travelled,
           Vehicle_Unique_Number : req.body.Vehicle_Unique_Number,
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

router.post('/status', function (req, res) {
        VehicleModel.findByIdAndUpdate(req.body.Vehicle_id,req.body, {new: true} ,function (err, Servicebookingdetails) {
          res.json({Status:"Success",Message:"Servicebookingdetails", Data : Servicebookingdetails ,Code:200});
        });
});

router.get('/getlist', function (req, res) {
  
        VehicleModel.find({}, function (err, Vehicledetails) {
          res.json({Status:"Success",Message:"Vehicledetails", Data : Vehicledetails ,Code:200});
        });
});

router.post('/cvehiclelist', function (req, res) {
  
        VehicleModel.find({Customer_id:req.body.Customer_id}, function (err, Vehicledetails) {
          res.json({Status:"Success",Message:"Vehicledetails", Data : Vehicledetails ,Code:200});
        });
});

router.post('/edit', function (req, res) {
        VehicleModel.findByIdAndUpdate(req.body.Vehicle_id, req.body, {new: true}, function (err, UpdatedDetails) {
            if (err) return res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
             res.json({Status:"Success",Message:"Vehicledetails Updated", Data : UpdatedDetails ,Code:200});
        });
});
// // DELETES A USER FROM THE DATABASE
router.post('/delete', function (req, res) {
      VehicleModel.findByIdAndRemove(req.body.Vehicle_id, function (err, user) {
          if (err) return res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
          res.json({Status:"Success",Message:"Vehicle Deleted successfully", Data : {} ,Code:200});
      });
});
module.exports = router;
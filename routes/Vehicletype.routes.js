var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
var VehicleModel = require('./../models/VehicleModel');


router.post('/create', async function(req, res) {
  try{
     await VehicleModel.create({
          Vehicle_Type : req.body.Vehicle_Type,
          Vehicle_Image : req.body.Vehicle_Image,
          Vehicle_Name : req.body.Vehicle_Name,
          Vehicle_Brand: req.body.Vehicle_Brand, 
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
  
        VehicleModel.find({}, function (err, Vehicledetails) {
          res.json({Status:"Success",Message:"Vehicledetails", Data : Vehicledetails ,Code:200});
        });
});


router.post('/edit', function (req, res) {
        VehicleModel.findByIdAndUpdate(req.body.Vehicle_id, req.body, {new: true}, function (err, UpdatedDetails) {
            if (err) returnres.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
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
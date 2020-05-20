var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
var MechanicModel = require('./../models/MechanicModel');
var DriverModel = require('./../models/DriverModel');

router.post('/create', async function(req, res) {

  try{
    var Mechanicexistance = await MechanicModel.findOne({Primary_Contact:req.body.Primary_Contact});
    var Driverexistance = await DriverModel.findOne({Primary_Contact:req.body.Primary_Contact});
    console.log(Mechanicexistance)
  if (Mechanicexistance!== null) {
    res.json({Status:"Failed",Message:"Phone number already registered", Data :{},Code:300});
  }
  else if(Driverexistance!== null){
     res.json({Status:"Failed",Message:"Phone number already registered", Data :{},Code:300});
  }
  else{
      await MechanicModel.create({
          Name: req.body.Name,
          Gender:req.body.Gender,
          Email: req.body.Email,
          Password: req.body.Password,
          DOB: req.body.DOB,
          Primary_Contact : req.body.Primary_Contact,
          Secondary_Contact : req.body.Secondary_Contact,
          Residence_Address : req.body.Residence_Address,
          Permanent_Address : req.body.Permanent_Address,
          Address_Proof : req.body.Address_Proof,
          Adhaar_Card : req.body.Adhaar_Card,
          Voter_ID : req.body.Voter_ID,
          Original_Driving_License : req.body.Original_Driving_License,
          DL_No : req.body.DL_No,
          Valid_Upto : req.body.Valid_Upto,
          Nominee_Name : req.body.Nominee_Name,
          Nominee_Address : req.body.Nominee_Address,
          Nominee_Contact : req.body.Nominee_Contact,
          Reference_Name : req.body.Reference_Name,
          Reference_Address : req.body.Reference_Address,
          Reference_Contact: req.body.Reference_Contact,
          Education_Qualification: req.body.Education_Qualification,
          Last_employer_name: req.body.Last_employer_name,
          Technician_Level: req.body.Technician_Level,
          Service_Category: req.body.Service_Category,
          Brand_expertise: req.body.Brand_expertise,
          Tools_Available: req.body.Tools_Available,
          Bike: req.body.Bike,
          Scanning_device: req.body.Scanning_device,
          Car_models_Known_to_service: req.body.Car_models_Known_to_service,
        },
        function (err, user) {
          console.log(user)
          res.json({Status:"Success",Message:"Added successfully", Data : user ,Code:200}); 
        });
  }        
}
catch(e){
      res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
}
});

router.post('/login',  async function(req, res) {
      try{
    console.log("request...",req.body)
    var Datacheck = await MechanicModel.findOne({Email:req.body.Email,Password:req.body.Password});
    console.log(Datacheck);
    if(Datacheck == null){
     res.json({Status:"Failed",Message:"Invalid User Account", Data : {},Code:300});
    }else
    {
      res.json({Status:"Success",Message:"Login Successful", Data : Datacheck ,Code:200});
    }  
 }
   catch(e){
       res.json({Status:"Failed",Message:"Internal server issue", Data :{},Code:500});
     }    
  });

router.get('/getlist', function (req, res) {
  
        MechanicModel.find({}, function (err, Mechanicdetails) {
          res.json({Status:"Success",Message:"Mechanicdetails", Data : Mechanicdetails ,Code:200});
        });
});


router.post('/edit', function (req, res) {
        MechanicModel.findByIdAndUpdate(req.body.Mechanic_id, req.body, {new: true}, function (err, UpdatedDetails) {
            if (err) returnres.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
             res.json({Status:"Success",Message:"Mechanicdetails Updated", Data : UpdatedDetails ,Code:200});
        });
});
// // DELETES A USER FROM THE DATABASE
router.post('/delete', function (req, res) {
      MechanicModel.findByIdAndRemove(req.body.Mechanic_id, function (err, user) {
          if (err) return res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
          res.json({Status:"Success",Message:"Mechanic Deleted successfully", Data : {} ,Code:200});
      });
});
module.exports = router;
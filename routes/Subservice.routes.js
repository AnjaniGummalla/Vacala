var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
var SubserviceModel = require('./../models/SubserviceModel');

router.post('/create', async function(req, res) {
  try{
     await SubserviceModel.create({
          Subservice_Name : req.body.Subservice_Name,
          Service_id: req.body.Service_id,
          Desc : req.body.Desc,
          SubDesc: req.body.SubDesc,
          Time_Taken: req.body.Time_Taken,
          Service_Cost: req.body.Service_Cost,
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
  
        SubserviceModel.find({}, function (err, Subservicedetails) {
          res.json({Status:"Success",Message:"Subservicedetails", Data : Subservicedetails ,Code:200});
        });
});

router.post('/subservicelist', function (req, res) {
  
        SubserviceModel.find({Service_id:req.body.Service_id}, function (err, Servicedetails) {
          res.json({Status:"Success",Message:"Servicedetails with subservices", Data : Servicedetails ,Code:200});
        });
});

router.post('/edit', function (req, res) {
        SubserviceModel.findByIdAndUpdate(req.body.Subservice_id, req.body, {new: true}, function (err, UpdatedDetails) {
            if (err) returnres.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
             res.json({Status:"Success",Message:"Subservicedetails Updated", Data : UpdatedDetails ,Code:200});
        });
});
// // DELETES A USER FROM THE DATABASE
router.post('/delete', function (req, res) {
      SubserviceModel.findByIdAndRemove(req.body.Subservice_id, function (err, user) {
          if (err) return res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
          res.json({Status:"Success",Message:"Subservice Deleted successfully", Data : {} ,Code:200});
      });
});
module.exports = router;
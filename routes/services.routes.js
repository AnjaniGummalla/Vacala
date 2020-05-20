var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
var ServiceModel = require('./../models/ServiceModel');


router.post('/create', async function(req, res) {
  try{
     await ServiceModel.create({
          Service_Name : req.body.Service_Name,
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
  
        ServiceModel.find({}, function (err, Servicedetails) {
          res.json({Status:"Success",Message:"Servicedetails", Data : Servicedetails ,Code:200});
        });
});



router.post('/edit', function (req, res) {
        ServiceModel.findByIdAndUpdate(req.body.Service_id, req.body, {new: true}, function (err, UpdatedDetails) {
            if (err) returnres.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
             res.json({Status:"Success",Message:"Servicedetails Updated", Data : UpdatedDetails ,Code:200});
        });
});
// // DELETES A USER FROM THE DATABASE
router.post('/delete', function (req, res) {
      ServiceModel.findByIdAndRemove(req.body.Service_id, function (err, user) {
          if (err) return res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
          res.json({Status:"Success",Message:"Service Deleted successfully", Data : {} ,Code:200});
      });
});
module.exports = router;
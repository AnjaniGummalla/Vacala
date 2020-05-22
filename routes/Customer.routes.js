var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
var CustomerModel = require('./../models/CustomerModel');


router.post('/create', async function(req, res) {
  try{
    var customercheck = await CustomerModel.findOne({Email:req.body.Email})
    if(customercheck!== null)
    {
      res.json({Status:"Failed",Message:"Email Id Already exists", Data : {} ,Code:300}); 
    }
    else
    {
     await CustomerModel.create({
           Name : req.body.Name,
           Gender : req.body.Gender,
           DOB : req.body.DOB,
           Email:req.body.Email,
           Type:req.body.Type,
           Password:req.body.Password,
           Address : req.body.Address,
           Phone : req.body.Phone,
           Profile_Pic : req.body.Profile_Pic
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

router.get('/getlist', function (req, res) {
  
        CustomerModel.find({}, function (err, Customerdetails) {
          res.json({Status:"Success",Message:"Customerdetails", Data : Customerdetails ,Code:200});
        });
});


router.post('/edit', function (req, res) {
        CustomerModel.findByIdAndUpdate(req.body.Customer_id, req.body, {new: true}, function (err, UpdatedDetails) {
            if (err) returnres.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
             res.json({Status:"Success",Message:"Customerdetails Updated", Data : UpdatedDetails ,Code:200});
        });
});
// // DELETES A USER FROM THE DATABASE
router.post('/delete', function (req, res) {
      CustomerModel.findByIdAndRemove(req.body.Customer_id, function (err, user) {
          if (err) return res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
          res.json({Status:"Success",Message:"Customer Deleted successfully", Data : {} ,Code:200});
      });
});
module.exports = router;
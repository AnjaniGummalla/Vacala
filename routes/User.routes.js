var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var ForgotMailer = require('./../helpers/email.helper');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
var UserModel = require('./../models/UserModel');
var CustomerModel = require('./../models/CustomerModel');
var DriverModel = require('./../models/DriverModel');
router.post('/register', async function(req, res) {
  try{
     var UserModelCheck = await UserModel.findOne({Email:req.body.Email});
     var CustomerModelCheck = await CustomerModel.findOne({Email:req.body.Email});
     if(UserModelCheck != null || CustomerModelCheck!= null){
           res.json({Status:"Failed",Message:"Email id already exists", Data : {},Code:300}); 
        }
        else{
          UserModel.create({
          Name : req.body.Name,
          Email : req.body.Email,
          Phone : req.body.Phone,
          Type: req.body.Type,
          Password:req.body.Password,
        },
async  function (err, user) {
           if (err) return res.json({Status:"Failed",Message:"There was a problem in registering. Try again", Data : user,Code:300});
    else{
       if(req.body.Type == 0){
        res.json({Status:"Success",Message:"Registration Done successfully", Data : user ,Code:200});
       }
       else if(req.body.Type == 1)
       {
        let fields ={
           Name : req.body.Name || "",
           Gender : req.body.Gender || "",
           Email:req.body.Email || "",
           Type:req.body.Type || "",
           Password:req.body.Password || "",
           Address : req.body.Address || "",
           Phone : req.body.Phone || "",
           Profile_Pic : req.body.Profile_Pic || "",
        }
        var CustomerData = await CustomerModel.create(fields);
        res.json({Status:"Success",Message:"Registration Done successfully", Data : CustomerData ,Code:200});
       }
       else{
        let driverfields ={
           Name : req.body.Name || "",
           Gender : req.body.Gender || "",
           Email:req.body.Email || "",
           Type:req.body.Type || "",
           Password:req.body.Password || "",
           Address : req.body.Address || "",
           Primary_Contact : req.body.Primary_Contact || "",
           Profile_Pic : req.body.Profile_Pic || "",
        }
        var CustomerData = await DriverModel.create(fields);
        res.json({Status:"Success",Message:"Registration Done successfully", Data : CustomerData ,Code:200});
       }
        } 
     });
    }  
  }
  catch(e){
     res.json({Status:"Failed",Message:"Internal Server Error", Data :{},Code:500});
   }    
});

router.post('/login',  async function(req, res) {
      try{
    console.log("request...",req.body)
    var Datacheck = await UserModel.findOne({Email:req.body.Email,Password:req.body.Password});
    console.log(Datacheck);
    if(Datacheck == null){
     res.json({Status:"Failed",Message:"Invalid User Account", Data : {},Code:300});
    }else
    {
      res.json({Status:"Success",Message:"Login Successful", Data : Datacheck,Code:200});
    }  
 }
   catch(e){
       res.json({Status:"Failed",Message:"Internal server issue", Data :{},Code:500});
     }    
  });

router.post('/customerlogin',  async function(req, res) {
      try{
    var Datacheck = await CustomerModel.findOne({Email:req.body.Email,Password:req.body.Password});
    console.log(Datacheck);
    if(Datacheck == null){
     res.json({Status:"Failed",Message:"Invalid User Account", Data : {},Code:300});
    }else
    {
      res.json({Status:"Success",Message:"Login Successful", Data : Datacheck,Code:200});
    }  
 }
   catch(e){
       res.json({Status:"Failed",Message:"Internal server issue", Data :{},Code:500});
     }    
  });

router.post('/forgotpassword', async function(req, res) {
      UserModel.findOne({ Email: req.body.Email }, async function (err, user) {
        if (err) return res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
        if (!user){
         res.json({Status:"Failed",Message:"Invalid Email Id. Enter registered Email id", Data : {},Code:300});
        } 
        else{
        data={
          password: user.Password,
        };
        let mail = await ForgotMailer.sendEmail(req.body.Email, "Password for VACALA","addUser", data);
        res.json({Status:"Success",Message:"Password has been sent to your registered Email Id", Data :{} ,Code:200});
        } 
      });
});
router.get('/getlist', function (req, res) {
        UserModel.find({}, function (err, users) {
            if (err) return res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500}); 
             res.json({Status:"Success",Message:"Userdetail list", Data : users ,Code:200});     
        });
});

router.post('/delete', function (req, res) {
      UserModel.findByIdAndRemove(req.body.user_id, function (err, user) {
          if (err) return res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
          res.json({Status:"Success",Message:"Admin User Deleted successfully", Data : {} ,Code:200});
      });
});

module.exports = router;
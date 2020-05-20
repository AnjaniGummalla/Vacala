var mongoose = require('mongoose');

const Schema = mongoose.Schema;

var CustomerSchema = new mongoose.Schema({   
  
  Name: String,

  Gender:String,

  Email: String,

  Password: String,

  DOB: Date,
  
  Address: String,

  Phone: Number,

  Profile_Pic: String,

  Vehicle_Type : String,

  Services: String,

  Subservice: Array,

  Pickup_required: String,

  Service_Date: String,

  Service_Time: String,

  Payment : String,

  Vehicle_Image: String,

  Vehicle_No: String,

});
mongoose.model('Customer', CustomerSchema);

module.exports = mongoose.model('Customer');
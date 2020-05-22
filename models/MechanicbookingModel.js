var mongoose = require('mongoose');

const Schema = mongoose.Schema;

var ServicebookingSchema = new mongoose.Schema({   
  
  Customer_Name: String,

  Customer_id: String,

  Customer_Phone: Number,

  Customer_Address: String,

  Customer_Email: String,

  Vehicle_Type : String,

  Services: Array,

  Subserivces: Array,

  Pickup_Date: Date,

  Pickup_Time: String,

  Delivery_Time: String,

  Delivery_Date:Date,

  Mechanic_Name : String,

  Mechanic_Phone: Number,

  Vehicle_Image: String,

  Vehicle_No: String,

  Pick_up: String,

  Lubricant_type:String,

  Payment: String,

  Vehiclepickup_Status: String,

  Vehicledelivery_Status :String,

  Vehicleservice_Status :String,

});
mongoose.model('Servicebooking', ServicebookingSchema);

module.exports = mongoose.model('Servicebooking');
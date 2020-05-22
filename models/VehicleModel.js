var mongoose = require('mongoose');

const Schema = mongoose.Schema;

var VehicleSchema = new mongoose.Schema({   
  
  Vehicle_Image: String,

  Vehicle_Name: String,

  Vehicle_Brand: String,

  Vehicle_Type : String,

  Vehicle_No: String,

  Vehicle_Model: String,

  Lubricant_Used: String,

  Year_of_Purchase: String,

  Kilometer_Travelled: String,

  Vehicle_Unique_Number: String,

  Customer_id :String,

  Vehiclepickup_Status: String,

  Vehicledelivery_Status :String,

  Vehicleservice_Status :String,
});
mongoose.model('Vehicle', VehicleSchema);

module.exports = mongoose.model('Vehicle');
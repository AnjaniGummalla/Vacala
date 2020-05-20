var mongoose = require('mongoose');

const Schema = mongoose.Schema;

var VehicleSchema = new mongoose.Schema({   
  
  Vehicle_Type: String,

  Vehicle_Image:String,

  Vehicle_Name: String,
  
  Vehicle_Brand:  String,

});
mongoose.model('Vehicle', VehicleSchema);

module.exports = mongoose.model('Vehicle');
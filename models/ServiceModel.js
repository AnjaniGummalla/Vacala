var mongoose = require('mongoose');

const Schema = mongoose.Schema;

var ServiceSchema = new mongoose.Schema({   
  
  Service_Name: String,

});
mongoose.model('Service', ServiceSchema);

module.exports = mongoose.model('Service');
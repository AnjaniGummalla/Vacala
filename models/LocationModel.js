var mongoose = require('mongoose');

const Schema = mongoose.Schema;

var LocationSchema = new mongoose.Schema({   
  
  Name: String,

});
mongoose.model('Location', LocationSchema);

module.exports = mongoose.model('Location');
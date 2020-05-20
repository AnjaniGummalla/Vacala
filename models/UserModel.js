var mongoose = require('mongoose');

const Schema = mongoose.Schema;

var UserSchema = new mongoose.Schema({   
  
  Name: String,

  Email:String,

  Password: String,
  
  Type:  Number,

  Phone: Number,

  Profile_Pic: String,

  Designation : String,

});
mongoose.model('User', UserSchema);

module.exports = mongoose.model('User');
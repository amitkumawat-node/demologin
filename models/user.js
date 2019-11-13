var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
   email:{type:String,unique: true},
   password:String,
   name:String, 
   userType: { 
     type: String, 
     enum: ['SuperAdmin', 'Admin'] 
  } 
},
	{timestamps:true}
);
module.exports = mongoose.model('user', userSchema);

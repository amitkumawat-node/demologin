var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
   email:{type:String,unique: true},
   password:String,
   name:String
},
	{timestamps:true}
);
module.exports = mongoose.model('user', userSchema);
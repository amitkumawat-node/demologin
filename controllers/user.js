var User = require('../models/user');


const UserController = {

	find: function(criteria, callback_app){
    	User.find(criteria).exec(function(err, user){
    		if(err){
    			callback_app(err, null)
    		}else{
    			callback_app(null, user)
    		}
    	});
	},
	findOne: function(criteria, callback_app){
        User.find(criteria).limit(1).exec(function(err, user){
            if(err){
                callback_app(err, null)
            }else{
                callback_app(null, user)
            }
        });
    },
	create: function(data, callback){
    	new User(data).save(callback);
	},

	update: function(criteria, dataToSet, options, callback){
    	User.findOneAndUpdate(criteria, dataToSet, options, callback);
	},

	destroy:function(id, callback){
		 User.deleteOne({_id:id}, function(err, data){
            if(err){
                callback(err, null)
                return;
            }else{
                var response =  "User has been successfully removed !";
                callback(null, response)
            }
        })
	}
}
module.exports =UserController;
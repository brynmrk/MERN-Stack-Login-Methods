var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

// User Schema
var UserSchema = mongoose.Schema({
	username: {
		type: String,
	},
	password: {
		type: String
	},
	email: {
		type: String
	},
	name: {
		type: String
	},
  facebook: {
    id           : String,
    token        : String,
    email        : String,
    name         : String
  },
  google:{
	id           : String,
    token        : String,
    email        : String,
	name         : String,
	image        : String
  }
});

var User = module.exports = mongoose.model('User', UserSchema);

// Creating entry for a new user
module.exports.createUser = function(newUser, callback){
	bcrypt.genSalt(10, function(err, salt) {
	    bcrypt.hash(newUser.password, salt, function(err, hash) {
	        newUser.password = hash;
	        newUser.save(callback);
	    });
	});
}

module.exports.getUserByUsername = function(username, callback){
	var query = {name: username};
	User.findOne(query, callback);
}

module.exports.getUserById = function(id, callback){
	User.findById(id, callback);
}

module.exports.comparePassword = function(candidatePassword, hash, callback){
	bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
    	if(err) throw err;
    	callback(null, isMatch);
	});
}

var express = require('express');
var router = express.Router();
var User = require('../models/user');
var jwt = require('jsonwebtoken'); 
var secret = 'joonpark';

// USER LOGIN ROUTE
// http://localhost:5000/api/authenticate
router.post('/', function(req,res) {
	User.findOne({ username: req.body.username }).select('email username password').exec(function(err, user) {
		if(err) throw err;
		if(!user) {
			res.json({ success: false, message: 'No username found!' });
		} else if (user) {			
			if(req.body.password) {
				var validPassword = user.comparePassword(req.body.password);
			} else {
				res.json({ success: false, message: 'Please fill in the password field.'});
			}
			if(!validPassword) {
				res.json({ success: false, message: 'Password does not match with username!' });
			} else {
				var token = jwt.sign({ username: user.username, email: user.email }, secret, {expiresIn: '24h'} );
				res.json({ success: true, message: 'User authenticated!', token: token });
			}
		}
	}); 
});

module.exports = router;
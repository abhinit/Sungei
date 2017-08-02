var express = require('express');
var router = express.Router();
var User = require('../models/user');

// USER REGISTRATION ROUTE
// http://localhost:5000/api/users
router.post('/', function(req,res) {
	var user = new User();
	user.name = req.body.name;
	user.email = req.body.email;
	user.username = req.body.username;
	user.password = req.body.password;

	if( req.body.name == null || req.body.name == '' ||
		req.body.email == null || req.body.email == '' ||
		req.body.username == null || req.body.username == '' ||
		req.body.password == null || req.body.password == '' ) {
			res.json({ success: false, message: "Ensure every field is filled!" }); 
	} else {
		user.save(function(err) {
			if(err) {
				res.json({ success: false, message: "Username or Email already exists!" }); 
			} else {
				res.json({ success: true, message: "User created!"});
			}
		});
	}
});

module.exports = router;

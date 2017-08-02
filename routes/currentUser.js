var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken'); 
var secret = 'joonpark';

router.use(function(req,res,next) {

	var token = req.body.token || req.body.query || req.headers['x-access-token'];

	if(token) {
		//verify token
		jwt.verify(token, secret, function(err, decoded) {
			if(err) {
				res.json({ success: false, message: 'Token invalid' });
			} else {
				req.decoded = decoded;
				next();
			}
		});
	} else {
		res.json({ success: false, message: 'No token provided' });
	}

});

router.post('/', function(req,res) {
	res.send(req.decoded);
});

module.exports = router;
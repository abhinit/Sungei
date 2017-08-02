var express = require('express');
var router = express.Router();
var controller = require('../controllers/cart');
var User = require('../models/user');
var Order = require('../models/order')


router.post('/', function(req,res) {
	var order = new Order();
	order.name = //;
	order.cart = //;

	if( //Cart is empty ) {
			res.json({ success: false, message: "The cart is empty!" }); 
	} else {
		order.save( function(err) {
			if(err) {
				res.json({ success: false, message: "Something went wrong. Try again." }); 
			} else {
				res.json({ success: true, message: "Order successful."});
			}
		});
	}

});

module.exports = router;

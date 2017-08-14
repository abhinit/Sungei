var express = require('express');
var router = express.Router();
var Order = require('../models/order');
var uuid = require('node-uuid');

router.post('/', function(req,res) {

	var currentUser = req.body.username;
	var products = req.body.products;
	var items = [];
	var productArr = JSON.parse(JSON.stringify(products));

	console.log("product array: ",productArr);
	console.log("current user: ",currentUser);

	productArr.forEach(function(result){
		// Need to resolve nested array issue. Not a big deal tho.
		items.push(result);
	});
	
	var orders = new Order({
		username: currentUser, // find current username
		orderNumber: uuid.v4(), // generate random order number
		items: items
	});

	orders.save(function(err, result) {
		console.log("result: ",result);
		if(err) {
			console.log(err);
			res.json({ success: false, message: "Something went wrong. Try again" }); 
		} else {
			res.json({ success: true, message: "Order successful"});
		}
	});


});

module.exports = router;

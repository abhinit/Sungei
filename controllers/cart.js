var requestJson = require("request-json");
var mongoose = require('mongoose')
var Product = mongoose.model('Product');

exports.view = function(req, res) {
    var totalPrice = 0.0;
    var sess = req.session;
    if(sess.products){
        sess.products.forEach(function (product){
            totalPrice = totalPrice + product.price
        });

        sess['totalPrice'] = totalPrice;
        if (sess.products) {
            return res.json(sess);
        } else {
            return res.json({});
        }
    } else {
        res.json({});
    }
};


exports.addItem = function(req, res) {
    console.log(req.body)
    var productId = req.data.id;
    var qty = req.data.qty;
    var productTitle = req.data.title;
    var productPrice = req.data.price;
    var productInfo = {
        "productId": productId,
        "productTitle": productTitle,
        "quantity": qty,
        "price": productPrice * qty
    };

    var sess = req.session;
    if (!sess.products) {
        sess.products = new Array();
    }
    sess.products.push(productInfo);
    console.log(sess.products)
    return res.send({
        ItemCount: sess.products.length
    });

        //return console.log(body.rows[0].title);

};
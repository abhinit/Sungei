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
    var data = req.body;

    var productInfo = {
        "id": data.id,
        "title": data.title,
        "qty": data.qty,
        "price": data.price * data.qty
    };

    var sess = req.session;
    if (!sess.products) {
        sess.products = new Array();
    }
    sess.products.push(productInfo);

    return res.send({
        ItemCount: sess.products.length
    });
};
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
    var productId = req.params.productId;
    var qty = req.params.qty;
    var client = requestJson.createClient('http://127.0.0.1:5000/');

    client.get('api/products/' + productId, function (err, result, data) {
        if (err) {
            return res.sendStatus(500);
        }
        // console.log(data)
        var productInfo = {
            "productId": data._id,
            "title": data.title,
            "qty": qty,
            "price": data.price * qty
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
    });
};
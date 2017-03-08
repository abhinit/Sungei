var expressSession = require("express-session");
var requestJson = require("request-json");

exports.view = function(req, res) {
    var totalPrice = 0.0;
    var sess = req.session;
    sess.products.forEach(function (product){
        totalPrice = totalPrice + product.price
    });
    sess['totalPrice'] = totalPrice
    if (sess.products) {
        return res.json(sess);
    } else {
        return res.json({});
    }
};


exports.addItem = function(req, res) {
    var productId = req.params.productId;
    var client = requestJson.createClient('http://127.0.0.1:5000/');

    client.get('api/products/' + productId, function (err, result, data) {
        if (err) {
            return res.sendStatus(500);
        }

        var productInfo = {
            "productId": data._id,
            "title": data.title,
            "price": data.offers.price
        };

        var sess = req.session;
        if (!sess.products) {
            sess.products = new Array();
        }
        sess.products.push(productInfo);
        return res.send({
            ItemCount: sess.products.length
        });

        //return console.log(body.rows[0].title);
    });
};
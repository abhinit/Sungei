var mongoose = require('mongoose');
var Product = mongoose.model('Product');
var Tag = mongoose.model('Tag');

exports.list = function(req, res){
    Tag.find({}, function(err, tags){
        if (err){
            console.log(err);
            return res.json({
                "Error": err
            });
        }else {
            return res.json({tag: tags});
        };
    });
};

exports.viewProducts = function(req, res) {
    Product.find({tags: mongoose.Types.ObjectId(req.params.id)}, function(err, products) {
        if (err) {
            console.log(err);
            return res.json({
                "Error": err
            });
        } else{
            return res.json({product: products})
        }
    });
};

exports.tagInfo = function(req, res) {
    Tag.findOne({_id: mongoose.Types.ObjectId(req.params.id)}, function(err, data){
        if (err){
            console.log(err);
            return res.json({
                "Error": err
            });
        }else {
            return res.json({tag: data});
        };
    })
}
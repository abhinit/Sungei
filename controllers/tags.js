var mongoose = require('mongoose');
var Product = mongoose.model('Product');
var Tag = mongoose.model('Tag');

exports.list = function(req, res){
    Tag.find({}, function(err, tags){
        if (err){
            console.log(err);
        }else {
            return res.json({tag: tags});
        };
    });
};

exports.viewProducts = function(req, res) {
    Tag.findOne({name: req.params.name}, function(err, tag){
        if (err) {
            console.log(err);
        } else {
            var tagId = mongoose.Types.ObjectId(tag._id);
            Product.find({tags: tagId}, function(err, products) {
                if (err) {
                    console.log(err);
                } else{
                    console.log(tagId);
                    console.log(products);
                    return res.json({product: products})
                }
            });
        }
    });
};
var mongoose = require('mongoose');
var Product = mongoose.model('Product');
var Tag = mongoose.model('Tag');

exports.seed = function(req, res) {

    var product1 = new Product({
        title: "Horse",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis ac neque. Duis vulputate commodo lectus, ac blandit elit tincidunt id. Sed rhoncus, tortor sed eleifend tristique, tortor mauris molestie elit, et lacinia ipsum quam nec dui. Quisque nec mauris sit amet elit iaculis pretium sit amet quis magna. Aenean velit odio, elementum in tempus ut, vehicula eu diam. Pellentesque rhoncus aliquam mattis. Ut vulputate eros sed felis sodales nec vulputate justo hendrerit. Vivamus varius pretium ligula, a aliquam odio euismod sit amet. Quisque laoreet sem sit amet orci ullamcorper at ultricies metus viverra. Pellentesque arcu mauris, malesuada quis ornare accumsan, blandit sed diam.",
        minPrice: 59.99,
        offers: {
            price: 59.99,
            discount:0,
            stock: 10
        },
        product_rating: 80,
        seller: "sketchy farmer",
        comments : [
            {title:"first review", rating:60, description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis ac neque. Duis vulputate commodo lectus, ac blandit elit tincidunt id. Sed rhoncus, tortor sed eleifend tristique, tortor mauris molestie elit, et lacinia ipsum quam nec dui. Quisque nec mauris sit amet elit iaculis pretium sit amet quis magna. Aenean velit odio, elementum in tempus ut, vehicula eu diam. Pellentesque rhoncus aliquam mattis. Ut vulputate eros sed felis sodales nec vulputate justo hendrerit. Vivamus varius pretium ligula, a aliquam odio euismod sit amet. Quisque laoreet sem sit amet orci ullamcorper at ultricies metus viverra. Pellentesque arcu mauris, malesuada quis ornare accumsan, blandit sed diam."},
            {title:"second review", rating:50, description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis ac neque. Duis vulputate commodo lectus, ac blandit elit tincidunt id. Sed rhoncus, tortor sed eleifend tristique, tortor mauris molestie elit, et lacinia ipsum quam nec dui. Quisque nec mauris sit amet elit iaculis pretium sit amet quis magna. Aenean velit odio, elementum in tempus ut, vehicula eu diam. Pellentesque rhoncus aliquam mattis. Ut vulputate eros sed felis sodales nec vulputate justo hendrerit. Vivamus varius pretium ligula, a aliquam odio euismod sit amet. Quisque laoreet sem sit amet orci ullamcorper at ultricies metus viverra. Pellentesque arcu mauris, malesuada quis ornare accumsan, blandit sed diam."},
            {title:"third review", rating:90, description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis ac neque. Duis vulputate commodo lectus, ac blandit elit tincidunt id. Sed rhoncus, tortor sed eleifend tristique, tortor mauris molestie elit, et lacinia ipsum quam nec dui. Quisque nec mauris sit amet elit iaculis pretium sit amet quis magna. Aenean velit odio, elementum in tempus ut, vehicula eu diam. Pellentesque rhoncus aliquam mattis. Ut vulputate eros sed felis sodales nec vulputate justo hendrerit. Vivamus varius pretium ligula, a aliquam odio euismod sit amet. Quisque laoreet sem sit amet orci ullamcorper at ultricies metus viverra. Pellentesque arcu mauris, malesuada quis ornare accumsan, blandit sed diam."}
        ],
        related_products : []
    });

    product1.save(function(err) {
        if (err) console.log(err);
        else {
            console.log("product saved.");
            // res.json({
            //     "status":"saved"
            // })
        }
    });

    var animal_tag = new Tag({name:"animal"});
    animal_tag.save(function(err){
        if (err) console.log(err);
        else {
            console.log("tag saved")
        }
    });

    var farm_tag = new Tag({name:"farm"});
    farm_tag.save(function(err){
        if (err) console.log(err);
        else {
            console.log("tag saved")
        }
    });

    product1.tags.push(animal_tag, farm_tag);
    product1.save(function(err) {
        if (err) console.log(err);
        else {
            console.log("product saved.");
            // res.json({
            //     "status":"saved"
            // })
        }
    });

    Product.findOne({title:"Horse"})
        .populate('tags')
        .exec(function(err, product){
            if (err) console.log(err);
            res.json({
                "status": "tags populated"
            })
            console.log("tags populated")
        });


    // product1.update({_id: product1._id}, {$set: {tags: tag_id}}, function (err, result) {
    //     if (err) console.log(err);
    //     console.log(result);
    //     res.json({
    //         "status": "assigned tags"
    //     })
    //     console.log(product1.tags)
    // });

    // product1.save(function(err) {
    //     if (err) console.log(err);
    //     else {
    //         console.log("product saved.");
    //         // res.json({
    //         //     "status":"saved"
    //         // })
    //     }
    // });

};

exports.list = function(req, res) {
    Product.find({}, function(err, products){
        res.json({product:products});
    });
};

exports.view = function(req, res) {
    Product.findOne({_id:req.params.id}, function(err, data){
        if (err) {
            console.log(err);
            res.statusCode = 500
            return res.json({
                "Error": err
            });
        } else {
            return res.json(data)
        }
    });
};
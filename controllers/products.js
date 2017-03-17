var mongoose = require('mongoose');
var basicCSV = require("basic-csv");
var Product = mongoose.model('Product');
var Tag = mongoose.model('Tag');

// exports.seed = function(req, res) {

//     var product1 = new Product({
//         title: "Horse",
//         description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis ac neque. Duis vulputate commodo lectus, ac blandit elit tincidunt id. Sed rhoncus, tortor sed eleifend tristique, tortor mauris molestie elit, et lacinia ipsum quam nec dui. Quisque nec mauris sit amet elit iaculis pretium sit amet quis magna. Aenean velit odio, elementum in tempus ut, vehicula eu diam. Pellentesque rhoncus aliquam mattis. Ut vulputate eros sed felis sodales nec vulputate justo hendrerit. Vivamus varius pretium ligula, a aliquam odio euismod sit amet. Quisque laoreet sem sit amet orci ullamcorper at ultricies metus viverra. Pellentesque arcu mauris, malesuada quis ornare accumsan, blandit sed diam.",
//         price: 59.99,
//         discount: 0,
//         rating: 80,
//         seller: "sketchy farmer",
//         comments: [
//             {
//                 title: "first review",
//                 rating: 60,
//                 description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis ac neque. Duis vulputate commodo lectus, ac blandit elit tincidunt id. Sed rhoncus, tortor sed eleifend tristique, tortor mauris molestie elit, et lacinia ipsum quam nec dui. Quisque nec mauris sit amet elit iaculis pretium sit amet quis magna. Aenean velit odio, elementum in tempus ut, vehicula eu diam. Pellentesque rhoncus aliquam mattis. Ut vulputate eros sed felis sodales nec vulputate justo hendrerit. Vivamus varius pretium ligula, a aliquam odio euismod sit amet. Quisque laoreet sem sit amet orci ullamcorper at ultricies metus viverra. Pellentesque arcu mauris, malesuada quis ornare accumsan, blandit sed diam."
//             },
//             {
//                 title: "second review",
//                 rating: 50,
//                 description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis ac neque. Duis vulputate commodo lectus, ac blandit elit tincidunt id. Sed rhoncus, tortor sed eleifend tristique, tortor mauris molestie elit, et lacinia ipsum quam nec dui. Quisque nec mauris sit amet elit iaculis pretium sit amet quis magna. Aenean velit odio, elementum in tempus ut, vehicula eu diam. Pellentesque rhoncus aliquam mattis. Ut vulputate eros sed felis sodales nec vulputate justo hendrerit. Vivamus varius pretium ligula, a aliquam odio euismod sit amet. Quisque laoreet sem sit amet orci ullamcorper at ultricies metus viverra. Pellentesque arcu mauris, malesuada quis ornare accumsan, blandit sed diam."
//             },
//             {
//                 title: "third review",
//                 rating: 90,
//                 description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis ac neque. Duis vulputate commodo lectus, ac blandit elit tincidunt id. Sed rhoncus, tortor sed eleifend tristique, tortor mauris molestie elit, et lacinia ipsum quam nec dui. Quisque nec mauris sit amet elit iaculis pretium sit amet quis magna. Aenean velit odio, elementum in tempus ut, vehicula eu diam. Pellentesque rhoncus aliquam mattis. Ut vulputate eros sed felis sodales nec vulputate justo hendrerit. Vivamus varius pretium ligula, a aliquam odio euismod sit amet. Quisque laoreet sem sit amet orci ullamcorper at ultricies metus viverra. Pellentesque arcu mauris, malesuada quis ornare accumsan, blandit sed diam."
//             }
//         ],
//         related_products: [],
//         images : [{
//             url:'https://static.pexels.com/photos/6468/animal-brown-horse.jpg'
//         }]
//     });

//     product1.save(function (err) {
//         if (err) console.log(err);
//         else {
//             console.log("product saved.");
//         }
//     });

//     var animal_tag = new Tag({name: "animal"});
//     animal_tag.save(function (err) {
//         if (err) console.log(err);
//         else {
//             console.log("tag saved")
//         }
//     });

//     var farm_tag = new Tag({name: "farm"});
//     farm_tag.save(function (err) {
//         if (err) console.log(err);
//         else {
//             console.log("tag saved")
//         }
//     });

//     product1.tags.push(animal_tag);
//     product1.save(function (err) {
//         if (err) console.log(err);
//         else {
//             console.log("product saved.");
//         }
//     });

//     Product.findOne({_id : product1._id})
//         .populate('tags')
//         .exec(function (err) {
//             if (err) console.log(err);
//             console.log("tags populated")
//         });

//     var product2 = new Product({
//         title: "Cow",
//         description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis ac neque. Duis vulputate commodo lectus, ac blandit elit tincidunt id. Sed rhoncus, tortor sed eleifend tristique, tortor mauris molestie elit, et lacinia ipsum quam nec dui. Quisque nec mauris sit amet elit iaculis pretium sit amet quis magna. Aenean velit odio, elementum in tempus ut, vehicula eu diam. Pellentesque rhoncus aliquam mattis. Ut vulputate eros sed felis sodales nec vulputate justo hendrerit. Vivamus varius pretium ligula, a aliquam odio euismod sit amet. Quisque laoreet sem sit amet orci ullamcorper at ultricies metus viverra. Pellentesque arcu mauris, malesuada quis ornare accumsan, blandit sed diam.",
//         price: 59.99,
//         discount: 0,
//         rating: 50,
//         seller: "sketchy farmer",
//         comments: [
//             {
//                 title: "first review",
//                 rating: 20,
//                 description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis ac neque. Duis vulputate commodo lectus, ac blandit elit tincidunt id. Sed rhoncus, tortor sed eleifend tristique, tortor mauris molestie elit, et lacinia ipsum quam nec dui. Quisque nec mauris sit amet elit iaculis pretium sit amet quis magna. Aenean velit odio, elementum in tempus ut, vehicula eu diam. Pellentesque rhoncus aliquam mattis. Ut vulputate eros sed felis sodales nec vulputate justo hendrerit. Vivamus varius pretium ligula, a aliquam odio euismod sit amet. Quisque laoreet sem sit amet orci ullamcorper at ultricies metus viverra. Pellentesque arcu mauris, malesuada quis ornare accumsan, blandit sed diam."
//             },
//             {
//                 title: "second review",
//                 rating: 50,
//                 description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis ac neque. Duis vulputate commodo lectus, ac blandit elit tincidunt id. Sed rhoncus, tortor sed eleifend tristique, tortor mauris molestie elit, et lacinia ipsum quam nec dui. Quisque nec mauris sit amet elit iaculis pretium sit amet quis magna. Aenean velit odio, elementum in tempus ut, vehicula eu diam. Pellentesque rhoncus aliquam mattis. Ut vulputate eros sed felis sodales nec vulputate justo hendrerit. Vivamus varius pretium ligula, a aliquam odio euismod sit amet. Quisque laoreet sem sit amet orci ullamcorper at ultricies metus viverra. Pellentesque arcu mauris, malesuada quis ornare accumsan, blandit sed diam."
//             },
//             {
//                 title: "third review",
//                 rating: 90,
//                 description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis ac neque. Duis vulputate commodo lectus, ac blandit elit tincidunt id. Sed rhoncus, tortor sed eleifend tristique, tortor mauris molestie elit, et lacinia ipsum quam nec dui. Quisque nec mauris sit amet elit iaculis pretium sit amet quis magna. Aenean velit odio, elementum in tempus ut, vehicula eu diam. Pellentesque rhoncus aliquam mattis. Ut vulputate eros sed felis sodales nec vulputate justo hendrerit. Vivamus varius pretium ligula, a aliquam odio euismod sit amet. Quisque laoreet sem sit amet orci ullamcorper at ultricies metus viverra. Pellentesque arcu mauris, malesuada quis ornare accumsan, blandit sed diam."
//             }
//         ],
//         recommendations: [],
//         images : [{
//             url:'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Cow_female_black_white.jpg/1200px-Cow_female_black_white.jpg'
//         }]
//     });

//     product2.save(function (err) {
//         if (err) console.log(err);
//         else {
//             console.log("product saved.");
//         }
//     });
//     //add to the tags array
//     product2.tags.push(animal_tag, farm_tag);
//     product2.save(function (err) {
//         if (err) console.log(err);
//         else {
//             console.log("product saved.");
//         }
//     });
//     //hydrate
//     Product.findOne({_id : product2._id})
//         .populate('tags')
//         .exec(function (err) {
//             if (err) console.log(err);
//             console.log("tags populated")
//         });

//     res.json({"status":"done"});

//     product1.recommendations.push({product:product2, strength:40});
//     product1.save(function (err) {
//         if (err) console.log(err);
//         else {
//             console.log("product saved.");
//         }
//     });
//     product2.recommendations.push({product:product1, strength:60});
//     product2.save(function (err) {
//         if (err) console.log(err);
//         else {
//             console.log("product saved.");
//         }
//     });

//     Product.findOne({_id : product1._id})
//         .populate('recommendations')
//         .exec(function (err) {
//             if (err) console.log(err);
//             console.log("recommendations populated")
//         });
//     Product.findOne({_id : product2._id})
//         .populate('recommendations')
//         .exec(function (err) {
//             if (err) console.log(err);
//             console.log("recommendations populated")
//         });
// };

exports.seed = function(req, res) {

    var furniture = new Tag({name: "furniture"});
    furniture.save(function (err) {
        if (err) console.log(err);
        else {
            console.log("tag saved")
        }
    });

    var housekeeping = new Tag({name: "housekeeping"});
    housekeeping.save(function (err) {
        if (err) console.log(err);
        else {
            console.log("tag saved")
        }
    });

    var home_improvement = new Tag({name: "home-improvement"});
    home_improvement.save(function (err) {
        if (err) console.log(err);
        else {
            console.log("tag saved")
        }
    });

    var tags = []

    tags.push(furniture)
    tags.push(housekeeping)
    tags.push(home_improvement)

    basicCSV.readCSV(__dirname + "/../data/products.csv", function (error, rows) {
        saveToDb(rows, 0, tags, function(){
            res.json({
                "status": "done"
            });
        })
    });

}

var saveToDb = function(rows, index, tags, done) {

    if(index == rows.length - 1){
        done();
    } else {
        var row = rows[index]
        var product = new Product({
            title: row[1],
            description: row[5],
            price: row[3],
            discount: row[4],
            rating: row[7],
            seller: row[2],
            comments: [
                // {
                //  title: "first review",
                //  rating: 20,
                //  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis ac neque. Duis vulputate commodo lectus, ac blandit elit tincidunt id. Sed rhoncus, tortor sed eleifend tristique, tortor mauris molestie elit, et lacinia ipsum quam nec dui. Quisque nec mauris sit amet elit iaculis pretium sit amet quis magna. Aenean velit odio, elementum in tempus ut, vehicula eu diam. Pellentesque rhoncus aliquam mattis. Ut vulputate eros sed felis sodales nec vulputate justo hendrerit. Vivamus varius pretium ligula, a aliquam odio euismod sit amet. Quisque laoreet sem sit amet orci ullamcorper at ultricies metus viverra. Pellentesque arcu mauris, malesuada quis ornare accumsan, blandit sed diam."
                // },
                // {
                //  title: "second review",
                //  rating: 50,
                //  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis ac neque. Duis vulputate commodo lectus, ac blandit elit tincidunt id. Sed rhoncus, tortor sed eleifend tristique, tortor mauris molestie elit, et lacinia ipsum quam nec dui. Quisque nec mauris sit amet elit iaculis pretium sit amet quis magna. Aenean velit odio, elementum in tempus ut, vehicula eu diam. Pellentesque rhoncus aliquam mattis. Ut vulputate eros sed felis sodales nec vulputate justo hendrerit. Vivamus varius pretium ligula, a aliquam odio euismod sit amet. Quisque laoreet sem sit amet orci ullamcorper at ultricies metus viverra. Pellentesque arcu mauris, malesuada quis ornare accumsan, blandit sed diam."
                // },
                // {
                //  title: "third review",
                //  rating: 90,
                //  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis ac neque. Duis vulputate commodo lectus, ac blandit elit tincidunt id. Sed rhoncus, tortor sed eleifend tristique, tortor mauris molestie elit, et lacinia ipsum quam nec dui. Quisque nec mauris sit amet elit iaculis pretium sit amet quis magna. Aenean velit odio, elementum in tempus ut, vehicula eu diam. Pellentesque rhoncus aliquam mattis. Ut vulputate eros sed felis sodales nec vulputate justo hendrerit. Vivamus varius pretium ligula, a aliquam odio euismod sit amet. Quisque laoreet sem sit amet orci ullamcorper at ultricies metus viverra. Pellentesque arcu mauris, malesuada quis ornare accumsan, blandit sed diam."
                // }
            ],
            recommendations: [],
            images : [{
                url: row[6]
            }]
        });

        console.log("saving product "+index);

        switch(row[8]){
            case 'furniture':
                product.tags.push(tags[0]);
                break;
            case 'housekeeping':
                product.tags.push(tags[1]);
                break;
            case 'home-improvement':
                product.tags.push(tags[2]);
                break;
        }

        product.save(function (err) {
            if (err) {
                console.log(err);
                console.log("Not saving "+index);
                console.log(row);
                saveToDb(rows, index+1, tags, done)
            } else {
                console.log("product saved.");
                saveToDb(rows, index+1, tags, done)
            }
        });
    }
}

exports.list = function(req, res) {
    Product.find({}, function(err, products){
        if (err){
            console.log(err);
        }else {
            return res.json({product: products});
        }
    });
};

exports.view = function(req, res) {
    Product.findOne({_id:req.params.id}, function(err, data){
        if (err) {
            console.log(err);
            res.statusCode = 500;
            return res.json({
                "Error": err
            });
        } else {
            return res.json(data)
        }
    });
};

exports.getTagInfo = function(req, res){
    Product.findOne({_id: req.params.id}, function(err,data){
        if(err){
            console.log(err);
            return res.json({
                "Error" : err
            })
        } else {
            Tag.find({_id:{$in : data.tags}}, function(err, tags) {
                if (err) {
                    console.log(err);
                    return res.json({
                        "Error": err
                    });
                } else {
                    return res.json({tags : tags})
                }
            })
        }
    });
};

exports.getRecommendations = function(req, res){
    Product.findOne({_id: req.params.id}, function(err,data){
        if(err){
            console.log(err);
            return res.json({
                "Error" : err
            })
        } else {
            var recList = [];
            for (var i=0; i<data.recommendations.length; i++){
                recList[i] = data.recommendations[i].product;
            }
            Product.find({_id:{$in : recList}}, function(err, recommendations) {
                if (err) {
                    console.log(err);
                    return res.json({
                        "Error": err
                    });
                } else {
                    return res.json({recommendations : recommendations})
                }
            })
        }
    });
};

exports.getSearch = function(req, res){
    var searchItems = req.params.search.split(" ");
    Tag.find({name: {$in: searchItems}}, function(err, tags){
        if (err) {
            console.log(err);
            return res.json({
                "Error": err
            });
        } else {
            var tag_id = [];
            for (var i=0; i<tags.length; i++){
                tag_id[i] = tags[i]._id;
            }
            Product.find({$or: [
                {title: {$in: searchItems}},
                {description: {$in: searchItems}},
                {tags: {$in: tag_id}}
            ]}, function(err, data) {
                if (err) {
                    console.log(err);
                    return res.json({
                        "Error": err
                    });
                } else {
                    return res.json({products : data})
                }
            });
        }
    });

};
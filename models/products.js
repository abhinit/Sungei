var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var mongoHandler = require("C:/Users/emily/Documents/MLDS/ecommerce/traider.io/controllers/db.client.js");
var collectionName = "products";
var url = "mongodb://localhost:27017/traider";

var mongoclient = mongoHandler.getDbClient();
// Open the connection to the server
mongoose.connect(url);

// Schemas
var Sizes = new Schema({
    size: {
        type: String,
        required: true
    },
    available: {
        type: Number,
        required: true,
        min: 0,
        max: 10
    },
    sku: {
        type: String,
        required: true,
        validate: [/[a-zA-Z0-9]/, 'Product sku should only have letters and numbers']
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    discount: {
        type: Number,
        max: 100,
        min: 0
    }
});

var Images = new Schema({
    kind: {
        type: String,
        enum: ['thumbnail', 'catalog', 'detail', 'zoom'],
        required: true
    },
    url: {
        type: String,
        required: true
    }
});

var Variants = new Schema({
    color: String,
    images: [Images],
    sizes: [Sizes]
});

var Catalogs = new Schema({
    name: String
});

var Comment = new Schema({
    title: {
        type: String,
        default: "comment title"
    },
    description: {
        type: String,
        default: "comment description"
    },
    rating: {
        type: Number,
        default: 0
    }
});

// Product Model
var ProductSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    style: {
        type: String,
        unique: true
    },
    images: [Images],
    tags: [{
        type: Schema.Types.ObjectId,
        ref: 'Tag'
    }],
    catalogs: [Catalogs],
    variants: [Variants],
    comments: [Comment],
    modified: {
        type: Date,
        default: Date.now
    },
    rating: {
        type: Number,
        default: 0
    },
    seller: {
        type: String,
        default:"Seller"
    }

});


// validation
ProductSchema.path('title').validate(function(v) {
    console.log("validate title");
    console.log(v);
    return v.length > 10 && v.length < 70;
});

ProductSchema.path('style').validate(function(v) {
    console.log("validate style");
    console.log(v);
    return v.length < 40;
}, 'Product style attribute is should be less than 40 characters');

ProductSchema.path('description').validate(function(v) {
    console.log("validate description");
    console.log(v);
    return v.length > 10;
}, 'Product description should be more than 10 characters');



ProductSchema.methods.getById = function(id, callback) {
    if (callback === null || typeof(callback) !== "function") {
        throw "Call to controllers method must include callback function"
    }
    var mongoclient = mongoHandler.getDbClient();
    // Open the connection to the server
    mongoclient.connect(url, function(err, mongoclient) {
        var dbName = mongoHandler.dbName();
        var db = mongoclient.db(dbName);
        var mongoId;
        try {
            mongoId = mongoHandler.makeObjectID(id);
        } catch (e) {
            return callback(e);
        }
        console.log("id:" + mongoId);
        db.collection(collectionName).findOne({
            "_id": mongoId
        }, function(err, result) {
            mongoclient.close();
            if (err) {
                callback(err);
                return;
            } else {
                // Close the connection
                return callback(null, result);
            }
        });
    });
};

ProductSchema.methods.getAll = function(callback) {
    if (callback === null || typeof(callback) !== "function") {
        throw "Call to controllers method must include callback function"
    }
    var mongoclient = mongoHandler.getDbClient();
    mongoclient.connect(url, function(err, mongoclient) {

        if (err) {
            mongoclient.close();
            throw err.Message;
            return;
        }

        var dbName = mongoHandler.dbName();
        var db = mongoclient.db(dbName);
        console.log(dbName + "." + collectionName);

        db.collection(collectionName).find({}, function(err, result) {
            if (err) {
                mongoclient.close();
                throw err.Message;
                return;
            } else {
                result.toArray(function(err, resultArray) {
                    // Close the connection
                    mongoclient.close();
                    console.log(resultArray)

                    console.log("Got data: " + resultArray.length + " records.");
                    return callback(resultArray);

                });
            }
        });
    });
};


ProductSchema.methods.insert = function(collectionName, data, callback) {
    var mongoclient = mongoHandler.getDbClient();
    mongoclient.connect(url, function(err, mongoclient) {

        if (err) {
            mongoclient.close();
            throw err.Message;
            return;
        }

        var dbName = mongoHandler.dbName();
        var db = mongoclient.db(dbName);
        console.log(dbName + "." + collectionName);

        db.collection(collectionName).insert(data, function(err, result) {
            if (err) {
                mongoclient.close();
                throw err.Message;
                return;
            } else if (callback !== null && typeof(callback) === "function") {
                mongoclient.close();
                return callback(result);
            } else {
                mongoclient.close();
            }
        });
    });
};
/*
ProductSchema.methods.update = function(collectionName, id, data, callback) {
    var mongoclient = mongoHandler.getDbClient();
    mongoclient.connect(url, function(err, mongoclient) {

        if (err) {
            mongoclient.close();
            throw err.Message;
            return;
        }

        var dbName = mongoHandler.dbName();
        var db = mongoclient.db(dbName);
        console.log(dbName + "." + collectionName);
        console.log(id,data)

        db.collection(collectionName).update({_id: id},{$set: data}, function(err, result) {
            if (err) {
                mongoclient.close();
                throw err.Message;
                return;
            } else if (callback !== null && typeof(callback) === "function") {
                mongoclient.close();
                return callback(result);
            } else {
                mongoclient.close();
            }
        });
    });
};
*/

ProductSchema.methods.assignTags = function(product_id, tags_array, callback) {
    if (callback === null || typeof(callback) !== "function") {
        throw "Call to controllers method must include callback function"
    }
    var mongoclient = mongoHandler.getDbClient();
    mongoclient.connect(url, function(err, mongoclient) {

        if (err) {
            mongoclient.close();
            throw err.Message;
            return;
        }

        var dbName = mongoHandler.dbName();
        var db = mongoclient.db(dbName);
        console.log(dbName + "." + collectionName);

        Product.update({_id: product_id}, {$set: {tags: tags_array}}, callback);

        mongoclient.close();
    });
};

var Product = mongoose.model('Product', ProductSchema);
module.exports = mongoose.model('Product')


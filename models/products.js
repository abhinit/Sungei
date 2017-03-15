var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Images = new Schema({
    kind: {
        type: String,
        enum: ['thumbnail', 'catalog', 'detail', 'zoom'],
        default: 'detail'
    },
    url: {
        type: String,
        required: true
    }
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

var Recommendation = new Schema({
    product: {
       type: Schema.Types.ObjectId,
       ref: 'Product'
    },
    strength:{
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
    images: [Images],
    tags: [{
        type: Schema.Types.ObjectId,
        ref: 'Tag'
    }],
    catalogs: [Catalogs],
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
    },
    recommendations: [Recommendation],
    price:{
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

mongoose.model('Product', ProductSchema);


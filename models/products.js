var mongoose = require('mongoose');
var Schema = mongoose.Schema;

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

var Recommendation = new Schema({
    product: {
       type: Schema.Types.ObjectId,
       ref: 'product'
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
    },
    recommendations: [Recommendation]

});

mongoose.model('Product', ProductSchema);


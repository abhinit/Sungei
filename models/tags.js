var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var collectionName = "products";
var url = "mongodb://localhost:27017/traider";

mongoose.connect(url);

var TagSchema = new Schema({
    name: String
});

mongoose.model('Tag', TagSchema);


var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var OrderSchema = new Schema({
	username: { type: Schema.Types.Object, ref: 'User' },
	orderNumber: { type: String, required: true },
	items: { type: Schema.Types.Array, ref: 'Product' },
	created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Orders', OrderSchema)
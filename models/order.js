var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var OrderSchema = new Schema({
	date: Date,
	time: String,
	name: String,
	amount: Number,
	_items: [{ type: Schema.ObjectId, ref: 'Product' }],
	_user: { type: Schema.ObjectId, ref: 'User' },
	created_at: { type: Date, default: Date.now }
});

OrderSchema.pre('save', function(next){
	this.amount = +this.amount.toFixed(2);
	next();
});

module.exports = mongoose.model('Order', OrderSchema)
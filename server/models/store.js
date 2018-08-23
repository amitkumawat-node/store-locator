var mongoose = require('mongoose');

var Store = new mongoose.Schema({
	name: {type:String},
	address:{type: String},
	location:[Number]
});
Store.index({ location: "2dsphere" });
module.exports = mongoose.model('store',Store)
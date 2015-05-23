var mongoose = require('mongoose');

module.exports = mongoose.model('Entry', {
	filename: String,
	created: {type: Date, default: Date.now},
	caption: String,
	likes: Number,
	dislikes: Number
});
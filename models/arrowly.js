var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
var shortid = require('shortid');

var ObjectId = mongoose.Schema.Types.ObjectId;

var ArrowlySchema   = new Schema({
	id: { type: String, index: true, unique: true, default: shortid.generate },
	img: String,
	date_created: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Arrowly', ArrowlySchema);
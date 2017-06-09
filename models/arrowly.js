var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
var shortid = require('shortid');

var Mixed = mongoose.Schema.Types.Mixed;
var ObjectId = mongoose.Schema.Types.ObjectId;

var ArrowlySchema   = new Schema({
	id: { type: String, index: true, unique: true, default: shortid.generate },
	width: Number,
	height: Number,
	arrows: [ Mixed ],
	img: String,
	date_created: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Arrowly', ArrowlySchema);
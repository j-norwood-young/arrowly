var restify = require("restify");
var config = require("config");
var server = restify.createServer();
var fs = require("fs");


var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/arrowly');

var Arrowly = require("./models/arrowly");

server.use(
	function crossOrigin(req,res,next){
		res.header("Access-Control-Allow-Origin", "http://localhost:3333");
		res.header("Access-Control-Allow-Headers", "X-Requested-With");
		return next();
	}
);
server.use(restify.queryParser());
server.use(restify.bodyParser());

server.post("/save", (req, res) => {
	var arrowly = new Arrowly({ img: req.params.img });
	arrowly.save((err, result) => {
		console.log(err, result);
		if (err)
			return res.send(500, { status: "error", error: err });
		return res.send({ status: "ok", result });
	});
});

server.get("/get/:id", (req, res) => {
	var id = req.params.id;
	console.log(id);
	var arrowly = Arrowly.find({ id }, (err, result) => {
		if (err)
			return res.send(500, { status: "error", error: err });
		if (result.length)
			result = result.pop();
		return res.send({ status: "ok", result });
	});
});

server.listen(config.port, function() {
	console.log('%s listening at %s', server.name, server.url);
});
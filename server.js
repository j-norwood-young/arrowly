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

var data = (req, res, next) => {
	console.log(req);
	res.data = {};
	if (req.params.img)
		res.data.img = req.params.img;
	if (req.params.arrows)
		res.data.arrows = req.params.arrows;
	next();
};

var getById = (req, res, next) => {
	var arrowly = Arrowly.findOne({ id: req.params.id }, (err, result) => {
		if (err)
			return res.send(500, { status: "error", error: err });
		res.arrowly = result;
		next();
	});
};

server.post("/save", data, (req, res) => {
	var arrowly = new Arrowly(res.data);
	arrowly.save((err, result) => {
		console.log(err, result);
		if (err)
			return res.send(500, { status: "error", error: err });
		return res.send({ status: "ok", result });
	});
});

server.put("/save/:id", getById, data, (req, res) => {
	// for (var i in res.data) {
	// 	console.log(i);
	// 	res.arrowly[i] = data[i];
	// }
	// console.log(res.arrowly);
	console.log(res.data);
	res.arrowly.update(res.data, (err, result) => {
		if (err)
			return res.send(500, { status: "error", error: err });
		return res.send({ status: "ok", result });
	});
});

server.get("/get/:id", getById, (req, res) => {
	return res.send({ status: "ok", data: res.arrowly });
});


server.listen(config.port, function() {
	console.log('%s listening at %s', server.name, server.url);
});
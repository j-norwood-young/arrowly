var _ = require("lodash");
var eventhandler = require("../libs/eventhandler");
var ArrowDrawer = require("../libs/arrowdrawer");
var API = require("../libs/api");
var ImgHandler = require("../libs/imghandler");
var $ = require("jquery");

// Hanldes saving and loading
var State = function() {
	var self = this;
	self.currentId = $("#code").val();
	var imghandler = new ImgHandler();
	var arrowdrawer = null;

	eventhandler.listen("img-loaded", (params) => {
		var el = $("<canvas id='drawingLayer'>");
		el[0].width = params.width;
		el[0].height = params.height;
		$("#businesstime").append(el);
		if (!params.id) {
			API.save({
				img: params.src
			});
		}
		arrowdrawer = new ArrowDrawer();
	});

	eventhandler.listen("saved", params => {
		self.currentId = params.id;
		self.setId(params.id);
	});

	eventhandler.listen("arrow-drawn", (params) => {
		var arrows = [];
		$(".arrow-layer").each((index, el) => {
			var data = {};
			data.startX = $(el).data("startX");
			data.startY = $(el).data("startY");
			data.endX = $(el).data("endX");
			data.endY = $(el).data("endY");
			data.text = $(el).data("text");
			arrows.push(data);
		});
		API.update(self.currentId, { arrows });
	});

	self.setId = id => {
		$("#code").val(id);
		location.hash = "#" + id;
		self.loadId();
	};

	self.loadId = () => {
		var id = $("#code").val();
		if ((id.length >= 8) && (id != self.currentId)) {
			API.get(id)
			.then(result => {
				self.currentId = id;
				imghandler.populateImg(result.data.img, id);
				result.data.arrows.forEach(arrow => {
					// arrowdrawer.draw(arrow);
				});
			})
			.catch(err => {
				console.error(err);
			});
		}
	};

	return self;
};

module.exports = State;
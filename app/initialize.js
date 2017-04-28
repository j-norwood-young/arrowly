var _ = require("lodash");
var ImgHandler = require("./libs/imghandler");
var eventhandler = require("./libs/eventhandler");
var ArrowDrawer = require("./libs/arrowdrawer");
var API = require("./libs/api");
var $ = require("jquery");

var imghandler = new ImgHandler();
var currentId = null;

document.addEventListener('DOMContentLoaded', function() {
  // do your setup here
	console.log('Initialized app');
	eventhandler.listen("img-loaded", (params) => {
		console.log(params);
		var el = $("<canvas id='drawingLayer'>");
		el[0].width = params.width;
		el[0].height = params.height;
		$("#businesstime").append(el);
		if (!params.id) {
			API.save({
				img: params.src
			});
		}
		ArrowDrawer();
	});
	ImgHandler({ el: "#businesstime" });
	eventhandler.listen("saved", params => {
		console.log(params);
		$("#code").val(params.id);
	});

	var loadId = () => {
		var id = $("#code").val();
		if ((id.length >= 8) && (id != currentId)) {
			API.get(id)
			.then(result => {
				currentId = id;
				imghandler.populateImg(result.result.img, id);
				location.hash = "#" + id;
			})
			.catch(err => {
				console.error(err);
			});
		}
  	};

	$("#code").on("change", e => {
		loadId();
	});

	$("#code").on("keyup", e => {
		loadId();
  	});

	var checkHash = () => {
		if (location.hash) {
			var code = location.hash.substr(1);
			console.log("Checking code", code);
			$("#code").val(code);
			loadId();
		}
	};

	$(window).on("hashchange", checkHash);

	checkHash();
});

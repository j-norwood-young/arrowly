var $ = require("jquery");
var eventhandler = require("../libs/eventhandler");

var ImgHandler = function(opts) {
	var self = this;
	opts = opts || {};
	opts.el = opts.el || "#businesstime";
	opts.canvas = opts.canvas || "#canvas";

	var uploadEl = $("body").append("<input type='file' style='display:none' id='ImgHandlerInput'>");
	$(opts.el).on("click", e => {
		if (!$(opts.el).hasClass("loaded"))
			$("#ImgHandlerInput").click();
	});

	$("body").on("change", "#ImgHandlerInput", e => {
		loadFile(e.originalEvent.srcElement.files[0]);
	});

	loadFile = file => {
		var reader = new FileReader();
		reader.onload = e => {
			populateImg(e.target.result);
		};
		reader.readAsDataURL(file);
	};

	populateImg = (src, id) => {
		$(opts.el).empty();
		$(opts.el).append("<canvas id='imgCanvas'>");
		var img = new Image();
		img.onload = () => {
			$(opts.el).addClass("loaded");
			var canvas = document.getElementById("imgCanvas");
			canvas.width = img.width;
			canvas.height = img.height;
			var ctx = canvas.getContext("2d");
			ctx.drawImage(img, 0, 0);
			eventhandler.trigger("img-loaded", { width: img.width, height: img.height, id, src });
		};
		img.src = src;
	};

	return {
		loadFile,
		populateImg
	};
};

module.exports = ImgHandler;
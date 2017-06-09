var eventhandler = require("../events/eventhandler");
var Arrow = require("../libs/arrow");
var $ = require("jquery");
var levelCount = 1;

var ArrowDrawer = function(opts) {
	var self = this;
	opts = opts || {};
	self.isDrawing = false;
	self.start = self.end = [0, 0];
	var arrow = null;
	var canvas = null;
	var ctx = null;
	var text = null;
	self.active = false;

	var getMousePos = (e) => {
		var rect = canvas.getBoundingClientRect();
		var scaleX = canvas.width / rect.width;
		var scaleY = canvas.height / rect.height;
		return {
			x: (e.clientX - rect.left) * scaleX,
			y: (e.clientY - rect.top) * scaleY
		};
	};

	var clearDrawing = () => {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
	};

	var startDrawing = e => {
		canvas = document.getElementById("drawingLayer");
		ctx = canvas.getContext("2d");
		self.isDrawing = true;
		clearDrawing();
		arrow = new Arrow({ ctx, arrowHeadLength: 60 });
		arrow.startX = getMousePos(e).x;
		arrow.startY = getMousePos(e).y;
	};

	var createDrawingLayer = () => {
		$("#drawingLayer").remove();
		var el = $("<canvas id='drawingLayer'>");
		el[0].width = canvas.width;
		el[0].height = canvas.height;
		$("#businesstime").append(el);
		canvas = document.getElementById("drawingLayer");
	};

	var saveDrawing = () => {
		self.replicate(arrow);
		createDrawingLayer();
	};

	var endDrawing = e => {
		self.isDrawing = false;
		$("#messageModal").removeClass("hidden");
		$("#messageInput").focus();
	};

	var updateDrawing = e => {
		if (!self.isDrawing)
			return;
		clearDrawing();
		arrow.endX = getMousePos(e).x;
		arrow.endY = getMousePos(e).y;
		arrow.draw();
	};

	var cancelDrawing = e => {
	};

	self.drawText = (ctx, arrow, text) => {
		var offset = (arrow.startY <= arrow.endY) ? -15 : 15;
		var baseline = (arrow.startY <= arrow.endY) ? "bottom" : "top";
		ctx.font = "40px Helvetica";
		ctx.textAlign = "center";
		ctx.textBaseline = baseline;
		ctx.fillText(text, arrow.startX, arrow.startY + offset);
	};

	var saveMessage = e => {
		text = $("#messageInput").val();
		$("#messageModal").addClass("hidden");
		self.drawText(ctx, arrow, text);
		saveDrawing();
	};

	$("#messageModal").on("keypress", e => {
		if (e.keyCode === 13)
			saveMessage(e);
	});

	$("#messageModal").on("click", e => {
		if (e.originalEvent.target.id !== "messageInput")
			saveMessage(e);
	});

	eventhandler.listen("img-loaded", params => {
		$("#businesstime").on("mousedown", "#drawingLayer", startDrawing);
		$("#businesstime").on("mouseup", "#drawingLayer", endDrawing);
		$("#businesstime").on("mousemove", "#drawingLayer", updateDrawing);
		$("#businesstime").on("mouseout", "#drawingLayer", cancelDrawing);
	});
	
	self.replicate = (arrow) => {
		var el = $(`<canvas id='arrowLayer${levelCount++}' class='arrow-layer'>`);
		el[0].width = canvas.width;
		el[0].height = canvas.height;
		el.data("startX", arrow.startX);
		el.data("startY", arrow.startY);
		el.data("endX", arrow.endX);
		el.data("endY", arrow.endY);
		el.data("text", text);
		var ctx = el[0].getContext("2d");
		ctx.drawImage(canvas, 0, 0);
		$("#businesstime").append(el);
		eventhandler.trigger("arrow-drawn", { startX: arrow.startX, startY: arrow.startY, endX: arrow.endX, endY: arrow.endY, text });
	};

	self.draw = (arrow, width, height) => {
		var el = $(`<canvas id='arrowLayer${levelCount++}' class='arrow-layer'>`);
		el[0].width = width;
		el[0].height = height;
		el.data("startX", arrow.startX);
		el.data("startY", arrow.startY);
		el.data("endX", arrow.endX);
		el.data("endY", arrow.endY);
		el.data("text", arrow.text);
		var ctx = el[0].getContext("2d");
		arrow.ctx = ctx;
		var newarrow = new Arrow(arrow);
		newarrow.draw();
		self.drawText(ctx, newarrow, arrow.text);
		$("#businesstime").append(el);
		eventhandler.trigger("arrow-redrawn", newarrow);
	};

	return self;
};

module.exports = ArrowDrawer;
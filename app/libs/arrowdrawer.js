var eventhandler = require("../libs/eventhandler");
var Arrow = require("../libs/arrow");
var $ = require("jquery");

var ArrowDrawer = function(opts) {
	var self = this;
	opts = opts || {};
	self.isDrawing = false;
	self.start = self.end = [0, 0];
	var arrow = null;
	var canvas = document.getElementById("drawingLayer");
	var ctx = canvas.getContext("2d");

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
		// console.log(e);
		self.isDrawing = true;
		clearDrawing();
		arrow = new Arrow();
		arrow.startX = getMousePos(e).x;
		arrow.startY = getMousePos(e).y;
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

	var saveMessage = e => {
		var val = $("#messageInput").val();
		$("#messageModal").addClass("hidden");
		// Above or below?
		var offset = (arrow.startY <= arrow.endY) ? -15 : 15;
		ctx.font = "40px Helvetica";
		ctx.textAlign = "center";
		ctx.textBaseline = (arrow.startY <= arrow.endY) ? "bottom" : "top";
		ctx.fillText(val, arrow.startX, arrow.startY + offset);
	};

	$("#messageModal").on("keypress", e => {
		if (e.keyCode === 13)
			saveMessage(e);
	});

	$("#messageModal").on("click", e => {
		if (e.originalEvent.target.id !== "messageInput")
			saveMessage(e);
	});

	$("#businesstime").on("mousedown", "#drawingLayer", startDrawing);
	$("#businesstime").on("mouseup", "#drawingLayer", endDrawing);
	$("#businesstime").on("mousemove", "#drawingLayer", updateDrawing);
	$("#businesstime").on("mouseout", "#drawingLayer", cancelDrawing);

	console.log("Waiting for mouse events");
};

module.exports = ArrowDrawer;
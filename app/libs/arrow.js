var $ = require("jquery");

var Arrow = function(opts) {
	opts = opts || {};
	var self = {
		startX : opts.startX || 0,
		startY : opts.startY || 0,
		endX : opts.endX || 0,
		endY : opts.endY || 0,
		arrowHeadLength : opts.arrowHeadLength || 30,
		ctx : opts.ctx || null,
		colour : opts.colour || "#000000",
		width : opts.weight || 10,
	};

	var drawLine = () => {
		var dx = self.endX - self.startX;
		var dy = self.endY - self.startY;
		var rot = -Math.atan2(dx, dy);
		var len = Math.sqrt(dx * dx + dy * dy);
		self.ctx.strokeStyle = self.colour;
		self.ctx.lineWidth = self.width;
		self.ctx.save();
		self.ctx.translate(self.startX, self.startY);
		self.ctx.rotate(rot);
		self.ctx.beginPath();
		self.ctx.moveTo(0, 0);
		self.ctx.lineTo(0, len - self.arrowHeadLength);
		self.ctx.stroke();
		self.ctx.restore();
	};

	var drawArrowhead = () => {
		var radians=Math.atan((self.endY - self.startY) / (self.endX - self.startX));
		radians += ((self.endX > self.startX) ? 90 : -90) * Math.PI / 180;
		self.ctx.save();
		self.ctx.beginPath();
		self.ctx.translate(self.endX, self.endY);
		self.ctx.rotate(radians);
		self.ctx.moveTo(0,0);
		self.ctx.lineTo(self.width * 2.5, self.arrowHeadLength);
		self.ctx.lineTo(self.width * -2.5, self.arrowHeadLength);
		self.ctx.closePath();
		self.ctx.restore();
		self.ctx.fill();
	};

	self.draw = () => {
		drawLine();
		drawArrowhead();
	};

	return self;
};

module.exports = Arrow;
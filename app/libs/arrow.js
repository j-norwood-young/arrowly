var $ = require("jquery");

var Arrow = function(opts) {
	var self = this;
	opts = opts || {};
	var canvas = document.getElementById("drawingLayer");
	ctx = canvas.getContext("2d");
	self.startX = (opts.start) ? opts.start[0] : 0;
	self.startY = (opts.start) ? opts.start[1] : 0;
	self.endX = (opts.end) ? opts.end[0] : 0;
	self.endY = (opts.end) ? opts.end[1] : 0;
	ctx.strokeStyle = opts.colour || "#000000";
	ctx.lineWidth = opts.weight || 10;

	function Line(x1,y1,x2,y2){
		this.x1=x1;
		this.y1=y1;
		this.x2=x2;
		this.y2=y2;
	}

	Line.prototype.drawWithArrowheads=function(ctx){

        // arbitrary styling
        // ctx.strokeStyle="blue";
        // ctx.fillStyle="blue";
        // ctx.lineWidth=1;

        // draw the line
        ctx.beginPath();
        ctx.moveTo(this.x1, this.y1);
        ctx.lineTo(this.x2, this.y2);
        ctx.stroke();

        // draw the starting arrowhead
        // var startRadians=Math.atan((this.y2-this.y1)/(this.x2-this.x1));
        // startRadians+=((this.x2>this.x1)?-90:90)*Math.PI/180;
        // this.drawArrowhead(ctx,this.x1,this.y1,startRadians);
        // draw the ending arrowhead
        var endRadians=Math.atan((this.y2-this.y1)/(this.x2-this.x1));
        endRadians+=((this.x2>this.x1)?90:-90)*Math.PI/180;
        this.drawArrowhead(ctx,this.x2,this.y2,endRadians);
    };

    Line.prototype.drawArrowhead=function(ctx,x,y,radians){
        ctx.save();
        ctx.beginPath();
        ctx.translate(x, y);
        ctx.rotate(radians);
        ctx.moveTo(0,0);
        ctx.lineTo(20,30);
        ctx.lineTo(-20,30);
        ctx.closePath();
        ctx.restore();
        ctx.fill();
    };

	self.draw = () => {
		var line = new Line(self.startX, self.startY, self.endX, self.endY);
		line.drawWithArrowheads(ctx);
		// ctx.beginPath();
		// ctx.moveTo(self.startX, self.startY);
		// ctx.lineTo(self.endX, self.endY);
		// ctx.stroke();

	};



	return self;
};

module.exports = Arrow;
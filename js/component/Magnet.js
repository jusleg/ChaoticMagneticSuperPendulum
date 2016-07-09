function Magnet(id, x, y, polarity, strength) {
	Circle.call(this, id, x, y, 10);
	this.polarity = polarity;
	this.strength = strength;
}

Magnet.inherits(Circle);

Magnet.method(function draw(ctx) {
	ctx.beginPath();
	ctx.arc(this.point.x,this.point.y,this.radius,0,2*Math.PI);
	ctx.fillStyle = 'green';
	ctx.fill();
	ctx.stroke();

});

function Magnet(id, x, y, polarity, strength) {
	Circle.call(this, id, x, y, 10);
	this.polarity = polarity;
	this.strength = strength;
	if(this.polarity == 1) {
		this.color = 'red';
	} else {
		this.color = 'blue';
	}
}

Magnet.inherits(Circle);

Magnet.method(function draw(ctx) {
	ctx.beginPath();
	ctx.arc(this.point.x,this.point.y,this.radius,0,2*Math.PI);
	ctx.fillStyle = this.color;
	ctx.fill();
	ctx.stroke();

});

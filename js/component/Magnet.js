function Magnet(x, y, polarity) {
	Circle.call(this, x, y, 10);
	this.polarity = polarity;
	this.strength = 0;
}

Magnet.inherits(Circle);

Magnet.method(function draw(ctx) {
	if(this.polarity == 1) {
		this.color = 'red';
	} else {
		this.color = 'blue';
	}
	ctx.beginPath();
	ctx.arc(this.point.x,this.point.y,this.radius,0,2*Math.PI);
	ctx.fillStyle = this.color;
	ctx.strokeStyle = 'black';
	ctx.fill();
	ctx.stroke();
});

Magnet.method(function toString(){
	return "Magnet: Polarity: " + this.polarity + ", Strength: " + this.strength;
});

Magnet.method(function togglePolarity() {
	this.polarity = this.polarity == 1 ? -1 : 1;
});

function Magnet(id, x, y, polarity, strength) {
	Circle.call(this, id, x, y, 10);
	this.polarity = polarity;
	this.strength = strength;
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
	return "Magnet: " + this.id + ", Polarity: " + this.polarity + ", Strength: " + this.strength;
});

Magnet.method(function togglePolarity() {
	this.polarity = this.polarity == 1 ? -1 : 1;
});

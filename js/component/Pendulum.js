function Pendulum(x, y, polarity, magnets, stringColor, traceColor) {
	Magnet.call(this, x, y, polarity);
	this.stringColor = stringColor;
	this.traceColor = traceColor;
	this.velocity = new Location(0, 0);;
	this.acceleration = new Location(0, 0);
	this.mass = 0;
	this.height = 0;
	this.previousLocation = new Location(this.point.x, this.point.y);
	this.enableTrace = false;
	this.physics = new Physics(this, magnets);
	this.freeze = false;
}

Pendulum.inherits(Magnet);

Pendulum.method(function draw(ctx) {

	if(this.polarity == 1) {
		this.color = 'red';
	} else {
		this.color = 'blue';
	}
		
	// Draw circle
	ctx.beginPath();
	ctx.arc(this.point.x,this.point.y,this.radius,0,2*Math.PI);
	ctx.fillStyle = this.color;
	ctx.strokeStyle = 'black';
	ctx.fill();
	ctx.stroke();
});

Pendulum.method(function drawString(ctx, centerX, centerY) {
	// Draw pendulum string
	ctx.beginPath();
	ctx.lineWidth=4;
	ctx.moveTo(centerX, centerY);
	ctx.lineTo(this.point.x, this.point.y);
	ctx.strokeStyle = this.stringColor;
	ctx.stroke();
	ctx.lineWidth=1;
});

Pendulum.method(function drawTrace(ctx) {
	if(this.enableTrace) {
		ctx.beginPath();
		ctx.strokeStyle = this.traceColor;
		ctx.moveTo(this.previousLocation.x, this.previousLocation.y);
		ctx.lineTo(this.point.x, this.point.y);
		ctx.stroke();
		
		// Update previous location
		this.previousLocation.x = this.point.x;
		this.previousLocation.y = this.point.y;
	}
});

Pendulum.method(function toString(){
	return "Pendulum: Polarity: " + this.polarity + ", Strength: " + this.strength + ", Velocity: " + this.velocity + ", Acc: " + this.acceleration + ", Mass: " + this.mass + ", Height: " + this.height;
});

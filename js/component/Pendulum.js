function Pendulum(x, y, polarity, magnets, stringColor, traceColor) {
	Magnet.call(this, x, y, polarity);
	this.stringColor = stringColor;
	this.traceColor = traceColor;
	this.velocity = new Location(0, 0);;
	this.acceleration = new Location(0, 0);
	this.mass = 0;
	this.height = 0;
	this.trace = [];
	this.traceEvery = 10;
	this.traceNow = 0;
	this.enableTrace = true;
	this.physics = new Physics(this, magnets);
	this.freeze = false;
}

Pendulum.inherits(Magnet);

Pendulum.method(function draw(ctx) {

	// Store old position
	if(++this.traceNow == this.traceEvery && this.enableTrace) {
		this.trace.push(new Location(this.point.x, this.point.y));
		this.traceNow = 0;
	}

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
	// Draw trace
	ctx.beginPath();
	for(var i=0; i < this.trace.length; i++) {
		ctx.strokeStyle = this.traceColor;
		ctx.arc(this.trace[i].x, this.trace[i].y, 0.01, 0, 2 * Math.PI, true);
	}
	ctx.stroke();
});

Pendulum.method(function toString(){
	return "Pendulum: Polarity: " + this.polarity + ", Strength: " + this.strength + ", Velocity: " + this.velocity + ", Acc: " + this.acceleration + ", Mass: " + this.mass + ", Height: " + this.height;
});

Pendulum.method(function flushTrace() {
	this.trace = [];
});

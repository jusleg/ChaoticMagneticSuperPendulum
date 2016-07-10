function Pendulum(id, x, y, polarity, vx, vy, ax, ay, mass, height, strength) {
	Magnet.call(this, id, x, y, polarity, strength);
	this.velocity = new Location(vx, vy);;
	this.acceleration = new Location(ax, ay);
	this.mass = mass;
	this.height = height;
	this.trace = [];
	this.traceEvery = 20;
	this.traceNow = 0;
}

Pendulum.inherits(Magnet);

Pendulum.method(function draw() {

	// Store old position
	if(++this.traceNow == this.traceEvery) {
		this.trace.push(new Location(this.point.x, this.point.y));
		this.traceNow = 0;
	}

	if(this.polarity == 1) {
		this.color = 'pink';
	} else {
		this.color = 'cyan';
	}

	// Draw trace
	ctx.beginPath();
	for(var i=0; i < this.trace.length; i++) {
		ctx.strokeStyle = 'orange';
		ctx.arc(this.trace[i].x, this.trace[i].y, 0.01, 0, 2 * Math.PI, true);
	}
	ctx.stroke();
	
	// Draw circle
	ctx.beginPath();
	ctx.arc(this.point.x,this.point.y,this.radius,0,2*Math.PI);
	ctx.fillStyle = this.color;
	ctx.strokeStyle = 'black';
	ctx.fill();
	ctx.stroke();

	
	
});

Pendulum.method(function toString(){
	return "Pendulum: " + this.id + ", Polarity: " + this.polarity + ", Strength: " + this.strength + ", Velocity: " + this.velocity + ", Acc: " + this.acceleration + ", Mass: " + this.mass + ", Height: " + this.height;
});

Pendulum.method(function flushTrace() {
	this.trace = [];
});

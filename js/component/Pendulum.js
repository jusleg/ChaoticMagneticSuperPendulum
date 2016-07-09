function Pendulum(id, x, y, polarity, velocity, acceleration, mass, height) {
	Magnet.call(this, id, x, y, polarity);
	this.velocity = velocity;
	this.acceleration = acceleration;
	this.mass = mass;
	this.height = height;
}

Pendulum.inherits(Magnet);


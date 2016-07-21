function Physics(pendulum, magnets) {
	Item.call(this);
	this.k_h=0;
	this.k_f=0;
	this.t=0;
	this.pendulum = pendulum;
	this.magnets = magnets;
}

Physics.method(function simulateStep(){

	//Gravity
	var F_grav = new Location(-this.k_h*(this.pendulum.point.x-canvas.centerX),-this.k_h*(this.pendulum.point.y-canvas.centerY));

	// Friction
	var F_fric = new Location(-this.k_f*this.pendulum.velocity.x, -this.k_f*this.pendulum.velocity.y);

	// Magnetic force
	var F_m_tot = new Location(0,0);
	for (var i=0; i < this.magnets.length; i++){
		var magnet = this.magnets[i];
	
		var r = Math.sqrt(Math.pow(this.pendulum.point.x - magnet.point.x ,2) + Math.pow(this.pendulum.point.y - magnet.point.y ,2) );
		var d = Math.sqrt(Math.pow(this.pendulum.height,2)+Math.pow(r,2));	// Distance between pendulum and n-th magnet

		if(this.pendulum.freeze) {
			this.pendulum.freeze = false;
			return;
		}
		
		var thresh = 1500;
		if(d < 10) {
			if(Math.sqrt(Math.pow(this.pendulum.velocity.x,2) + Math.pow(this.pendulum.velocity.y,2)) < thresh)	{
				if(this.pendulum.polarity * magnet.polarity == -1) {
					this.pendulum.point.x = magnet.point.x;
					this.pendulum.point.y = magnet.point.y;
					this.pendulum.freeze = true;
				}
			}
		}

		// Sum contribution of all magnets into the total force (2D vector addition)
		F_m_tot.x += MU * this.pendulum.polarity * magnet.polarity * Math.pow(this.pendulum.strength,2) / (4 * PI * Math.pow(d,3)) * (this.pendulum.point.x - magnet.point.x); 
		F_m_tot.y += MU * this.pendulum.polarity * magnet.polarity * Math.pow(this.pendulum.strength,2) / (4 * PI * Math.pow(d,3)) * (this.pendulum.point.y - magnet.point.y);
	}
	this.pendulum.acceleration.x = (F_grav.x + F_fric.x + F_m_tot.x) / this.pendulum.mass;
	this.pendulum.acceleration.y = (F_grav.y + F_fric.y + F_m_tot.y) / this.pendulum.mass;
	this.pendulum.velocity.x += this.pendulum.acceleration.x *DELTA_T;
	this.pendulum.velocity.y += this.pendulum.acceleration.y *DELTA_T;

	this.pendulum.point.x += this.pendulum.velocity.x*DELTA_T + 0.5*this.pendulum.acceleration.x*Math.pow(DELTA_T,2);
	this.pendulum.point.y += this.pendulum.velocity.y*DELTA_T + 0.5*this.pendulum.acceleration.y*Math.pow(DELTA_T,2);

	this.t+=DELTA_T;	// Go forward in time by one step
});


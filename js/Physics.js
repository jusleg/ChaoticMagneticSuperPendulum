
function simulateStep(){

	// Save space
	var position = pendulum.point;
	var velocity = pendulum.velocity;
	var acceleration = pendulum.acceleration;
	var h = pendulum.height;
	var polarity = pendulum.polarity;
	var strengthMagnets = pendulum.strength;
	var mass = pendulum.mass;

	//Gravity
	F_grav = new Location(-k_h*(position.x-canvasCenterX),-k_h*(position.y-canvasCenterY));

	// Friction
	F_fric = new Location(-k_f*velocity.x, -k_f*velocity.y);

	// Magnetic force
	F_m_tot = new Location(0,0);
	for (var i=0; i < magnets.length; i++){
		var magnet = magnets[i];
		var R = Math.sqrt( Math.pow(position.x-canvasCenterX, 2) + Math.pow(position.y-canvasCenterY ,2) );	// Distance between pendulum and center of the plane
		var r = Math.sqrt( Math.pow(magnet.point.x - canvasCenterX,2) + Math.pow(magnet.point.y - canvasCenterY,2) );	// Distance between n-th magnet and center of the plane
		var d = Math.sqrt(Math.pow(h,2)+Math.pow(r,2)+Math.pow(R,2));	// Distance between pendulum and n-th magnet
			
		// Sum contribution of all magnets into the total force (2D vector addition)
		F_m_tot.x += MU * polarity * magnet.polarity * Math.pow(strengthMagnets,2) / (4 * PI * Math.pow(d,2) * Math.cos(Math.atan(Math.abs(position.x-magnet.point.x)/Math.abs(position.y-magnet.point.y))));
		F_m_tot.y += MU * polarity * magnet.polarity * Math.pow(strengthMagnets,2) / (4 * PI * Math.pow(d,2) * Math.sin(Math.atan(Math.abs(position.x-magnet.point.x)/Math.abs(position.y-magnet.point.y))));
	}
	acceleration.x = (F_grav.x + F_fric.x + F_m_tot.x) / mass;
	acceleration.y = (F_grav.y + F_fric.y + F_m_tot.y) / mass;
	
	velocity.x += acceleration.x *DELTA_T;
	velocity.y += acceleration.y *DELTA_T;

	position.x += velocity.x*DELTA_T + 0.5*acceleration.x*Math.pow(DELTA_T,2);
	position.y += velocity.y*DELTA_T + 0.5*acceleration.y*Math.pow(DELTA_T,2);

	t+=DELTA_T;	// Go forward in time by one step
}

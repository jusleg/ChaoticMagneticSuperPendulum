function add(loc1, loc2, val1, val2) {
	return new Location(loc1.x*val1 + loc2.x*val2, loc1.y*val1 + loc2.y*val2);
}

var halt = false;
function simulateStep(){
	// Save space
	var position = pendulum.point;
	var velocity = pendulum.velocity;
	var acceleration = pendulum.acceleration;
	var h = pendulum.height;
	var polarity = pendulum.polarity;
	var strengthMagnets = pendulum.strength;
	var mass = pendulum.mass;

	//console.log("----------------- Simulate Step -----------------");
	//console.log(pendulum.toString());

	//Gravity
	F_grav = new Location(-k_h*(position.x-canvasCenterX),-k_h*(position.y-canvasCenterY));
	//console.log("F_grav: " + F_grav.toString());	

	// Friction
	F_fric = new Location(-k_f*velocity.x, -k_f*velocity.y);
	//console.log("F_fric: " + F_fric.toString());

	// Magnetic force
	F_m_tot = new Location(0,0);
	for (var i=0; i < magnets.length; i++){
		var magnet = magnets[i];
		//console.log(magnet.toString());
	
		var r = Math.sqrt(Math.pow(position.x - magnet.point.x ,2) + Math.pow(position.y - magnet.point.y ,2) );
		//console.log("r: " + r);
		var d = Math.sqrt(Math.pow(h,2)+Math.pow(r,2));	// Distance between pendulum and n-th magnet

		if(halt) {
			halt = false;
			return;
		}
		
		var thresh = 1500;
		if(d < 10) {
			if(Math.sqrt(Math.pow(velocity.x,2) + Math.pow(velocity.y,2)) < thresh)	{
				if(pendulum.polarity * magnet.polarity == -1) {
					position.x = magnet.point.x;
					position.y = magnet.point.y;
					halt = true;
				}
			}
		}

		//console.log("d: " + d);
	
		// Sum contribution of all magnets into the total force (2D vector addition)
		F_m_tot.x += MU * polarity * magnet.polarity * Math.pow(strengthMagnets,2) / (4 * PI * Math.pow(d,3)) * (position.x - magnet.point.x); 
		F_m_tot.y += MU * polarity * magnet.polarity * Math.pow(strengthMagnets,2) / (4 * PI * Math.pow(d,3)) * (position.y - magnet.point.y);
		//console.log("F_m_tot: " + F_m_tot.toString());
	}
	acceleration.x = (F_grav.x + F_fric.x + F_m_tot.x) / mass;
	acceleration.y = (F_grav.y + F_fric.y + F_m_tot.y) / mass;
	velocity.x += acceleration.x *DELTA_T;
	velocity.y += acceleration.y *DELTA_T;
	//console.log("Velocity: " + velocity.toString());

	position.x += velocity.x*DELTA_T + 0.5*acceleration.x*Math.pow(DELTA_T,2);
	position.y += velocity.y*DELTA_T + 0.5*acceleration.y*Math.pow(DELTA_T,2);
	//console.log("Position: " + position.toString());

	t+=DELTA_T;	// Go forward in time by one step
	//console.log("t: " + t);
	//console.log("-------------------------------------------------");
}


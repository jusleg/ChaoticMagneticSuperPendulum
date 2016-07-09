//pendulum position
var position = new Location(pendulum.point.x, pendulum.point.y);

// velocity vector
var velocity = new Location(0,0);

//acceleration vector
var acceleration = new Location(0,0);

// Gravity
var F_grav;

// Friction
var F_fric;

// Magnetic force
var F_m_tot;

var polarity; // Pendulum magnet's polarity (A/m)

//User inputs
var mass; //Pendulum mass (kg)
var strengthMagnets; // Strength of all magnets (the vary in unison) (A/m)
var height; //Height of pendulum plane above magnets plane (m)
var k_h; //Hooke law spring constant, acts as gravity (kg/s^2)
var k_f; // Friction force coefficient (kg/s)

var t; // Time (s)

// Constants
var MU=1.2566370614e-6;	// Permeability of free space (N/A^2), reference: https://en.wikipedia.org/wiki/Permeability_(electromagnetism)
var PI=Math.PI;	// Value of pi
var T_MAX = 100;	// Maximum time allowed for pendulum to stop over a magnet (s)
var delta_t=0.01;		// Value of a step forward in time (s)

function update(){

	//Gravity
	F_grav = new Location(-k_h*position.x,-k_h*position.y);

	// Friction
	F_fric = new Location(-k_f*velocity.x, -k_f*velocity.y);

	// Magnetic force
	F_m_tot = new Location(0,0);
	for each (var magnet in magnets){
		var R = sqrt( Math.pow(positionX, 2) + Math.pow(positionY ,2) );	// Distance between pendulum and center of the plane
		var r = sqrt( Math.pow(magnet.x,2) + Math.pow(magnet.y,2) );	// Distance between n-th magnet and center of the plane
		var d = sqrt(Math.pow(h,2)+Math.pow(r,2)+Math.pow(R,2));	// Distance between pendulum and n-th magnet
			
		// Sum contribution of all magnets into the total force (2D vector addition)
		F_m_tot.x += MU * polarity * magnet.polarity * Math.pow(strengthMagnets,2) / (4 * PI * Math.pow(d,2) * Math.cos(Math.atan(abs(position.x-magnet.x)/abs(position.y-magnet.y))));
		F_m_tot.y += MU * polarity * magnet.polarity * Math.pow(strengthMagnets,2) / (4 * PI * Math.pow(d,2) * Math.sin(Math.atan(abs(position.x-magnet.x)/abs(position.y-magnet.y))));
	}
	acceleration.x = (F_grav.x + F_fric.x + F_m_tot.x) / mass;
	acceleration.y = (F_grav.y + F_fric.y + F_m_tot.y) / mass;

	velocity.x = velocity.x + acceleration.x *t;
	velocity.y = velocity.y + acceleration.y *t;

	position.x = position.x + velocity.x*t + 0.5*acceleration.x*Math.pow(t,2);
	position.y = position.y + velocity.y*t + 0.5*acceleration.y*Math.pow(t,2);

	t+=delta_t;	// Go forward in time by one step
}

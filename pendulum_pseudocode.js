// Pendulum variables
var position;	// 2D vector, Position of the pendulum at all times
var velocity;	// 2D vector, Velocity of the pendulum at all times
var acceleration;	// 2D vector, Acceleration of the pendulum at all times
var polarity;		// Pendulum magnet's polarity (A/m)
var start_coord;	// 2D vector, Coordinates of the start point (from where pendulum is dropped)

// Structure of magnets object 
var position_magnet_n;	// 2D vector, Position of the n-th magnet
var polarity_magnet_n;	// int (-1 or +1), polarity of the n-th magnet. NOTE: could be included inside magnet vector to make it a 3D vector.

// Values that vary with a slider
var mass;		// Pendulum mass (kg)
var strength_magnets;	// Strength of all magnets (they vary in unison) (A/m)
var height;		// Height of pendulum plane above magnets plane (m)
var k_h;	// Hooke law spring constant, acts as gravity (kg/s^2)
var k_f;	// Friction force coefficient (kg/s)

// Other variables
var t;		// Time (s)

// Constants
var MU=1.2566370614e-6;	// Permeability of free space (N/A^2), reference: https://en.wikipedia.org/wiki/Permeability_(electromagnetism)
var PI=3.14159265359;	// Value of pi
var T_MAX = 100;	// Maximum time allowed for pendulum to stop over a magnet (s)
var delta_t=0.01;		// Value of a step forward in time (s)


//////////////////////////////////////////
//		Main Program		//
//////////////////////////////////////////

main() {
/*-------- Load a template -------*/
for ("all magnets from a template") {
	position_magnet_n = "value from template";
	polarity_magnet_n = "value from template";
}

/* We let user change values with sliders, maybe add more magnets,
 * maybe change polarities, starting position of pendulum, etc
 */

button.on_click( run() );
}


/* This is the physics simulation which starts
 * after the user clicked run
 */
run() {
	/*-------- Initialize ------*/

	// Pendulum
	position = start_coord;
	velocity = 0;


	/*-------- Start moving pendulum ------*/
	while ("pendulum didn't stop over a magnet" && t < T_MAX) {
		// Calculate each force contribution

		// Gravity (Hooke law)
		F_g = -k_h * position;

		// Friction
		F_f = -k_f * velocity;

		// Magnetic force
		var F_m_tot;	// Total magnetic force
		for ("all magnets on the plane") {
			var R = sqrt( (position.x)^2 + (position.y)^2 );	// Distance between pendulum and center of the plane
			var r = sqrt( (position_magnet_n.x)^2 + (position_magnet_n.y)^2 );	// Distance between n-th magnet and center of the plane
			var d = sqrt(h^2+r^2+R^2);	// Distance between pendulum and n-th magnet
			
			// Sum contribution of all magnets into the total force (2D vector addition)
			F_m_tot += MU * polarity * polarity_magnet_n * strength_mgnet^2 / (4 * PI * d^2);
		}
		acceleration = (F_g + F_f + F_m_tot) / mass;	// Newton's second law to get instant pendulum acceleration
		velocity = velocity + acceleration*t;	// Pendulum's velocity is modified due to acceleration
		position = position + velocity*t + 0.5*acceleration*t^2;	// Position of pendulum is modified
		
		canvas.("update pendulum s position")
		t+=delta_t;	// Go forward in time by one step
	}
}

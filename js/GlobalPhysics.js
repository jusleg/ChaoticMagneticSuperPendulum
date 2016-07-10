// Gravity
var F_grav=0;

// Friction
var F_fric=0;

// Magnetic force
var F_m_tot=0;

var k_h=0;

var k_f=0;

var t=0; // Time (s)

function updateValues() {
	console.log("---------------- Read Slider -------------------");
	k_h=document.getElementById("sliderGravity").value/10; //Hooke law spring constant, acts as gravity (kg/s^2)
	console.log("Gravity: " + k_h);
	k_f=document.getElementById("sliderFriction").value/10; // Friction force coefficient (kg/s)
	console.log("Friction: " + k_f);

	for(var i=0; i < magnets.length; i++) {
		magnets[i].strength = document.getElementById("sliderStrength").value/10*1e6;
		console.log(magnets[i].toString());
	}	
	pendulum.strength = document.getElementById("sliderStrength").value/10*1e6;
	pendulum.height = document.getElementById("sliderHeight").value/10; 
	console.log(pendulum.toString());
	console.log("-----------------------------------");
}

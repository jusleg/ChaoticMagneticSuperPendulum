// Gravity
var F_grav=0;

// Friction
var F_fric=0;

// Magnetic force
var F_m_tot=0;

var k_h=document.getElementById("sliderGravity").value/10; //Hooke law spring constant, acts as gravity (kg/s^2)
var k_f=document.getElementById("sliderFriction").value/10; // Friction force coefficient (kg/s)

var t=0; // Time (s)


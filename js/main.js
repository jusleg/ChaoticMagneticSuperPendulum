/**
 * This class should construct the components
**/

// Create canvas
var canvas = document.getElementById("canvas");
canvas.height = 500;
canvas.width = canvas.height;

// Generate canvas center
var canvasCenterX = canvas.width/2;
var canvasCenterY = canvas.height/2;

// Create Circles
map = [];
for(var i=1; i <= 5; i++) {
	map.push(new Circle("circle" + i, canvasCenterX, canvasCenterY, i*canvas.height/10));
}

// Create Parts (Magnet and Pendulum)
parts = [];
magnets = [];
var totalMagnets = 3;
var virtualRadius = 150;
for(var i=1; i <= totalMagnets; i++) {
	magnet = new Magnet("magnet" + i, -1,-1,1,document.getElementById("sliderStrength").value/10);
	magnet.point.x = canvasCenterX - virtualRadius * Math.sin((2*PI*i)/totalMagnets);
	magnet.point.y = canvasCenterY - virtualRadius * Math.cos((2*PI*i)/totalMagnets);
	parts.push(magnet);
	magnets.push(magnet);
}
pendulum = new Pendulum("pendulum", canvas.width*0.9, canvas.height*0.9, 1, 0, 0, 0, 0, 1, 0.1, document.getElementById("sliderStrength").value/10);
parts.push(pendulum);

/**
 * This class should construct the components
**/

// Create canvas
var canvas = document.getElementById("canvas");
canvas.height = 500;
canvas.style.width="80%";
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
var totalMagnets = 5;
var virtualRadius = map[2].radius;

function addMagnet(x, y) {
	magnet = new Magnet("magnet" + magnets.length, x, y,1/*polarity*/,-1/*strength*/);
	parts.push(magnet);
	magnets.push(magnet);
}

// Add magnets
function initMagnets() {
	for(var i=1; i <= totalMagnets; i++) {
		var x = canvasCenterX - virtualRadius * Math.sin((2*PI*i)/totalMagnets);
		var y = canvasCenterY - virtualRadius * Math.cos((2*PI*i)/totalMagnets);
		addMagnet(x,y);
	}
}
initMagnets();

// Add pendulum
pendulum = new Pendulum("pendulum", canvas.width*0.9, canvas.height*0.9, 1/*polarity*/, 0/*vx*/, 0/*vy*/, 0/*ax*/, 0/*ay*/, 1/*mass*/, 0.1/*height*/, -1/*strength*/);
parts.push(pendulum);

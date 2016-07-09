/**
 * This class should construct the components
**/

// Configure canvas
var canvas = document.getElementById("canvas");
canvas.height = 500;
canvas.width = canvas.height;

var canvasCenterX = canvas.width/2;
var canvasCenterY = canvas.height/2;

// Circles
map = [];
for(var i=1; i <= 5; i++) {
	map.push(new Circle("circle" + i, canvasCenterX, canvasCenterY, i*canvas.height/10));
}

// Magnets
magnets = [];
var totalMagnets = 10;
var virtualRadius = 150;
for(var i=1; i <= totalMagnets; i++) {
	magnet = new Magnet("magnet" + i, -1,-1,1);
	magnet.point.x = canvasCenterX - virtualRadius * Math.sin((2*PI*i)/totalMagnets);
	magnet.point.y = canvasCenterY - virtualRadius * Math.cos((2*PI*i)/totalMagnets);
	magnets.push(magnet);
}

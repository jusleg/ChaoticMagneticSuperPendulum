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
magnet = new Magnet("magnet", 90,90,1);

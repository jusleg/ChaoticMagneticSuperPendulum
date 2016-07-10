// Canvas variables
var selectedMagnet = undefined;
var ctx = canvas.getContext("2d");

function redraw() {
	ctx.clearRect(0,0,canvas.width, canvas.height);
	// Draw on canvas
	for(var i=0; i < map.length; i++) {
		map[i].draw(ctx);
	}

	// Draw line
	ctx.beginPath();
	ctx.lineWidth=4;
	ctx.moveTo(canvasCenterX,canvasCenterY);
	ctx.lineTo(pendulum.point.x,pendulum.point.y);
	ctx.strokeStyle = 'black';
	ctx.stroke();
	ctx.lineWidth=1;

	// Draw parts
	for(var i=0; i < parts.length; i++) {
		parts[i].draw(ctx);
	}
}

// Call update by default
redraw();

// Change magnet polarity
canvas.addEventListener("dblclick", function(e) {
	var rect = canvas.getBoundingClientRect();
	x = e.clientX - rect.left;
	y = e.clientY - rect.top;

	for(var i=0; i < magnets.length; i++) {
		if(magnets[i].contains(x,y)) {
			magnets[i].togglePolarity();
			console.log(magnets[i].id + " changed polarity to " + magnets[i].polarity);
			break;
		}
	}

	redraw();
});

// Check for canvas magnet
var onMouseDown =  function(e) {
	var rect = canvas.getBoundingClientRect();
	x = e.clientX - rect.left;
	y = e.clientY - rect.top;

	for(var i=0; i < parts.length; i++) {
		if(parts[i].contains(x,y)) {
			console.log(parts[i].id + " selected!");
			selectedMagnet = parts[i];
			break;
		}
	}
}
canvas.addEventListener("mousedown", onMouseDown);
canvas.addEventListener("touchstart", onMouseDown);

var onMouseUp = function(e) {
	if(selectedMagnet != undefined) {
		console.log(selectedMagnet.id + " released!");
		selectedMagnet = undefined;
	}
}
canvas.addEventListener("touchend", onMouseUp);
canvas.addEventListener("mouseup", onMouseUp);

var onMouseMove = function(e) {
	var rect = canvas.getBoundingClientRect();
	x = e.clientX - rect.left;
	y = e.clientY - rect.top;

	if(selectedMagnet != undefined) {
		selectedMagnet.point.x = x;
		selectedMagnet.point.y = y;
		redraw();
	}	
}
canvas.addEventListener("mousemove", onMouseMove);
canvas.addEventListener("touchmove", onMouseMove);

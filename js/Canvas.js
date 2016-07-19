// Canvas variables
var selectedMagnet = undefined;
var ctx = canvas.getContext("2d");

function redraw() {
	ctx.clearRect(0,0,canvas.width, canvas.height);
	// Draw on canvas
	for(var i=0; i < map.length; i++) {
		map[i].draw(ctx);
	}

	// Draw trace
	pendulum.drawTrace();

	// Draw parts
	for(var i=0; i < magnets.length; i++) {
		magnets[i].draw(ctx);
	}

	// Draw pendulum
	pendulum.draw(ctx);

	// Draw center line
	ctx.beginPath();
	ctx.lineWidth=4;
	ctx.moveTo(canvasCenterX,canvasCenterY);
	ctx.lineTo(pendulum.point.x,pendulum.point.y);
	ctx.strokeStyle = 'black';
	ctx.stroke();
	ctx.lineWidth=1;
}

// Call update by default
redraw();

// Correct x and y
function getRelativePoint(e, rect) {
	return new Location((e.clientX - rect.left)*(canvas.width/rect.width),(e.clientY - rect.top)*(canvas.height/rect.height));
}

// Change magnet polarity
canvas.addEventListener("dblclick", function(e) {
	var rect = canvas.getBoundingClientRect();
	point = getRelativePoint(e,rect);
	
	for(var i=0; i < magnets.length; i++) {
		if(magnets[i].contains(point.x,point.y)) {
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
	point = getRelativePoint(e,rect);
	
	for(var i=0; i < parts.length; i++) {
		if(parts[i].contains(point.x,point.y)) {
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
	point = getRelativePoint(e,rect);

	if(selectedMagnet != undefined) {
		selectedMagnet.point.x = point.x;
		selectedMagnet.point.y = point.y;
		redraw();
	}	
}
canvas.addEventListener("mousemove", onMouseMove);
canvas.addEventListener("touchmove", onMouseMove);

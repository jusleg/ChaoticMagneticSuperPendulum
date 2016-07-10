// Canvas variables
var selectedMagnet = undefined;
var ctx = canvas.getContext("2d");

function redraw() {
	ctx.clearRect(0,0,canvas.width, canvas.height);
	// Draw on canvas
	for(var i=0; i < map.length; i++) {
		map[i].draw(ctx);
	}

	// Draw parts
	for(var i=0; i < parts.length; i++) {
		parts[i].draw(ctx);
	}
}

// Call update by default
redraw();

// Check for canvas magnet
canvas.addEventListener("mousedown", function(e) {
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
});

canvas.addEventListener("mouseup", function(e) {
	if(selectedMagnet != undefined) {
		console.log(selectedMagnet.id + " released!");
		selectedMagnet = undefined;
	}
});

canvas.addEventListener("mousemove", function(e) {
	var rect = canvas.getBoundingClientRect();
	x = e.clientX - rect.left;
	y = e.clientY - rect.top;

	if(selectedMagnet != undefined) {
		selectedMagnet.point.x = x;
		selectedMagnet.point.y = y;
		redraw();
	}	
});

// Draw on canvas
var ctx = canvas.getContext("2d");
for(var i=0; i < map.length; i++) {
	map[i].draw(ctx);
}

// Draw magnets
for(var i=0; i < magnets.length; i++) {
	magnets[i].draw(ctx);
}

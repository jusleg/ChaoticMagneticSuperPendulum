startBtn = document.getElementById("start");
startBtn.addEventListener("click", function() {
	updateValues();
	setInterval(function() {
		simulateStep();
		redraw();
	}, 1000);	
});

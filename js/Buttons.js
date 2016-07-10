startBtn = document.getElementById("start");
startBtn.addEventListener("click", function() {
	updateValues();
	setInterval(function() {
		simulateStep();
		redraw();
	}, 1);	
});

switchPolarity = document.getElementById("switchPolar");
switchPolar.addEventListener("click", function() {
	pendulum.togglePolarity();
	redraw();
});

resetBtn = document.getElementById("reset");
resetBtn.addEventListener("click", function() {
	pendulum.flushTrace();
	redraw();
});

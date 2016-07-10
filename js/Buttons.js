startBtn = document.getElementById("start");
startBtn.addEventListener("click", function() {
	updateValues();
	setInterval(function() {
		simulateStep();
		redraw();
	}, 1000);	
});

switchPolarity = document.getElementById("switchPolar");
switchPolar.addEventListener("click", function() {
	pendulum.togglePolarity();
	redraw();
});

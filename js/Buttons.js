startBtn = document.getElementById("start");
startBtn.addEventListener("click", function() {
	setInterval(function() {
		simulateStep();
		redraw();
	}, 100);	
});

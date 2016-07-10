startBtn = document.getElementById("start");
startBtn.addEventListener("click", function() {
	pendulum.enableTrace = true;
	updateValues();
	setInterval(function() {
		if(!pause) {
			simulateStep();
			redraw();
		}
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

addNorth = document.getElementById("addNorth");
addNorth.addEventListener("click", function() {
	addMagnet(canvas.width*0.1, canvas.height*0.1);	
	redraw();
});

pauseBtn = document.getElementById("pause");
pauseBtn.addEventListener("click", function() {
	if(pause) {
		pauseBtn.innerHTML = "Pause";
		pause = false;	
	} else {
		pauseBtn.innerHTML = "Resume";
		pause = true;
	}
});

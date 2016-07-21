function readSliders() {

	// Update magnets
	for(var i=0; i < canvas.magnets.length; i++) {
		canvas.magnets[i].strength = document.getElementById("sliderStrength").value/10*1e6;
	}

	// Update pendulums
	for(var i=0; i < canvas.pendulums.length; i++) {
		canvas.pendulums[i].mass = document.getElementById("sliderMass").value;
		canvas.pendulums[i].strength = document.getElementById("sliderStrength").value/10*1e6;
		canvas.pendulums[i].physics.k_f=document.getElementById("sliderFriction").value/10; // Friction force coefficient (kg/s)
		canvas.pendulums[i].physics.k_h=document.getElementById("sliderGravity").value/10; //Hooke law spring constant, acts as gravity (kg/s^2)
		canvas.pendulums[i].height = document.getElementById("sliderHeight").value/10; 
	}
}

startBtn = document.getElementById("start");
startBtn.addEventListener("click", function() {

	// Read values from sliders
	readSliders();

	// If not started
	if(!canvas.started) {

		// Start...
		canvas.started = true;
		startBtn.innerHTML = "Update";

		// Enable tracing
		for(var i=0; i < canvas.pendulums.length; i++) {
			canvas.pendulums[i].enableTrace = true;
		}

		// Start the simulation
		setInterval(function() {
			if(!canvas.pause) {
				for(var i=0; i < canvas.pendulums.length; i++) {
					canvas.pendulums[i].physics.simulateStep();
					canvas.redraw();
				}
			}
		}, 1);	
	}
});

switchPolarity = document.getElementById("switchPolar");
switchPolar.addEventListener("click", function() {
	for(var i=0; i < canvas.pendulums.length; i++) {
		canvas.pendulums[i].togglePolarity();
	}
	canvas.redraw();
});

resetBtn = document.getElementById("reset");
resetBtn.addEventListener("click", function() {
	for(var i=0; i < canvas.pendulums.length; i++) {
		canvas.pendulums[i].flushTrace();
	}
	canvas.redraw();
});

addNorth = document.getElementById("addNorth");
addNorth.addEventListener("click", function() {
	canvas.addMagnet(canvas.domObj.width*0.1, canvas.domObj.height*0.1);	
	canvas.redraw();
});

pauseBtn = document.getElementById("pause");
pauseBtn.addEventListener("click", function() {
	if(canvas.pause) {
		pauseBtn.innerHTML = "Pause";
		canvas.pause = false;	
	} else {
		pauseBtn.innerHTML = "Resume";
		canvas.pause = true;
	}
});



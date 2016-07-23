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

		// Disable second pendulum modification
		addSecondPendulum.disabled = true;

		for(var i=0; i < canvas.pendulums.length; i++) {
			// Enable tracing
			canvas.pendulums[i].enableTrace = true;

			// Reset previous position
			canvas.pendulums[i].previousLocation.x = canvas.pendulums[i].point.x;
			canvas.pendulums[i].previousLocation.y = canvas.pendulums[i].point.y;
		}

		window.setInterval(function() {
			if(!canvas.pause) {
				for(var i=0; i < canvas.pendulums.length; i++) {
					canvas.pendulums[i].physics.simulateStep();
				}
			}
		}, 1);
	}
});

resetBtn = document.getElementById("reset");
resetBtn.addEventListener("click", function() {
	canvas.flushTrace();
});

addNorth = document.getElementById("addNorth");
addNorth.addEventListener("click", function() {
	canvas.addMagnet(canvas.domObj.width*0.1, canvas.domObj.height*0.1);	
	canvas.renderMagnets();
});

addSecondPendulum = document.getElementById("pendulumNum");
addSecondPendulum.disabled = false; // Force option (solution for browser caching)
addSecondPendulum.addEventListener("click", function() {
	canvas.toggleSecondPendulum();
	if(canvas.pendulums.length == 1) {
		addSecondPendulum.innerHTML = "Add Second Pendulum";
	} else {
		addSecondPendulum.innerHTML = "Remove Second Pendulum";
	}
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



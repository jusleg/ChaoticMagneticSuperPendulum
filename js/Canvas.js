function Canvas(domObj) {
	Item.call(this);
	this.domObj = domObj;
	this.ctx = this.domObj.getContext("2d");
	
	// Configure canvas
	this.domObj.height = 500;
	this.domObj.width = this.domObj.height;
	this.centerX = this.domObj.width/2;
	this.centerY = this.domObj.height/2;
	this.totalCircles = 5;
	this.totalMagnets = 5;
	this.magnetsPosition = 2;
	this.defaultPolarity = 1;
	this.pause = false;
	this.started = false;

	// Declare Components
	this.circles = [];
	this.magnets = [];
	this.pendulums = [];
	this.selectedItem = undefined;

	// Init components
	this.initCircles();
	this.initMagnets();
	this.initPendulums();

	// Initial listeners
	this.initListeners();

	// Create more canvases
	this.circlesCanvas = document.createElement('canvas');
	this.circlesCanvas.width = this.domObj.width;
	this.circlesCanvas.height = this.domObj.height;
	this.circlesCanvasCtx = this.circlesCanvas.getContext("2d");
	this.magnetsCanvas = document.createElement('canvas');
	this.magnetsCanvas.width = this.domObj.width;
	this.magnetsCanvas.height = this.domObj.height;
	this.magnetsCanvasCtx = this.magnetsCanvas.getContext("2d");

	// Pre-render canvas (optimization)
	this.renderCircles();
	this.renderMagnets();
}

Canvas.inherits(Item);

Canvas.method(function redraw() {
	var that = this;

	return function() {
		// Clear canvas
		that.ctx.clearRect(0,0,that.domObj.width, that.domObj.height);

		// Draw circles
		that.ctx.drawImage(that.circlesCanvas, 0, 0);
		
		// Draw trace
		for(var i=0; i < that.pendulums.length; i++) {
			that.pendulums[i].drawTrace(that.ctx);
		}

		// Draw magnets
		that.ctx.drawImage(that.magnetsCanvas, 0, 0);

		// Draw pendulums
		for(var i=0; i < that.pendulums.length; i++) {
			that.pendulums[i].draw(that.ctx);
			that.pendulums[i].drawString(that.ctx, that.centerX, that.centerY);
		}

		window.requestAnimationFrame(that.redraw());
	}
});

Canvas.method(function initMagnets() {
	this.magnets.length = 0;
	for(var i=1; i<=this.totalMagnets; i++) {
		var x = this.centerX - this.circles[this.magnetsPosition].radius * Math.sin((2*Math.PI*i)/this.totalMagnets);
		var y = this.centerY - this.circles[this.magnetsPosition].radius * Math.cos((2*Math.PI*i)/this.totalMagnets);
		this.addMagnet(x,y);
	}		
});

Canvas.method(function addMagnet(x,y) {
	this.magnets.push(new Magnet(x, y, this.defaultPolarity));	
});

Canvas.method(function initPendulums() {
	this.pendulums = [];
	this.pendulums.push(new Pendulum(this.domObj.width*0.9, this.domObj.height*0.9, this.defaultPolarity, this.magnets, '#962D3E', '#962D3E'));
	this.pendulums.push(new Pendulum(this.domObj.width*0.1, this.domObj.height*0.9, this.defaultPolarity, this.magnets, '#348899', '#348899'));
});

Canvas.method(function initCircles() {
	this.circles = [];
	for(var i=1; i <= this.totalCircles; i++) {
		this.circles.push(new Circle(this.centerX, this.centerY, i*this.domObj.height/10));
	}
});

Canvas.method(function renderCircles() {
	this.circlesCanvasCtx.clearRect(0,0,this.domObj.width, this.domObj.height);
	for(var i=0; i < this.circles.length; i++) {
		this.circles[i].draw(this.circlesCanvasCtx);
	}
});

Canvas.method(function renderMagnets() {
	this.magnetsCanvasCtx.clearRect(0,0,this.domObj.width, this.domObj.height);
	for(var i=0; i < this.magnets.length; i++) {
		this.magnets[i].draw(this.magnetsCanvasCtx);
	}
});

Canvas.method(function initListeners() {
	var that = this;

	this.domObj.addEventListener("dblclick", function(e) {
		var rect = that.domObj.getBoundingClientRect();
		point = that.getRelativePoint(e,rect);
		for(var i=0; i < that.magnets.length; i++) {
			if(that.magnets[i].contains(point.x,point.y)) {
				that.magnets[i].togglePolarity();
				break;
			}
		}
	});

	this.domObj.addEventListener("mousedown", function(e) {
		var rect = that.domObj.getBoundingClientRect();
		point = that.getRelativePoint(e,rect);
		var parts = that.magnets.concat(that.pendulums);
		for(var i=0; i < parts.length; i++) {
			if(parts[i].contains(point.x,point.y)) {
				that.selectedItem = parts[i];
				break;
			}
		}
	});

	this.domObj.addEventListener("mouseup", function(e) {
		if(that.selectedItem != undefined) {
			that.selectedItem = undefined;
		}
	});

	this.domObj.addEventListener("mousemove", function(e) {
		if(that.selectedItem != undefined) {
			var rect = that.domObj.getBoundingClientRect();
			point = that.getRelativePoint(e,rect);
			that.selectedItem.point.x = point.x;
			that.selectedItem.point.y = point.y;
			that.renderMagnets();
		}
	});
});

Canvas.method(function getRelativePoint(e, rect) {
        return new Location((e.clientX - rect.left)*(this.domObj.width/rect.width),(e.clientY - rect.top)*(this.domObj.height/rect.height));
});


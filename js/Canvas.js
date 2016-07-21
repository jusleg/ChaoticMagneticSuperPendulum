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
}

Canvas.inherits(Item);

Canvas.method(function redraw() {
	
	// Clear canvas
	this.ctx.clearRect(0,0,this.domObj.width, this.domObj.height);
	
	// Draw circles
	for(var i=0; i < this.circles.length; i++) {
		this.circles[i].draw(this.ctx);
	}

	// Draw trace
	for(var i=0; i < this.pendulums.length; i++) {
		this.pendulums[i].drawTrace(this.ctx);
	}

	// Draw magnets
	for(var i=0; i < this.magnets.length; i++) {
		this.magnets[i].draw(this.ctx);
	}

	// Draw pendulums
	for(var i=0; i < this.pendulums.length; i++) {
		this.pendulums[i].draw(this.ctx);
		this.pendulums[i].drawString(this.ctx, this.centerX, this.centerY);
	}
});

Canvas.method(function initMagnets() {
	this.magnets = [];
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
		that.redraw();
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
		var rect = that.domObj.getBoundingClientRect();
		point = that.getRelativePoint(e,rect);
		if(that.selectedItem != undefined) {
			that.selectedItem.point.x = point.x;
			that.selectedItem.point.y = point.y;
			that.redraw();
		}
	});
});

Canvas.method(function getRelativePoint(e, rect) {
        return new Location((e.clientX - rect.left)*(this.domObj.width/rect.width),(e.clientY - rect.top)*(this.domObj.height/rect.height));
});


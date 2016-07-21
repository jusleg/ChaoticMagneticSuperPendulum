function Circle(x, y, radius) {
	Item.call(this);
	this.point = new Location(x, y);
	this.radius = radius;
}

Circle.inherits(Item);

Circle.method(function draw(ctx){
	ctx.beginPath();
	ctx.strokeStyle = 'lightgray';
	ctx.arc(this.point.x,this.point.y,this.radius,0,2*Math.PI);
	ctx.stroke();
});

Circle.method(function move(x, y) {
	this.x = x;
	this.y = y;
});

Circle.method(function contains(x, y) {
	return Math.pow(x - this.point.x, 2) + Math.pow(y - this.point.y, 2) <= Math.pow(this.radius, 2);
});

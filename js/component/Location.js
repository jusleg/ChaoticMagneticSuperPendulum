function Location(x, y) {
	Item.call(this);
	this.x = x;
	this.y = y;
}

Location.inherits(Item);

Location.method(function toString() {
	return this.x + " : " + this.y;
});

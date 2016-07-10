function Location(x, y) {
	Item.call(this);
	this.x = x;
	this.y = y;
}

Location.inherits(Item);

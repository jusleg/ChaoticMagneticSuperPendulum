function Location(id, x, y) {
	Item.call(this, id);
	this.x = x;
	this.y = y;
}

Location.inherits(Item);


function Magnet(id, x, y, polarity, strength) {
	Item.call(this, id);
	this.polarity = polarity;
	this.point = new Location(id + "_point", x, y);
	this.strength = strength;
}

Magnet.inherits(Item);

Magnet.method(function hello() {
	console.log("Hello world");
});

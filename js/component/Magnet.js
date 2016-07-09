function Magnet(id) {
	Item.call(this, id);
}

Magnet.inherits(Item);

Magnet.method(function hello() {
	console.log("Hello world");
});

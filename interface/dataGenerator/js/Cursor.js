class Cursor {
	static show(x, y) {
		let cursor = new Bubble(x, y);
		cursor.show("", [0, 255, 0, 0]);
	}
}

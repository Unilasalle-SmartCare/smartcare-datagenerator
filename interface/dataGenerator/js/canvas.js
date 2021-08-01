let manager = new PathManager();
function setup() {
	c = createCanvas(602, 369);
	c.parent("canvaswrapper");
	c.doubleClicked(onDoubleClick);

	img = loadImage("img/fundo.jpg");
}

function draw() {
	background(img);

	manager.show(appVue.date);
}

function onDoubleClick() {
	manager.add(appVue.date, new Bubble(mouseX, mouseY));
}

$(document).on("keydown", function (e) {
	if (e.ctrlKey && e.which === 83) {
		manager.save();
	}
	event.preventDefault();
});

let manager = new PathManager();
let forcedDate = null;

function createUploadInputs() {
	inputJson = createFileInput(load);
	inputJson.id("fileInputJson");
	inputJson.addClass("inputfile");
	inputJson.parent("jsonWrapper");

	inputFundo = createFileInput(loadBackground);
	inputFundo.id("fileInputBg");
	inputFundo.addClass("inputfileb");
	inputFundo.parent("bgWrapper");
}

function setup() {
	c = createCanvas(602, 369);
	c.parent("canvaswrapper");
	c.doubleClicked(onDoubleClick);
	createUploadInputs();

	img = loadImage("img/fundo.jpg");
}

function draw() {
	if (!forcedDate) {
		background(img);

		manager.show(appVue.date);
	} else {
		background(0);
		manager.show(forcedDate);
	}
	Cursor.show(mouseX, mouseY);
}

function onDoubleClick() {
	manager.add(appVue.date, new Bubble(mouseX, mouseY));
}

function load(file) {
	manager = StorageManager.load(file);
	appVue.showStepDialog = true;
	manager.updateStatistics();
	appVue.$forceUpdate();
	redraw();
}

function loadBackground(file) {
	img = StorageManager.handleImage(file);
}

$(document).on("keydown", function (e) {
	if (e.ctrlKey && e.which === 83) {
		manager.save();
	}
	event.preventDefault();
});

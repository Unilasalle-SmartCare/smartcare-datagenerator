class PathManager {
	constructor() {
		this.paths = {};
	}

	show(date) {
		let currentPath = this.paths[date];
		if (currentPath) {
			currentPath.show();
		}
	}

	add(date, bubble) {
		if (!this.paths[date]) {
			this.paths[date] = new Path();
		}
		this.paths[date].append(bubble);
	}

	toArray(date = null) {
		if (date) {
			this.toArraySpecific(date);
			return;
		}
		let paths = [];
		for (const [date, path] of Object.entries(this.paths)) {
			let currentPath = path.toArray(date);
			paths = paths.concat(currentPath);
		}
		return paths;
	}

	toArraySpecific(date) {
		let path = this.paths[date].toArray(date);
		return path;
	}

	save() {
		let json = JSON.stringify(this.toArray());
		saveJSON(json, "dataset");
	}
}

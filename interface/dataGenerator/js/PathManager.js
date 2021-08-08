class PathManager {
	constructor() {
		this.paths = {};
		this.statistics = new GlobalStatisticCalculator();
	}

	updateStatistics() {
		this.statistics = new GlobalStatisticCalculator();
		for (const [date, path] of Object.entries(this.paths)) {
			this.statistics.import(path.statistics);
		}
		appVue.$forceUpdate();
	}

	show(date) {
		let currentPath = this.paths[date];
		if (currentPath) {
			currentPath.show();
			this.updateStatistics();
		}
	}

	add(date, bubble, wandering = null) {
		if (!this.paths[date]) {
			this.paths[date] = new Path();
			if (wandering) {
				this.paths[date].wandering = wandering;
			}
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
		StorageManager.save(this.toArray());
	}

	load() {}

	update(date) {
		if (this.paths[date]) this.paths[date].update();
	}
}

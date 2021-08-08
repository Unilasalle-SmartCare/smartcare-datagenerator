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

	getCurrent(date) {
		return this.paths[date];
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

	incrementDate(currentDate, minuteStep) {
		let newDate = moment(currentDate, "DD/MM/YYYY HH:mm").add(
			minuteStep,
			"minutes"
		);

		return newDate.format("DD/MM/YYYY HH:mm");
	}

	dividePaths(minuteStep) {
		try {
			for (const [date, path] of Object.entries(this.paths)) {
				let newDate = this.incrementDate(date, minuteStep);
				let newPathList = path.divideSelf();

				if (!newPathList) {
					continue;
				}
				let newPath = new Path();
				newPath.bubbleList = newPathList;
				newPath.wandering = path.wandering;
				newPath.update(false);

				this.paths[newDate] = newPath;
			}
		} catch (error) {
			console.log("ERROR", date, path);
		}
	}

	convert(factor) {
		for (let index = 0; index < factor / 2; index++) {
			this.dividePaths(60 / factor);
		}
		this.updateStatistics();
	}

	update(date) {
		if (this.paths[date]) this.paths[date].update();
	}
}

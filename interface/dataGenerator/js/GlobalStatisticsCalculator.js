class GlobalStatisticCalculator extends StatisticCalculator {
	constructor() {
		super();
		this.totalPaths = 0;
		this.totalWanderPaths = 0;
		this.totalNormalPaths = 0;
		this.averagePoints = 0;
		this.minPoints = Number.MAX_SAFE_INTEGER;
		this.maxPoints = Number.MIN_SAFE_INTEGER;
	}

	calculateGlobal(stats) {
		const isHourWandering = stats.isHourWandering();
		this.totalPaths += 1;
		if (!isHourWandering) {
			this.totalNormalPaths += 1;
		} else {
			this.totalWanderPaths += 1;
		}
		this.averagePoints = this.totalPoints / this.totalPaths;
	}

	calculateMinMax(quantity) {
		if (quantity > this.maxPoints) this.maxPoints = quantity;
		if (quantity < this.minPoints) this.minPoints = quantity;
	}

	import(stats) {
		this.calculateMinMax(stats.totalPoints);
		this.totalPoints += stats.totalPoints;
		this.stressPoints += stats.stressPoints;
		this.normalPoints += stats.normalPoints;
		this.calculateGlobal(stats);
	}
}

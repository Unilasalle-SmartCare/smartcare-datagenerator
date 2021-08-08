class StatisticCalculator {
	constructor() {
		this.totalPoints = 0;
		this.stressPoints = 0;
		this.normalPoints = 0;
	}

	isHourWandering() {
		return this.stressPoints > 0;
	}

	calculate(isWandering) {
		this.totalPoints += 1;
		if (!isWandering) {
			this.normalPoints += 1;
			return;
		}
		this.stressPoints += 1;
	}
}

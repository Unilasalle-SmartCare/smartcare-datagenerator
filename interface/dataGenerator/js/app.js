Vue.use(VueMaterial.default);
appVue = new Vue({
	el: "#appVue",
	data: {
		wandering: false,
		currentDate: null,
		step: 30,
		showStepDialog: false,
		willConvert: false,
		convertTargetStep: null,
	},
	mounted() {
		this.initializeDate();
	},
	methods: {
		loadPath() {
			$("#fileInputJson").click();
		},
		loadBackground() {
			$("#fileInputBg").click();
		},
		save() {
			if (typeof manager !== "undefined") manager.save();
		},
		updatePath() {
			if (typeof manager !== "undefined") manager.update(this.date);
		},
		initializeDate() {
			let now = luxon.DateTime.local();
			now = now.set({
				minutes: 0,
			});
			this.currentDate = now.toISO();
		},
		getDatas() {
			if (typeof manager !== "undefined")
				return Object.keys(manager.paths).filter((e) => e !== this.date);
			return [];
		},
		formattedDateToISO(date) {
			return moment(date, "DD/MM/YYYY HH:mm").toISOString();
		},
		getStats() {
			if (typeof manager !== "undefined") return manager.statistics;
			return new GlobalStatisticCalculator();
		},
		getCurrentStats() {
			if (typeof manager !== "undefined")
				return (
					manager.getCurrent(this.date)?.statistics || new StatisticCalculator()
				);
			return new StatisticCalculator();
		},
		convertPath() {
			if (this.willConvert) {
				let factor = this.step / this.convertTargetStep;
				manager.convert(factor);
				this.showStepDialog = false;
				this.step = 30;
				this.convertTargetStep = null;
				this.willConvert = false;
			}
		},
	},
	computed: {
		date() {
			return moment(this.currentDate).format("DD/MM/YYYY HH:mm");
		},
	},
});

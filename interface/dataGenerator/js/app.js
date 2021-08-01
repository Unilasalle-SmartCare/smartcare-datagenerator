Vue.use(VueMaterial.default);
appVue = new Vue({
	el: "#appVue",
	data: {
		wandering: false,
		currentDate: null,
		step: 30,
		teste: 0,
	},
	mounted() {
		this.currentDate = moment();
	},
	methods: {},
	computed: {
		date() {
			return moment(this.currentDate).format("DD/MM/YYYY HH:mm");
		},
	},
});

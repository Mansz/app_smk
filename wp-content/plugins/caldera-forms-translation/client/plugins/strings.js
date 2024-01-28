const stringsPlugin = {
	install(Vue, options) {
		Vue.mixin({
			computed: {
				strings (){
					return this.$store.getters.strings
				}
			}
		});
	}
};

export default stringsPlugin;
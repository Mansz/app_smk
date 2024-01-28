import Vue from 'vue'
import SettingsView from  './views/Settings.vue';
import store from  './store/index';
import Promise from 'promise-polyfill';

/** State Plugins **/
import StatePlugin from './plugins/state';
Vue.use(StatePlugin);
import StringsPlugin from './plugins/strings';
Vue.use(StringsPlugin);

/** Tabs Plugin **/
import {Tabs, Tab} from 'vue-tabs-component';

Vue.component('tabs', Tabs);
Vue.component('tab', Tab);

//Remove nags from DOM
[ 'update-nag', 'notice' ].forEach( className => {
	let elements = document.getElementsByClassName(className);
	while(elements.length > 0){
		elements[0].parentNode.removeChild(elements[0]);
	}
});


const mainSettingsApp = new Vue({
	el: '#cf-translate-app',
	store,
	components: {
		'settings': SettingsView
	},
	render(h) {
		return h(
			'div',
			{
				attrs: {
					id: 'cf-translate'
				}
			},
			[
				h( 'settings' )
			]
		)
	}

});

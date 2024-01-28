import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);


const STATE = {
	field: {},
	fields: {},
	form: {
		ID: 0
	},
	language: '',
	strings: CF_TRANS_ADMIN.strings
};


const PLUGINS = [

];

import { MUTATIONS } from './mutations';
import { ACTIONS } from './actions';
import  { GETTERS } from './getters';

Object.getOwnPropertyNames(GETTERS).forEach( (index) => {
  STATE[index] = CF_TRANS_ADMIN.hasOwnProperty(index) ? CF_TRANS_ADMIN[index] : null;
});

STATE.showChooser = true;


const store =  new Vuex.Store({
  strict: false,
  plugins: [],
  modules: {},
  state: STATE,
  getters: GETTERS,
  mutations: MUTATIONS,
  actions: ACTIONS
});



export default store;

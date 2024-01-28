import { createStatePlugin } from "vue-app-state";

const stateComputes = {
	twoWay: [
		'foo',
		'fieldId',
		'language',
		'forms',
		'saving',
		'showAddLanguage',
		'languages',
		'showLanguageChoice',
		'formLanguages',
		'showChooser',
		'formInfo'
	],
	oneWay: [
		'field'
	],
	dispatching: [
		'form',
	]
};


const statePlugin = createStatePlugin(stateComputes);
export default statePlugin;
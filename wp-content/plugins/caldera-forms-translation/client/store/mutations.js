const maybeSetField = function (state) {
	return state.fieldId && state.language ? state.form.fields[state.language][state.fieldId] : {};
};

export const MUTATIONS = {
	form(state,value){
		if( 'string' === typeof  value ){
			value = {
				ID: value
			};
		}
		if( state.form.ID !== value.ID ){
			state.language = '';
			state.fieldId = '';
			state.field = {};
		}

		state.form = Object.assign(state.form,value);
		if( state.form.hasOwnProperty( 'languages_named' ) ){
			state.formLanguages = state.form.languages_named;
		}else{
			state.formLanguages = {};
		}

		state.formName = state.form.name;
	},
	formName( state,value ) { state.formName = value },
	formLanguages(state,value ){ state.formLanguages = value },
	language(state,value){
		state.language = value;
		state.field = {};
		state.fieldId = '';
		state.fields = state.form.fields[state.language];
	},
	fieldId(state, value){
		state.fieldId = value;
		state.field = state.fieldId && state.language ? state.form.fields[state.language][state.fieldId] : {};

	},
	fieldValue(state,value){
		state.field = value;
		state.form.fields[state.language][state.fieldId] = value;

	},
	fieldOpt(state,opt){
		state.field.option[opt.opt] = opt.value;
		state.form.fields[state.language][state.fieldId] = state.field;

	},
	showFormChoice(state){
		if( null === state.showFormChoice ){
			state.showFormChoice = true;

		}else{
			state.showFormChoice = ! state.showFormChoice;
		}
	},
	showAddLanguage(state,value){
		if( null === state.showAddLanguage ){
			state.showAddLanguage = false;

		}

		if( undefined == value ){
			state.showAddLanguage = ! state.showAddLanguage;
		}else{
			state.showAddLanguage = value;
		}
	},
	showLanguageChoice(state,value){
		if( null === state.showLanguageChoice ){
			state.showLanguageChoice = false;
		}

		if( undefined == value ){
			state.showLanguageChoice = ! state.showLanguageChoice;
		}else{
			state.showLanguageChoice = value;
		}
	},
	saving(state){
		if( null === state.saving ){
			state.saving = true;

		}else{
			state.saving = ! state.saving;
		}
	},
	isSaving(state){
		state.saving = true;
	},
	notSaving(state){
		state.saving = false;
	},
	showChooser(state,value){
		state.showChooser = value;
	},
	formInfo( state,value){
		state.form.info[state.language] = value;
	},
	foo(state, value ){
		state.foo = value;
	}

};




import axios from 'axios';
import Promise from '../promise-polyfill';
const timeout = 30000;

const localAPI  = axios.create({
	baseURL: CF_TRANS_ADMIN.data.api.root,
	timeout: timeout,
	headers: {'X-WP-Nonce': CF_TRANS_ADMIN.data.rest_nonce}
});



var _forms = {};
var saveForm = function (ID, r, context) {
	_forms[ID] = r.data.form;
	context.commit( 'formName', r.data.form.name );
	context.commit('form', r.data.form);
};
export const ACTIONS = {
	addLanguage(context, payload ){
		return localAPI.post('/language', {
			form_id: payload.form,
			language: payload.language

		})
			.then(r =>  {
				return saveForm(payload.form, r, context);
			})
			.catch( error => {
				return error;
			});
	},
	form(context, ID){
		if( ! _forms.hasOwnProperty(ID) ){
			localAPI.get('/form', {
				params: {
					form_id: ID
				}
			})
			.then(r =>  {
				context.commit('notSaving', false );
				saveForm(ID, r, context);
			})
			.catch( error => {
				console.log(error);
			});

		}else{
			context.commit( 'form', _forms[ID] );
		}

	},
	save (context) {
		var data = {
			form_id: context.getters.formId,
			language: context.getters.language,
			fields: context.getters.fields,
			form_info: context.getters.formInfo
		};
		return localAPI.post('/', data)
			.then(r =>  {
				console.log(r.data );
			})
			.catch( error => {
				return error;
			});
	}
};

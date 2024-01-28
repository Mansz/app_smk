export default function (state, languge, ID) {
	if (!state.form.fields.hasOwnProperty(value.ID)) {
		state.form.fields[ID] = {};
	}
	if (!state.form.fields[ID].hasOwnProperty('languages')) {
		state.form.fields[ID].languages = {};
	}
	return state;
};


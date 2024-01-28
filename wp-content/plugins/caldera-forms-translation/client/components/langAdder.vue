<template>

    <div>
            <div class="caldera-config-group">
            <label for="cf-translations-languages">
                {{strings.add_lang}}
            </label>
            <div class="caldera-config-field">
                <select
                        class="block-input"
                        v-model="langToAdd"
                        id="cf-translations-languages"
                >
                    <option></option>
                    <option
                            v-for="language in languages"
                            v-bind:value="language.code"
                    >
                        {{language.name}}
                    </option>
                </select>
            </div>
        </div>
        <div class="caldera-config-group" v-if="'false' != langToAdd">
            <button @click="addLang" class="button">
                {{strings.add_lang_q}}
            </button>
        </div>
    </div>

</template>

<script>
	export default {
        data(){
			return{
				langToAdd: 'false'
            }
        },
		methods: {
			addLang(ev){
				this.$store.dispatch( 'addLanguage', {
					language: this.langToAdd,
					form: this.form.ID
				}).then( r => {
					this.$store.commit( 'showAddLanguage' );
					this.formLanguages = this.form.languages_named;
					this.$store.commit( 'language', this.langToAdd );
					this.langToAdd = 'false';
				})
			},
		}
	}
</script>

<style scoped>

</style>
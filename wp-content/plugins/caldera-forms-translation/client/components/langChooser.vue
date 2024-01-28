<template>

	<div>

		<div
			class="caldera-config-group"
		>
			<label for="cf-translations-language">
				{{strings.choose_lang}}
			</label>
			<div class="caldera-config-field">
				<select
					class="block-input"
					id="cf-translations-language"
					v-model="language"
					@change="languageSelected"
				>
					<option></option>
					<option
						v-for="language in formLanguages"
						v-bind:value="language.code"
					>
						{{language.name}}
					</option>
				</select>
			</div>
		</div>

	</div>


</template>
<script>
	export default{
		watch: {
			language(val){
				this.$store.commit( 'showLanguageChoice' );
			}
		},
		methods: {

			languageSelected(){
				this.$store.commit( 'showAddLanguage', false );
			}
		}
	}
</script>
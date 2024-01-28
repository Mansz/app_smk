<template>

	<div>
		<div class="cf-translate-left">
			<div class="caldera-config-group">
				<label for="cf-translations-label">
					{{strings.field_label}}
				</label>
				<div class="caldera-config-field">
					<input
						id="cf-translations-label"
						v-model="field.label"
					>
				</div>
			</div>

			<div class="caldera-config-group">
				<label for="cf-translations-description">
					{{strings.field_description}}
				</label>
				<div class="caldera-config-field">
					<input
						id="cf-translations-description"
						v-model="field.caption"
					>
				</div>
			</div>

			<div class="caldera-config-group">
				<label for="cf-translations-theDefault">
					{{strings.field_default}}
				</label>
				<div class="caldera-config-field">
					<input
						id="cf-translations-theDefault"
						v-model="field.default"
					/>
				</div>
			</div>
		</div>
		<div class="cf-translate-right">

			<fieldset v-if="hasOptions">
				<legend>
					{{strings.field_options}}
				</legend>
				<div
					v-if="hasOptions"
					v-for="(label, opt ) in field.option"
				>

					<div class="caldera-config-group">
						<label
							v-bind:for="'cf-translations-' + opt"
							class="screen-reader-text"
						>
							{{strings.field_option}} {{opt}}
						</label>
						<div class="caldera-config-field">
							<option-input
								:opt="opt"
								:field="field"
								:value="label"
							></option-input>
						</div>
					</div>
				</div>
			</fieldset>


		</div>
	</div>


</template>
<script>
	import optionTranslateInput from './optionTranslateInput';
	export default{
		components:{
			'option-input' : optionTranslateInput
		},
		computed: {
			hasOptions(){
				return null !== this.$store.getters.field.option;
			},
		}

	}
</script>
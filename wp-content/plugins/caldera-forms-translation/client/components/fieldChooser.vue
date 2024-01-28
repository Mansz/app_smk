<template>

	<div>

		<div class="caldera-config-group">
			<label for="cf-translations-field">
				{{strings.choose_field}}
			</label>
			<div class="caldera-config-field">
				<select
						id="cf-translations-field"
						v-model="fieldId"
						class="block-input"
				>
					<option></option>
					<option
							v-for="_field in fields"
							v-bind:value="_field.ID"
					>
						{{_field.label}}
					</option>
				</select>
			</div>
		</div>

	</div>

</template>
<script>
	export default{
		computed: {
			fields() { return this.$store.state.fields;},
		}
	}
</script>
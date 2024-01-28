<template>
	<div>
		<div
			class="caldera-config-group"
		>
			<label for="cf-translations-form">
				{{strings.choose_form}}
			</label>
			<div class="caldera-config-field">
				<select
					class="block-input"
					id="cf-translations-form"
					v-model="form"
					@change="change"
				>
					<option></option>
					<option
						v-for="form in forms"
						v-bind:value="form.ID"

					>
						{{form.name}}
					</option>
				</select>
			</div>
		</div>

	</div>

</template>
<script>

	export default{
		methods:{
			change(){
				this.$store.commit( 'showAddLanguage' );
				this.$store.commit( 'showLanguageChoice', true );
				this.$store.commit( 'showChooser', false );
			}
		}

	}
</script>
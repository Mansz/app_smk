<template>
    <div>

        <div class="caldera-config-group">
            <label for="cf-translations-success_message">
                {{strings.success_message}}
            </label>

            <div class="caldera-config-field">
                <input
                    type="text"
                    id="cf-translations-success_message"
                    v-model="formInfo.success"
                />
            </div>

        </div>

    </div>
</template>

<script>
    export default {
		computed: {
			formInfo: {
				get(){
					return this.$store.getters.formInfo;
				},
                set(value){
					this.formInfo[success] = value;
					this.store.dispatch( 'formInfo', this.formInfo )
                }
			}
		}
    }

</script>

<style scoped>

</style>
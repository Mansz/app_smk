<template>

    <div>
        <success-setting
                v-if="language"
        ></success-setting>

        <form
            v-on:submit="save()"
        >

            <input
                type="submit"
                value="Save"
            />
        </form>
    </div>

</template>

<script>
    import successSetting from  '../components/successSetting';
	export default {
        components: {
        	'success-setting': successSetting
        },
        methods: {
        	save(){
        		this.$store.dispatch( 'save' )
            }
        }
	}
</script>

<style scoped>

</style>
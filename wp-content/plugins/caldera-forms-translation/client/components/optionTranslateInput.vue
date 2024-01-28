<template>
	<div>
		<input
			v-bind:id="'cf-translations-' + opt"
			type="text"
			:value="value"
			class="block-input"
			@input="changed"
		/>
	</div>
</template>
<script>
	export default{
		props: ['opt', 'value'],
		methods : {
			changed(ev){
				this.$store.commit( 'fieldOpt', {opt:this.opt,value:ev.target.value})
			}
		}
	}
</script>
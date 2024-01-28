<template>
    <div>
        <button
                style="display: inline"
                class="button button-primary cf-translate-button"
                id="cf-translate-save-button"
                @click="save"
                v-html="saveText"
        >

        </button>

        <p
                style="display: inline"
                class="cf-translate-info-block description"
        >
            {{message}}
        </p>


    </div>
</template>

<script>
	export default {
		computed: {
			saveText(){
				return this.$store.getters.saving ? 'Saving' : 'Save';
			},
            message:{
				get(){
					console.log( this.$store.getters.form.name );

					let name = this.$store.getters.form.name;
					if( name ){
						return this.$store.getters.strings.you_are_trans + ' ' + name;
					}
					return '';
                }
            }
 		},
		methods:{
			save(){
				this.$store.dispatch( 'save' ).then( r => {
					this.$store.commit( 'saving' );
					this.$store.commit( 'showAddLanguage' );
					this.$store.commit( 'showLanguageChoice', true );
				});
			},
			addButtonClick(){
				this.$store.commit( 'showAddLanguage' );
			}
        }
	}
</script>


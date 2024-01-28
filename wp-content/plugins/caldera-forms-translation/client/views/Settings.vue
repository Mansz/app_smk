<template>
		<div id="cf-translate-settings">

			<div id="cf-translate-setting-inner">
				<div class="caldera-editor-header">
					<ul class="caldera-editor-header-nav">
						<li class="caldera-editor-logo">
							<span class="caldera-forms-name">
								Caldera Forms Translate
							</span>
						</li>

					</ul>
				</div>
			</div>
			<div class="caldera-editor-body">
				<form-chooser
					v-if="showChooser"
				>
				</form-chooser>
				<form-saver
					v-if="! showChooser">
				</form-saver>

				<div v-bind:style="{ minHeight: '42px' }">
					<lang-chooser
						v-if="form.ID && showLanguageChoice"
                    >
				    </lang-chooser>
                    <p
						class="cf-translate-info-block description"
                        v-if="form.ID && ! showLanguageChoice"
                        v-bind:style="{ display: 'inline' }"

                    >
                        {{strings.current_language}} : {{language}}
                    </p>
                </div>

				<div v-if="form.ID">
					<tabs>
						<tab name="Fields">
							<div
								v-if="! saving"
								class=""
							>
								<field-chooser
									v-if="language"
								>
								</field-chooser>
								<div v-else>
									{{strings.select_language}}
								</div>
							</div>

							<div class="">
								<div v-if="! saving">
									<field-translate
										v-if="fieldId"
									>
									</field-translate>
									<div v-else>
										<span v-if="language">
											{{strings.select_field}}
										</span>
									</div>
								</div>
							</div>

						</tab>
						<tab name="Other">
							<other-settings></other-settings>
						</tab>
						<tab name="Add Language">
							<lang-adder></lang-adder>
						</tab>
					</tabs>
				</div>



			</div>

		</div>

</template>
<script>
	import feildChooser from  '../components/fieldChooser.vue';
	import fieldTranslate from  '../components/fieldTranslate.vue';
	import formChooser from  '../components/formChooser.vue';
	import langChooser from  '../components/langChooser.vue';
	import langAdder from '../components/langAdder';
	import formSaver from '../components/formSaver';
	import otherSettings from './OtherSettings'
	export  default {
		components: {
			'field-chooser': feildChooser,
			'field-translate': fieldTranslate,
			'form-chooser': formChooser,
			'lang-chooser': langChooser,
			'lang-adder': langAdder,
			'form-saver': formSaver,
			'other-settings' : otherSettings
		}
	}

</script>
<style>
	p.submit{ display:inline;float:left;}
	span#cf-translations-spinner {
		margin-top: 35px;
		padding-top: 20px;
	}
	p.cf-translations-notice {
		display: inline-block;
		padding: 4px;
		border-radius: 4px;
	}
	p.cf-translations-success {
		background: #a3bf61;
		color: #fff;
	}
	p.cf-translations-error {
		background: #ff0000;
		color: #fff;
	}
	li.cf-translations-notice-wrap{
		margin-top: -5px;
	}
	.caldera-editor-header {
		height: 50px !important;
	}
	li.caldera-editor-logo {
		margin-top: 6px !important;
	}
	#cf-translate-add-language-button {
		background: #fafafa;
		border-color: #999;
		color: #23282d;
	}

	.cf-translate-green{
		background: #a3bf61;
	}
	.cf-translate-red {
		background: #ff0000;
	}
	.caldera-config-field textarea {
		width: 250px;
	}

	select#cf-translate-add-language, select#cf-translate-language-chooser {
		min-width: 250px;
	}

	#cf-translate-form-list, #cf-translate-form-list-wrap .submit button{
		min-width: 250px;
	}

	#cf-translate-form-list-wrap .submit{
		display: block;
		float: none;
	}

	.cf-translate-left {
		float:left;
		display: inline;
		width: 47%;
		margin-left: 3%
	}

	.cf-translate-right {
		display: inline;
		width: 47%;
		margin-left: 3%;
		float:left;
	}



    .tabs-component-panels,ul.tabs-component-tabs {
        float: left;
        display:inline-block
    }

    .tabs-component-panels{
        padding: 1rem;
        font-size: 1rem;
    }
    ul.tabs-component-tabs{
        background: #a3bf61;

    }
    li.tabs-component-tab {
        margin-bottom: 0;
        border-bottom: thin solid white;
        padding: 0;
    }
    li.tabs-component-tab:last-child() {
        border-bottom: none;
    }
    li.tabs-component-tab a{
        display: block;
        width: 69%;
        color: white;
        font-size: 1rem;
        padding: 1rem 1.4rem;
        text-decoration: none;
        text-align: center;
    }
    li.tabs-component-tab.is-active{
        background-color: #ff7e30;
    }

    .tabs-component-panels section:nth-child(3) .caldera-config-group {
        margin: 0 1rem 0;
    }
    .tabs-component-panels section:nth-child(3) label {
        display: inline;
        margin: 0;
    }

</style>
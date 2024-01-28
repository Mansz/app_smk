<?php
if( ! defined( 'ABSPATH' )){
	exit;
}
?>
<script id="tpml--cf-translate-field" type="text/x-handlebars-template">
	<div class="row">
		<div class="cf-translate-left">
			<div class="caldera-config-group cf-translate-field-label-wrap cf-translate-field-group">
				<label for="cf-translate-field-label-{{ID}}-{{language}}" class="label-{{language}}">
					<?php esc_html_e('Field Label', 'caldera-forms-translation'); ?>
				</label>
				<div class="caldera-config-field">
					<input id="cf-translate-field-label-{{ID}}-{{language}}" type="text" value="{{label}}" data-language="{{language}}" name="label" data-field-id="{{ID}}" />
				</div>
			</div>

			<div class="caldera-config-group cf-translate-field-caption-wrap cf-translate-field-group">
				<label for="cf-translate-field-caption-{{ID}}-{{language}}" class="label-{{language}}">
					<?php esc_html_e('Field Description', 'caldera-forms-translation'); ?>
				</label>
				<div class="caldera-config-field">
					<input id="cf-translate-field-caption-{{ID}}-{{language}}" type="text" value="{{caption}}" data-language="{{language}}" name="caption" data-field-id="{{ID}}" />
				</div>
			</div>
			<?php //note ifIs and ifNot are custom Handlebars conditonals created in init.js ?>
			<div class="caldera-config-group cf-translate-field-default-wrap cf-translate-field-group">
				{{#ifIs type value="html" }}
				<label for="cf-translate-field-default-{{ID}}-{{language}}" class="label-{{language}}">
					<?php esc_html_e('Content', 'caldera-forms-translation'); ?>
				</label>
				<div class="caldera-config-field">
					<textarea id="cf-translate-field-default-{{ID}}-{{language}}" type="text"  data-language="{{language}}" name="default" data-field-id="{{ID}}" class="block-input field-config" style="resize:vertical; height:200px;">
						{{default}}
					</textarea>
				</div>
				{{/ifIs}}

				{{#ifNot type value="html" }}
					<label for="cf-translate-field-default-{{ID}}-{{language}}" class="label-{{language}}">
						<?php esc_html_e('Default', 'caldera-forms-translation'); ?>
					</label>
					<div class="caldera-config-field">
						<input id="cf-translate-field-default-{{ID}}-{{language}}" type="text" value="{{default}}" data-language="{{language}}" name="default" data-field-id="{{ID}}" />
					</div>
				{{/ifNot}}
			</div>
		</div>
		<div class="cf-translate-right">
			{{#if option }}
				<?php echo '<h4>' . esc_html__( 'Field Option Labels', 'caldera-forms-translation' ) . '</h4>'; ?>
			{{/if}}
			<div id="cf-translate-options-{{ID}}-{{language}}">
				{{#each option}}
					<div class="caldera-config-group cf-translate-field-group">
						<label for="cf-translate-field-default-{{../ID}}-{{@key}}-{{../language}}" class="label-{{../language}}">
							<?php esc_html_e('Option Label', 'caldera-forms-translation'); ?>
						</label>
						<div class="caldera-config-field">
							<input id="cf-translate-field-default-{{../ID}}-{{@key}}-{{../language}}" type="text" value="{{this}}" data-language="{{../language}}" name="default" data-field-id="{{../ID}}" data-opt="{{@key}}" class="cf-translate-opt"/>
						</div>
					</div>
				{{/each}}
			</div>
		</div>
	</div>
	<div style="clear: both"></div>
</script>
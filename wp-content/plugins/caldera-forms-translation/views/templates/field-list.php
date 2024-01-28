<?php
if( ! defined( 'ABSPATH' ) ){
	exit;
}
?>
<script id="tpml--cf-translate-field-list" type="text/x-handlebars-template">
	<option>
		-- <?php esc_html_e( 'Select Field', 'caldera-forms-translations' ); ?> --
	</option>
	{{#each fields}}
		<option value="{{ID}}">{{label}}</option>
	{{/each}}
</script>
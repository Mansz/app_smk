<?php
/**
 * Framework license fields file.
 *
 * @link       https://shapedplugin.com/
 * @since      2.0.0
 *
 * @package    easy-accordion-free
 * @subpackage easy-accordion-free/framework
 */

if ( ! defined( 'ABSPATH' ) ) {
	die;
} // Cannot access directly.

if ( ! class_exists( 'SP_EAP_Field_license' ) ) {
	/**
	 *
	 * Field: license
	 *
	 * @since 3.3.16
	 * @version 3.3.16
	 */
	class SP_EAP_Field_license extends SP_EAP_Fields {

		/**
		 * Field constructor.
		 *
		 * @param array  $field The field type.
		 * @param string $value The values of the field.
		 * @param string $unique The unique ID for the field.
		 * @param string $where To where show the output CSS.
		 * @param string $parent The parent args.
		 */
		public function __construct( $field, $value = '', $unique = '', $where = '', $parent = '' ) {
			parent::__construct( $field, $value, $unique, $where, $parent );
		}

		/**
		 * Render
		 *
		 * @return void
		 */
		public function render() {
			echo wp_kses_post( $this->field_before() );
			if ( ! empty( $this->field['preview'] ) && $this->field['preview'] ) {
				echo '<div class="eap-woo-pro-notice">Want to add custom FAQs tab to your <a href="https://easyaccordion.io/product/ninja-t-shirt/#product-56" target="_blank"><b>product page</b></a> to increase sales? <a href="https://easyaccordion.io/pricing/?ref=1" target="_blank"><b>Upgrade to Pro!</b></a></div>';
				echo '<div class="sp-eap-pro-field"><img src="' . esc_url( SP_EAP::include_plugin_url( 'assets/images/woo-eap.webp' ) ) . '" class="pro_preview"></div>';
			} else {
				?>
				<div class="sp-easy-accordion-license text-center">
					<h3>You're using Easy Accordion Lite - No License Needed. Enjoy! 🙂</h3>
					<p>To get access to more premium features, consider <b><a href="https://easyaccordion.io/pricing/?ref=1" target="_blank">Upgrade to Pro!</a></b></p>
					<div class="sp-easy-accordion-license-area">
						<div class="sp-easy-accordion-license-key">
							<input class="sp-easy-accordion-license-key-input" type="text" name="" value="">
						</div>
						<input type="submit" class="button-secondary btn-license-save-activate" name="" value="Activate">
					</div>
				</div>
				<?php
			}
			echo wp_kses_post( $this->field_after() );
		}
	}
}

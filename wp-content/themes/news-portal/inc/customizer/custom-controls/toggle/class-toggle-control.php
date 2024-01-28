<?php
/**
 * Customizer Toggle Control.
 * 
 * @package Mystery Themes
 * @subpackage News Portal
 * @since 2.0.0
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( ! class_exists( 'News_Portal_Control_Toggle' ) ) :

	/**
	 * Toggle control (modified checkbox).
     */
	class News_Portal_Control_Toggle extends WP_Customize_Control {
		
		/**
		 * The control type.
		 *
		 * @access public
		 * @var string
		 */
		public $type = 'mt-toggle';

		/**
         * The control version.
         *
         * @static
         * @access public
         * @var string
         */
		public static $control_version = '1.0.0';

        /**
		 * Enqueue control related scripts/styles.
		 *
		 * @access public
		 * @return void
		 */
        public function enqueue() {
            wp_enqueue_style( 'np-toggle-style', get_template_directory_uri() . '/inc/customizer/custom-controls/toggle/toggle.css', false, self::$control_version, 'all' );
            wp_enqueue_script( 'np-toggle-script', get_template_directory_uri() . '/inc/customizer/custom-controls/toggle/toggle.js', array( 'jquery' ), self::$control_version, true );
        }
        
        /**
		 * Refresh the parameters passed to the JavaScript via JSON.
		 *
		 * @see WP_Customize_Control::to_json()
		 */
        public function to_json() {
			parent::to_json();

            $this->json['value']   = $this->value();
			$this->json['link']    = $this->get_link();
            $this->json['id']      = $this->id;

		}

        /**
		 * Don't render the content via PHP.  This control is handled with a JS template.
		 *
		 * @access public
		 * @return void
		 */
		public function render_content() {}
        
		/**
         * An Underscore (JS) template for this control's content (but not its container).
         *
         * Class variables for this control class are available in the `data` JS object;
         * export custom variables by overriding {@see WP_Customize_Control::to_json()}.
         *
         * @see WP_Customize_Control::print_template()
         *
         * @access protected
         */
        protected function content_template() {
    ?>
    		<div class="mt-toggle">
				<div class="toggle--wrapper">
					<# if ( data.label ) { #>
						<span class="customize-control-title">{{ data.label }}</span>
					<# } #>

					<input id="toggle-{{ data.id }}" type="checkbox" class="toggle--input" value="{{ data.value }}" {{{ data.link }}} <# if ( data.value ) { #> checked="checked" <# } #> />
					<label for="toggle-{{ data.id }}" class="toggle--label"></label>
				</div><!-- .toggle--wrapper -->

				<# if ( data.description ) { #>
					<span class="description customize-control-description">{{ data.description }}</span>
				<# } #>
			</div><!-- .mt-toggle -->
	<?php
		}
	}
	
endif;
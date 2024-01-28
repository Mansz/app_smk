<?php
/**
 * @package   CF_Translate
 * @author    Josh Pollock <Josh@CalderaWP.com>
 * @license   GPL-2.0+
 * @link
 * @copyright Josh Pollock <Josh@CalderaWP.com> & CalderaWP LLC
 *
 * @wordpress-plugin
 * Plugin Name: Caldera Forms Translation
 * Plugin URI:  https://CalderaWP.com
 * Description: Translate Caldera Forms
 * Version: 1.2.1
 * Author:      CalderaWP LLC
 * Author URI:  https://CalderaForms.com
 * Text Domain: caldera-forms-translation
 * License:     GPL-2.0+
 * License URI: http://www.gnu.org/licenses/gpl-2.0.txt
 * Domain Path: /languages
 */
// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die;
}

define( 'CFTRANS_PATH',  plugin_dir_path( __FILE__ ) );
define( 'CFTRANS_CORE',  __FILE__ );
define( 'CFTRANS_URL',  plugin_dir_url( __FILE__ ) );
define( 'CFTRANS_VER', '1.2.1' );



// Load instance
add_action( 'caldera_forms_includes_complete', 'cf_translate_load', 25 );
function cf_translate_load(){
    if ( method_exists( 'Caldera_Forms_Forms', 'get_fields' ) ) {
	    /**
	     * Add autoloader
	     */
        Caldera_Forms_Autoloader::add_root('CF_Translate', CFTRANS_PATH . 'classes');

	    /**
	     * Load admin
	     */
        if (is_admin()) {
            $slugs = new stdClass();
            $slugs->cf = Caldera_Forms::PLUGIN_SLUG;
            $slugs->translate = $slugs->cf . '-translate';
            new CF_Translate_Admin($slugs, CFTRANS_PATH, CFTRANS_URL, CFTRANS_VER );

        }

	    /**
	     * When form is rendered init front-end system
	     */
        add_action( 'caldera_forms_render_start', 'cf_translate_front_end_init' );

		/**
		 * When form is submitted, load translations as needed
		 */
        add_filter( 'caldera_forms_submit_get_form', 'cf_translate_process_init' );

	    /**
	     * Create field(s)
	     */
	    add_filter('caldera_forms_get_field_types', 'cf_translate_add_switcher_field' );

	    /**
	     * REST API: GO!
	     */
	    add_action( 'rest_api_init', 'cf_translate_init_api', 21 );
	    add_action( 'caldera_forms_rest_api_pre_init', 'cf_translate_init_api_route' );

		/**
		 * Append language to submit url
		 */
	    add_filter( 'caldera_forms_submission_url', 'cf_translate_submit_url' );

    }

}






/**
 * Control language selection
 */
add_filter( 'cf_translate_get_current_language', 'cf_translate_select_language' );


/**
 * Start up front-end for translating
 *
 * @since 0.1.0
 *
 * @uses "caldera_forms_render_start" action
 */
function cf_translate_front_end_init( $form ){
	$_form = CF_Translate_Factories::get_form( $form );
	$fields = new CF_Translate_Render(
		$_form,
		array(
			'hook' => 'caldera_forms_render_get_field',
		)
	);

	new CF_Translate_PickerOptions(
		$_form,
		array(
			'hook' => 'caldera_forms_render_get_field_type-language-picker',
			'callback' => 'filter',
		)
	);

	/**
	 * Runs after the front-end is loaded for a form
	 *
	 * @since 0.1.0
	 *
	 * @param CF_Translate_Render $fields Fields Front-end system
	 * @param CF_Translate_Form $_form Form object for translating
	 */
	do_action( 'cf_translate_front_end_init', $fields, $_form );

}

/**
 *  Setup translations during submission
 *
 * @since 1.2.0
 *
 * @uses "caldera_forms_get_field_types" filter
 *
 * @param array $form
 */
function cf_translate_process_init( $form ){
	$_form = CF_Translate_Factories::get_form( $form );
	 new CF_Translate_Success(
		$_form,
		array(
			'hook' => 'caldera_forms_submit_get_form',
		)
	);

	 return $form;
}


/**
 * Get the current language
 *
 * @since 0.1.0
 *
 * Defaults to value of get_locale() but has filter
 *
 * @return string
 */
function cf_translate_get_current_language(){
	/**
	 * Filter current language
	 *
	 * @since 0.1.0
	 *
	 * @param string $language Language code
	 */
	return apply_filters( 'cf_translate_get_current_language', get_locale() );
}

/**
 * Change language based on cf_lang GET var
 *
 * @since 0.2.0
 *
 * @uses "cf_translate_get_current_language"
 *
 * @param $language
 *
 * @return string
 */
function cf_translate_select_language( $language ){
	if( defined( 'ICL_LANGUAGE_CODE' ) ){
		$language = ICL_LANGUAGE_CODE;
	}elseif( ! empty( $_GET[ 'cf_lang' ] ) && is_string( $_GET[ 'cf_lang' ] ) ){
		$language = trim( strip_tags( $_GET[ 'cf_lang' ] ) );
	}

	return $language;

}




add_action( 'init', 'cf_translate_init_text_domain' );
function cf_translate_init_text_domain(){
	load_plugin_textdomain( 'caldera-forms-translation', FALSE, CFTRANS_PATH . 'languages' );

}

add_action( 'cf_translate_templates', 'cf_translate_templates' );
function cf_translate_templates(){
	include  CFTRANS_PATH . '/assets/language-codes.php';
	$dir = CFTRANS_PATH . 'views/templates/';
	include  $dir . '/field.php';
	include  $dir . '/field-list.php';
}


/**
 * Add language picker field
 *
 * @uses "caldera_forms_get_field_types" filter
 *
 * @since 0.1.0
 *
 * @param array $field_types
 *
 * @return array
 */
function cf_translate_add_switcher_field( $field_types ){

	$field_types[ 'language-picker' ] = array(
		"field"       => __( 'Language Picker', 'caldera-forms-translation' ),
		"description" => __( 'Translation chooser', 'caldera-forms-translation' ),
		"file"        => CFTRANS_PATH . "fields/picker/field.php",
		"category"    => __( 'Select', 'caldera-forms' ),
		"static"      => true,
		"single"      => true,
		"setup"       => array(
			"template" => CFTRANS_PATH . "fields/picker/config_template.php",
			"preview"  => CFTRANS_PATH . "fields/picker/dropdown/preview.php",
		),
		"scripts"     => array(
			CFTRANS_URL . 'assets/js/language-picker.min.js'
		),
	);

	return $field_types;
}

/**
 * Generic capability check
 *
 * @return bool
 */
function cf_translate_can_translate(){
	return current_user_can( Caldera_Forms::get_manage_cap( 'translate' ) );
}

/**
 * Make sure API infrastructure is loaded
 *
 * CF 1.4.4 has API infrastructure, but does not load it, but we need it.
 *
 * @uses "rest_api_init" action
 *
 * @since 0.0.3
 */
function cf_translate_init_api(){
	if( ! did_action( 'caldera_forms_rest_api_init' ) ){
		add_action( 'rest_api_init', [ 'Caldera_Forms', 'init_rest_api' ], 25 );
	}

}

/**
 * Add our API endpoint for saving settings and such
 *
 * @uses "caldera_forms_rest_api_init" action
 *
 * @since 0.3.0
 */
function cf_translate_init_api_route( $api ){
	$api->add_route( new CF_Translate_API() );
}

/**
 * Add cf_lang to submit url
 *
 * @since 1.2.0
 *
 * @uses "caldera_forms_submission_url" filter
 *
 * @param $url
 * @return string
 */
function cf_translate_submit_url( $url ){
	return add_query_arg( 'cf_lang', cf_translate_get_current_language(), $url );
}

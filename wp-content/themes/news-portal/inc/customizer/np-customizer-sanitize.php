<?php
/**
 * File to sanitize customizer field
 *
 * @package Mystery Themes
 * @subpackage News Portal
 * @since 1.0.0
 */

if ( ! function_exists( 'news_portal_sanitize_select' ) ) :
	
	/**
	 * Sanitize select.
	 *
	 * @param mixed                $input The value to sanitize.
	 * @param WP_Customize_Setting $setting WP_Customize_Setting instance.
	 * @return mixed Sanitized value.
	 *
	 * @since 1.0.0
	 */
	function news_portal_sanitize_select( $input, $setting ) {
		// Ensure input is a slug.
		$input = sanitize_key( $input );

		// Get list of choices from the control associated with the setting.
		$choices = $setting->manager->get_control( $setting->id )->choices;

		// If the input is a valid key, return it; otherwise, return the default.
		return ( array_key_exists( $input, $choices ) ? $input : $setting->default );
	}

endif;

if ( ! function_exists( 'news_portal_sanitize_checkbox' ) ) :

	/**
	 * Sanitize checkbox value
	 *
	 * @param  bool $checked Whether the checkbox is checked.
	 * @return bool Whether the checkbox is checked.
	 */
	function news_portal_sanitize_checkbox( $input ) {
		return ( ( isset( $input ) && true === $input ) ? true : false );
	}

endif;

/**
 * Sanitize repeater value
 *
 * @since 1.0.0
 */
function news_portal_sanitize_repeater( $input ){
	$input_decoded = json_decode( $input, true );
		
	if ( !empty( $input_decoded ) ) {
		foreach ( $input_decoded as $boxes => $box ){
			foreach ( $box as $key => $value ){
				$input_decoded[$boxes][$key] = wp_kses_post( $value );
			}
		}
		return json_encode( $input_decoded );
	}
	
	return $input;
}

/**
 * Sanitize site layout
 *
 * @since 1.0.0
 */
function news_portal_sanitize_site_layout( $input ) {
	$valid_keys = array(
		'fullwidth_layout' => __( 'Fullwidth Layout', 'news-portal' ),
		'boxed_layout' => __( 'Boxed Layout', 'news-portal' )
		);
	if ( array_key_exists( $input, $valid_keys ) ) {
		return $input;
	} else {
		return '';
	}
}

/**
 * switch option (show/hide)
 *
 * @since 1.0.0
 */
function news_portal_sanitize_switch_option( $input ) {
	$valid_keys = array(
			'show'  => __( 'Show', 'news-portal' ),
			'hide'  => __( 'Hide', 'news-portal' )
		);
	if ( array_key_exists( $input, $valid_keys ) ) {
		return $input;
	} else {
		return '';
	}
}

/*-----------------------------------------------------------------------------------------------------------------------*/
/**
 * Render the site title for the selective refresh partial.
 *
 * @since News Portal 1.0.1
 * @see news_portal_customize_register()
 *
 * @return void
 */
function news_portal_customize_partial_blogname() {
	bloginfo( 'name' );
}

/**
 * Render the site title for the selective refresh partial.
 *
 * @since News Portal 1.0.1
 * @see news_portal_customize_register()
 *
 * @return void
 */
function news_portal_customize_partial_blogdescription() {
	bloginfo( 'description' );
}

/**
 * Render the site title for the selective refresh partial.
 *
 * @since News Portal 1.0.1
 * @see news_portal_footer_settings_register()
 *
 * @return void
 */
function news_portal_customize_partial_copyright() {
	return get_theme_mod( 'news_portal_copyright_text' );
}

/**
 * Render the site title for the selective refresh partial.
 *
 * @since News Portal 1.0.1
 * @see news_portal_design_settings_register()
 *
 * @return void
 */
function news_portal_customize_partial_related_title() {
	return get_theme_mod( 'news_portal_related_posts_title' );
}

/**
 * Render the site title for the selective refresh partial.
 *
 * @since News Portal 1.0.1
 * @see news_portal_design_settings_register()
 *
 * @return void
 */
function news_portal_customize_partial_archive_more() {
	return get_theme_mod( 'news_portal_archive_read_more_text' );
}

/**
 * Render the site title for the selective refresh partial.
 *
 * @since News Portal 1.0.1
 * @see news_portal_header_settings_register()
 *
 * @return void
 */
function news_portal_customize_partial_ticker_caption() {
	return get_theme_mod( 'news_portal_ticker_caption' );
}
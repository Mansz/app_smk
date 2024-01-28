<?php
/**
 * Includes theme customizer defaults and starter functions.
 * 
 * @package Mystery Themes
 * @subpackage News Portal
 * @since 2.0.0
 */

// Exit if accessed directly
if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

if ( ! function_exists( 'news_portal_get_customizer_option_value' ) ) :

    /**
     * Get the customizer value `get_theme_mod()`
     * 
     * @since 1.0.0
     */
    function news_portal_get_customizer_option_value( $setting_id ) {

        return get_theme_mod( $setting_id, news_portal_get_customizer_default( $setting_id ) );

    }

endif;

if ( ! function_exists( 'news_portal_get_customizer_default' ) ) :

    /**
     * Returns an array of the desired default Ogma Options
     *
     * @return array
     */
    function news_portal_get_customizer_default( $setting_id ) {

        $default_values = apply_filters( 'news_portal_get_customizer_defaults',
            array(
                //site layout
                'news_portal_site_layout'               => 'fullwidth_layout',
                'news_portal_dark_mode_option'          => false,
                //colors
                'news_portal_theme_color'               => '#029FB2',
                'news_portal_site_title_color'          => '#029FB2',
            )
        );

        return  $default_values[$setting_id];

    }

endif;
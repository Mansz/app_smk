<?php
/**
 * Add Site Style section and it's fields inside General Settings panel.
 * 
 * @package Mystery Themes
 * @subpackage News Portal
 * @since 2.0.0
 */

// Exit if accessed directly
if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

add_action( 'customize_register', 'news_portal_register_site_style_options' );

if ( ! function_exists( 'news_portal_register_site_style_options' ) ) :

    /**
     * Register theme options for Site Style section.
     * 
     * @param WP_Customize_Manager $wp_customize Object that holds the customizer data.
     * @since 1.0.0
     */
    function news_portal_register_site_style_options( $wp_customize ) {

        /*
         * Failsafe is safe
         */
        if ( ! isset( $wp_customize ) ) {
            return;
        }

        /**
         * Add Site Style Section
         * 
         * General Settings > Site Style
         * 
         * @uses $wp_customize->add_section() https://developer.wordpress.org/reference/classes/wp_customize_manager/add_section/
         * @since 1.0.0
         */
        $wp_customize->add_section( new News_Portal_Customize_Section (
            $wp_customize, 'news_portal_section_site_style',
                array(
                    'priority'              => 10,
                    'panel'                 => 'news_portal_general_settings_panel',
                    'title'                 => __( 'Site Style', 'news-portal' ),
                )
            )
        );

        /**
         * Radio image field for site layout
         *
         * General Settings > Site Style
         *
         * @since 2.0.0
         */
        $wp_customize->add_setting( 'news_portal_site_layout',
            array(
                'default'           => news_portal_get_customizer_default( 'news_portal_site_layout' ),
                'sanitize_callback' => 'news_portal_sanitize_select',
            )
        );
        $wp_customize->add_control( new News_Portal_Control_Radio_Image(
            $wp_customize, 'news_portal_site_layout',
                array(
                    'priority'      => 10,
                    'section'       => 'news_portal_section_site_style',
                    'settings'      => 'news_portal_site_layout',
                    'label'         => __( 'Site Layout', 'news-portal' ),
                    'choices'       => news_portal_site_layout_choices(),
                )
            )
        );

        /**
         * Toggle option for dark mode skin.
         *
         * General Settings > Site Style
         *
         * @since 1.0.0
         */
        $wp_customize->add_setting( 'news_portal_dark_mode_option',
            array(
                'default'           => news_portal_get_customizer_default( 'news_portal_dark_mode_option' ),
                'sanitize_callback' => 'news_portal_sanitize_checkbox'
            )
        );
        $wp_customize->add_control( new News_Portal_Control_Toggle(
            $wp_customize, 'news_portal_dark_mode_option',
                array(
                    'priority'      => 20,
                    'section'       => 'news_portal_section_site_style',
                    'settings'      => 'news_portal_dark_mode_option',
                    'label'         => __( 'Enable Dark Mode Skin', 'news-portal' ),
                    'description'   => __( 'Enable/Disable option for site dark mode skin.', 'news-portal' )
                )
            )
        );

    }

endif;
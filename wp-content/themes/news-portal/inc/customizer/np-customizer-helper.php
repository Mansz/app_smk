<?php
/**
 * Customizer helper where define functions related to customizer panel, sections and settings.
 * 
 * @package Mystery Themes
 * @subpackage News Portal
 * @since 2.0.0
 */

// Exit if accessed directly
if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

/*---------------------- General Panel Choices ----------------------------- --*/
    
    if ( ! function_exists( 'news_portal_site_layout_choices' ) ) :

        /**
         * function to return choices of site layout.
         *
         * @since 2.0.0
         */
        function news_portal_site_layout_choices() {

            $site_layout_choices = apply_filters( 'news_portal_site_layout_choices',
                array(
                    'fullwidth_layout'  => array(
                        'title' => __( 'Full Width', 'news-portal' ),
                        'src'   => get_template_directory_uri() . '/assets/images/full-width.png'
                    ),
                    'boxed_layout'      => array(
                        'title' => __( 'Boxed', 'news-portal' ),
                        'src'   => get_template_directory_uri() . '/assets/images/boxed.png'
                    )
                )
            );

            return $site_layout_choices;

        }

    endif;
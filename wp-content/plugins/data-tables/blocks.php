<?php
namespace DTBL;
if(!defined('ABSPATH')) {
    return;
}

use DTBL\Template;

if(!class_exists('DTBL_Block')){
    class DTBL_Block{
        function __construct(){
            add_action('init', [$this, 'enqueue_script']);
        }

        function enqueue_script(){
            wp_enqueue_script('jquery');

            //data tables
            wp_register_style( 'dtbl-dataTables', DTBL_PLUGIN_DIR . 'public/css/jquery.dataTables.min.css', array(), DTBL_PLUGIN_VERSION , 'all'  );
	        wp_register_script( 'dtbl-dataTables', DTBL_PLUGIN_DIR . 'public/js/jquery.dataTables.min.js' , array('jquery'), DTBL_PLUGIN_VERSION, false );

            //blocks
            wp_register_script( 'dtbl-blocks', DTBL_PLUGIN_DIR. 'dist/blocks.js' , array('dtbl-dataTables', 'wp-block-editor'), DTBL_PLUGIN_VERSION, true );
            wp_register_style( 'dtbl-blocks', DTBL_PLUGIN_DIR . 'dist/blocks.css', array('dtbl-dataTables'), DTBL_PLUGIN_VERSION, 'all' );

            register_block_type(DTBL_PLUGIN_PATH .'blocks/data-table', array(
                'editor_script' => 'dtbl-blocks',
                'editor_style' => 'dtbl-blocks',
                'render_callback' => function($atts){
                    return Template::html($atts);
                }
            ));

        }


    }

    new DTBL_Block();
}


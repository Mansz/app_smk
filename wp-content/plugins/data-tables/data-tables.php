<?php 
/*
 * Plugin Name: Data Tables
 * Plugin URI:  
 * Description: Create and display Wonderful tables with search options. 
 * Version: 1.1.0
 * Author: bPlugins
 * Author URI: https://bplugins.com
 * License: GPLv3
 * Text Domain:  dtbl
 * Domain Path:  /languages
 */
define('DTBL_PLUGIN_VERSION', '1.1.0' ); 
define('DTBL_PLUGIN_DIR', plugin_dir_url(__FILE__) ); 
define( 'DTBL_PLUGIN_PATH', plugin_dir_path( __FILE__ ) );

function dtbl_languages() {
    load_plugin_textdomain( 'dtbl', false, dirname( __FILE__ ) . "/languages" );
}
add_action( "plugins_loaded", 'dtbl_languages' );

require_once DTBL_PLUGIN_PATH. 'inc/Template.php';
require_once DTBL_PLUGIN_PATH . 'inc/shortcode.php';
require_once DTBL_PLUGIN_PATH . 'inc/DataTable.php';
require_once DTBL_PLUGIN_PATH. 'inc/renderer.php';
require_once DTBL_PLUGIN_PATH. 'inc/Block.php';
require_once DTBL_PLUGIN_PATH. 'blocks.php';

function dtbl_admin_style_and_scripts() {
	wp_enqueue_style( 'dtbl-style', plugin_dir_url( __FILE__ ) . 'admin/css/style.css', array(), DTBL_PLUGIN_VERSION , 'all'  );; 
}
add_action( 'admin_enqueue_scripts', 'dtbl_admin_style_and_scripts' );


add_action('wp_enqueue_scripts', function(){
	wp_enqueue_script('jquery');

	//data tables
	wp_register_style( 'dtbl-dataTables', DTBL_PLUGIN_DIR . 'public/css/jquery.dataTables.min.css', array(), DTBL_PLUGIN_VERSION , 'all'  );
	wp_register_script( 'dtbl-dataTables', DTBL_PLUGIN_DIR . 'public/js/jquery.dataTables.min.js' , array('jquery'), DTBL_PLUGIN_VERSION, false );

	//blocks
	wp_enqueue_script( 'dtbl', DTBL_PLUGIN_DIR. 'public/js/script.js' , array('dtbl-dataTables'), DTBL_PLUGIN_VERSION, true );
	wp_enqueue_style( 'dtbl', DTBL_PLUGIN_DIR . 'public/css/style.css', array('dtbl-dataTables'), DTBL_PLUGIN_VERSION, 'all' );
});
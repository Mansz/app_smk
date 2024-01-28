<?php

function dtbl_get_table( $atts ) {
    $post_id = $atts['id'];
    ob_start();
	
	echo DTBL\Renderer::html($post_id);

	return ob_get_clean();
}
add_shortcode( 'table', 'dtbl_get_table' );
<?php
namespace DTBL;

class DataTable{

    public function __construct(){
        add_action( 'init', [$this, 'dtbl_create_post_type'] );

        if ( is_admin() ) {
            add_filter( 'post_row_actions', [$this, 'dtbl_remove_row_actions'], 10, 2 );
            // Add Shortcode column
            add_filter('manage_datatable_posts_columns', [$this, 'ST4_columns_head_only_datatable'], 10);
            add_action('manage_datatable_posts_custom_column', [$this, 'ST4_columns_content_only_datatable'], 10, 2);
            add_filter('post_updated_messages', [$this, 'dtbl_updated_messages']);
            add_action('use_block_editor_for_post', [$this, 'use_block_editor_for_post'], 999, 2);
        }
    }

    function use_block_editor_for_post($use, $post){
        if ('datatable' === $post->post_type) {
            return true;
        }
        return $use;
    }

    function dtbl_create_post_type() {
        register_post_type( 'datatable',
            array(
            'labels' => array(
                'name' => __( 'Tables', 'dtbl'),
                'singular_name' => __( 'Tables', 'dtbl' ),
                'add_new' => __( 'Add New Table', 'dtbl' ),
                'add_new_item' => __( 'Add New Table', 'dtbl' ),
                'edit_item' => __( 'Edit Table', 'dtbl' ),
                'new_item' => __( 'New Table', 'dtbl' ),
                'view_item' => __( 'View Table', 'dtbl' ),
                'search_items'       => __( 'Search Table', 'dtbl'),
                'not_found' => __( 'Sorry, we couldn\'t find the Table you are looking for.', 'dtbl' )
             ),
            'public' => false,
            'show_ui' => true, 		
            'show_in_rest' => true,							
            'publicly_queryable' => false,
            'exclude_from_search' => true,
            'menu_position' => 14,
            'menu_icon'   => 'dashicons-editor-table',		
            'has_archive' => false,
            'hierarchical' => false,
            'capability_type' => 'page',
            'rewrite' => array( 'slug' => 'datatable' ),
            'supports' => array( 'title', 'editor' ),
            'template' => [
                ['dtbl/data-table']
            ],
            'template_lock' => 'all',
            )
        );
    }

    //  Hide & Disabled View, Quick Edit and Preview Button
    function dtbl_remove_row_actions( $idtions ) {
        global $post;
        if( $post->post_type == 'datatable' ) {
            unset( $idtions['view'] );
            unset( $idtions['inline hide-if-no-js'] );
        }
        return $idtions;
    }

    // CREATE TWO FUNCTIONS TO HANDLE THE COLUMN
    function ST4_columns_head_only_datatable($defaults) {
        $defaults['shrotcode'] = __('ShortCode', 'dtbl');
        return $defaults;
    }

    function ST4_columns_content_only_datatable($column_name, $post_ID) {
        if ($column_name == 'shrotcode') {
            echo '<input onClick="this.select();" value="[table id='. esc_attr($post_ID) . ']" >';
        }
    }

    // Remove post update massage and link 
    function dtbl_updated_messages( $messages ) {
        $messages['datatable'][1] = __('Table Updated ', 'dtbl');
        return $messages;
    }



    
}

new DataTable();
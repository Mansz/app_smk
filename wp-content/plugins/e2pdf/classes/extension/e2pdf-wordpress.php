<?php

/**
 * E2Pdf WordPress Extension
 * @copyright  Copyright 2017 https://e2pdf.com
 * @license    GPLv3
 * @version    1
 * @link       https://e2pdf.com
 * @since      0.00.01
 */
if (!defined('ABSPATH')) {
    die('Access denied.');
}

class Extension_E2pdf_Wordpress extends Model_E2pdf_Model {

    private $options;
    private $info = array(
        'key' => 'wordpress',
        'title' => 'WordPress',
    );

    /**
     * Get info about extension
     * @param string $key - Key to get assigned extension info value
     * @return array|string - Extension Key and Title or Assigned extension info value
     */
    public function info($key = false) {
        if ($key && isset($this->info[$key])) {
            return $this->info[$key];
        } else {
            return array(
                $this->info['key'] => $this->info['title'],
            );
        }
    }

    /**
     * Check if needed plugin active
     * @return bool - Activated/Not Activated plugin
     */
    public function active() {
        return true;
    }

    /**
     * Set option
     * @param string $key - Key of option
     * @param string $value - Value of option
     * @return bool - Status of setting option
     */
    public function set($key, $value) {
        if (!isset($this->options)) {
            $this->options = new stdClass();
        }
        $this->options->$key = $value;
    }

    /**
     * Get option by key
     * @param string $key - Key to get assigned option value
     * @return mixed
     */
    public function get($key) {
        if (isset($this->options->$key)) {
            $value = $this->options->$key;
            return $value;
        } elseif ($key == 'args') {
            return array();
        } else {
            return false;
        }
    }

    /**
     * Get items to work with
     * @return array() - List of available items
     */
    public function items() {

        $content = array();
        $items = get_post_types(array(), 'names');

        foreach ($items as $item) {
            if ($item != 'attachment') {
                $content[] = $this->item($item);
            }
        }

        return $content;
    }

    /**
     * Get entries for export
     * @param string $item - Item
     * @param string $name - Entries names
     * @return array() - Entries list
     */
    public function datasets($item = false, $name = false) {
        $datasets = array();
        if ($item) {
            $datasets_tmp = get_posts(
                    array(
                        'post_type' => $item,
                        'numberposts' => -1,
                        'post_status' => 'any',
                    )
            );

            if ($datasets_tmp) {
                $this->set('item', $item);
                foreach ($datasets_tmp as $key => $dataset) {
                    $this->set('dataset', $dataset->ID);
                    $dataset_title = $this->render($name);
                    if (!$dataset_title) {
                        $dataset_title = isset($dataset->post_title) && $dataset->post_title ? $dataset->post_title : $dataset->ID;
                    }
                    $datasets[] = array(
                        'key' => $dataset->ID,
                        'value' => $dataset_title,
                    );
                }
            }
        }
        return $datasets;
    }

    /**
     * Get Dataset Actions
     * @param int $dataset - Dataset ID
     * @return object
     */
    public function get_dataset_actions($dataset = false) {
        $dataset = (int) $dataset;
        if (!$dataset) {
            return false;
        }

        $actions = new stdClass();
        $actions->view = $this->helper->get_url(
                array(
                    'post' => $dataset,
                    'action' => 'edit',
                ), 'post.php?'
        );
        $actions->delete = false;
        return $actions;
    }

    /**
     * Get Template Actions
     * @param int $template - Template ID
     * @return object
     */
    public function get_template_actions($template = false) {
        $template = (int) $template;
        if (!$template) {
            return;
        }
        $actions = new stdClass();
        $actions->delete = false;
        return $actions;
    }

    /**
     * Get item
     * @param string $item - Item
     * @return object - Item
     */
    public function item($item = false) {

        if (!$item && $this->get('item')) {
            $item = $this->get('item');
        }

        $form = new stdClass();
        $post = get_post_type_object($item);
        if ($post) {
            $form->id = $item;
            $form->name = $post->label ? $post->label : $item;
            $form->url = $this->helper->get_url(array('post_type' => $item), 'edit.php?');
        } else {
            $form->id = '';
            $form->name = '';
            $form->url = 'javascript:void(0);';
        }

        return $form;
    }

    public function load_filters() {
        add_filter('the_content', array($this, 'filter_the_content'), 10, 2);
        add_filter('widget_text', array($this, 'filter_content_custom'));
        add_filter('widget_block_content', array($this, 'filter_content_custom'));

        /**
         * Popup Maker – Popup for opt-ins, lead gen, & more
         * https://wordpress.org/plugins/popup-maker/
         */
        add_filter('pum_popup_content', array($this, 'filter_the_content'), 10, 2);

        /**
         * Events Manager
         * https://wordpress.org/plugins/events-manager/
         */
        add_filter('em_event_output_placeholder', array($this, 'filter_content_custom'), 0);
        add_filter('em_event_output', array($this, 'filter_content_custom'));
        add_filter('em_booking_output_placeholder', array($this, 'filter_content_custom'), 0);
        add_filter('em_booking_output', array($this, 'filter_content_custom'));
        add_filter('em_location_output_placeholder', array($this, 'filter_content_custom'), 0);
        add_filter('em_location_output', array($this, 'filter_content_custom'));
        add_filter('em_category_output_placeholder', array($this, 'filter_content_custom'), 0);

        /**
         * Beaver Builder – WordPress Page Builder
         * https://wordpress.org/plugins/beaver-builder-lite-version/
         */
        add_filter('fl_builder_before_render_shortcodes', array($this, 'filter_content_loop'));

        /**
         * WPBakery Page Builder Image Object Link
         */
        add_filter('vc_map_get_attributes', array($this, 'filter_vc_map_get_attributes'), 10, 2);

        /**
         * Flatsome theme global tab content
         */
        add_filter('theme_mod_tab_content', array($this, 'filter_content_custom'));

        /**
         * MemberPress Mail attachments
         * https://memberpress.com/
         */
        add_filter('mepr_email_send_attachments', array($this, 'filter_mepr_email_send_attachments'), 10, 4);

        /**
         * Thrive Theme Builder dynamic shortcode support
         */
        add_filter('thrive_theme_template_content', array($this, 'filter_thrive_theme_template_content'));

        /**
         * WPBakery Page Builder Grid Item
         * [e2pdf-download id="1" dataset="{{ post_data:ID }}"]
         */
        add_filter('vc_basic_grid_items_list', array($this, 'filter_vc_basic_grid_items_list'));

        /**
         * Themify Builder dynamic shortcode support
         * https://wordpress.org/plugins/themify-builder/
         */
        add_filter('themify_builder_module_content', array($this, 'filter_themify_builder_module_content'));

        /**
         * Impreza theme by Up Solutions
         * https://themeforest.net/item/impreza-retina-responsive-wordpress-theme/6434280
         */
        add_filter('us_content_template_the_content', array($this, 'filter_content_custom'));
    }

    public function load_actions() {
        /**
         * Elementor Website Builder – More than Just a Page Builder
         * https://wordpress.org/plugins/elementor/
         */
        add_action('elementor/widget/before_render_content', array($this, 'action_elementor_widget_before_render_content'));
        add_action('elementor/frontend/widget/before_render', array($this, 'action_elementor_widget_before_render_content'), 5);

        /**
         * JetEngine: WordPress Plugin for Elementor
         * https://crocoblock.com
         */
        add_action('jet-engine/listing/grid/before-render', array($this, 'action_jet_engine_listing_grid_before_render'));
        add_action('jet-engine/listing/grid/after-render', array($this, 'action_jet_engine_listing_grid_after_render'));

        /**
         * Happy Addons for Elementor
         * https://wordpress.org/plugins/happy-elementor-addons/ compatibility fix
         */
        add_action('elementor/frontend/before_render', array($this, 'action_elementor_widget_before_render_content'), 0);

        /**
         * MemberPress Mail attachments remove
         * https://memberpress.com/
         */
        add_action('mepr_email_sent', array($this, 'action_mepr_email_sent'), 10, 3);
    }

    /**
     * Render value according to content
     * @param string $value - Content
     * @param string $type - Type of rendering value
     * @param array $field - Field details
     * @return string - Fully rendered value
     */
    public function render($value, $field = array(), $convert_shortcodes = true) {

        $value = $this->render_shortcodes($value, $field);
        $value = $this->strip_shortcodes($value);
        $value = $this->convert_shortcodes($value, $convert_shortcodes, isset($field['type']) && $field['type'] == 'e2pdf-html' ? true : false);
        if (isset($field['type']) && $field['type'] === 'e2pdf-checkbox' && isset($field['properties']['option'])) {
            $option = $this->render($field['properties']['option']);
            $options = explode(', ', $value);
            $option_options = explode(', ', $option);
            if (is_array($options) && is_array($option_options) && !array_diff($option_options, $options)) {
                $value = $option;
            } else {
                $value = '';
            }
        }

        return $value;
    }

    /**
     * Render shortcodes which available in this extension
     * @param string $value - Content
     * @param string $type - Type of rendering value
     * @param array $field - Field details
     * @return string - Value with rendered shortcodes
     */
    public function render_shortcodes($value, $field = array()) {

        $dataset = $this->get('dataset');
        $item = $this->get('item');
        $args = $this->get('args');
        $user_id = $this->get('user_id');
        $template_id = $this->get('template_id') ? $this->get('template_id') : false;
        $element_id = isset($field['element_id']) ? $field['element_id'] : false;

        if ($this->verify()) {

            $args = apply_filters('e2pdf_extension_render_shortcodes_args', $args, $element_id, $template_id, $item, $dataset, false, false);
            $post = get_post($dataset);

            /**
             * Set current Post for Toolset Views
             * https://toolset.com/
             */
            do_action('wpv_action_wpv_set_top_current_post', $post);

            $wordpress_shortcodes = array(
                'id',
                'post_author',
                'post_date',
                'post_date_gmt',
                'post_content',
                'post_title',
                'post_excerpt',
                'post_status',
                'comment_status',
                'ping_status',
                'post_password',
                'post_name',
                'to_ping',
                'pinged',
                'post_modified',
                'post_modified_gmt',
                'post_content_filtered',
                'post_parent',
                'guid',
                'menu_order',
                'post_type',
                'post_mime_type',
                'comment_count',
                'filter',
                'post_thumbnail',
                'get_the_post_thumbnail',
                'get_the_post_thumbnail_url',
                'get_permalink',
                'get_post_permalink',
            );

            if (false !== strpos($value, '[')) {

                $replace = array(
                    '[id]' => isset($post->ID) && $post->ID ? $post->ID : '',
                    '[e2pdf-dataset]' => $dataset,
                    '[pdf_url]' => '[e2pdf-url]',
                    '[e2pdf-url]' => '',
                );
                if (false !== strpos($value, '[e2pdf-url]') || false !== strpos($value, '[pdf_url]')) {
                    $pdf_url = '';
                    if ($this->get('entry')) {
                        if ($this->get('entry')->get_data('e2pdf-url')) {
                            $pdf_url = $this->get('entry')->get_data('e2pdf-url');
                        } else {
                            if (!$this->get('entry')->load_by_uid()) {
                                $this->get('entry')->save();
                            }
                            $url_data = array(
                                'page' => 'e2pdf-download',
                                'uid' => $this->get('entry')->get('uid'),
                            );
                            $pdf_url = esc_url_raw(
                                    $this->helper->get_frontend_pdf_url(
                                            $url_data, false,
                                            array(
                                                'e2pdf_extension_render_shortcodes_site_url',
                                                'e2pdf_extension_wordpress_render_shortcodes_site_url',
                                            )
                                    )
                            );
                        }
                    }
                    $replace['[e2pdf-url]'] = $pdf_url;
                }
                $value = str_replace(array_keys($replace), $replace, $value);

                $shortcode_tags = array(
                    'e2pdf-foreach',
                );
                preg_match_all('@\[([^<>&/\[\]\x00-\x20=]++)@', $value, $matches);
                $tagnames = array_intersect($shortcode_tags, $matches[1]);

                foreach ($matches[1] as $key => $shortcode) {
                    if (strpos($shortcode, ':') !== false) {
                        $shortcode_tags[] = $shortcode;
                    }
                }
                if (!empty($tagnames)) {
                    $pattern = $this->helper->load('shortcode')->get_shortcode_regex($tagnames);
                    preg_match_all('/' . $pattern . '/', $value, $shortcodes);
                    foreach ($shortcodes[0] as $key => $shortcode_value) {
                        $shortcode = array();
                        $shortcode[1] = $shortcodes[1][$key];
                        $shortcode[2] = $shortcodes[2][$key];
                        $shortcode[3] = $shortcodes[3][$key];
                        $shortcode[4] = $shortcodes[4][$key];
                        $shortcode[5] = $shortcodes[5][$key];
                        $shortcode[6] = $shortcodes[6][$key];

                        $atts = shortcode_parse_atts($shortcode[3]);
                        if ($shortcode[2] == 'e2pdf-foreach') {
                            if (isset($atts['shortcode']) && $atts['shortcode'] == 'e2pdf-wp') {
                                if (!isset($atts['id']) && isset($post->ID) && $post->ID) {
                                    $shortcode[3] .= ' id="' . $post->ID . '"';
                                }
                            }
                            $value = str_replace($shortcode_value, do_shortcode_tag($shortcode), $value);
                        }
                    }
                }

                $shortcode_tags = array(
                    'meta',
                    'terms',
                    'e2pdf-wp',
                    'e2pdf-wp-term',
                    'e2pdf-content',
                    'e2pdf-user',
                    'e2pdf-arg',
                );
                $shortcode_tags = array_merge($shortcode_tags, $wordpress_shortcodes);
                preg_match_all('@\[([^<>&/\[\]\x00-\x20=]++)@', $value, $matches);
                $tagnames = array_intersect($shortcode_tags, $matches[1]);
                if (!empty($tagnames)) {
                    $pattern = $this->helper->load('shortcode')->get_shortcode_regex($tagnames);
                    preg_match_all('/' . $pattern . '/', $value, $shortcodes);
                    foreach ($shortcodes[0] as $key => $shortcode_value) {
                        $shortcode = array();
                        $shortcode[1] = $shortcodes[1][$key];
                        $shortcode[2] = $shortcodes[2][$key];
                        $shortcode[3] = $shortcodes[3][$key];
                        $shortcode[4] = $shortcodes[4][$key];
                        $shortcode[5] = $shortcodes[5][$key];
                        $shortcode[6] = $shortcodes[6][$key];
                        $atts = shortcode_parse_atts($shortcode[3]);
                        if ($shortcode[2] === 'e2pdf-content') {
                            if (!isset($atts['id']) && isset($post->ID) && $post->ID) {
                                $shortcode[3] .= ' id="' . $post->ID . '"';
                                $value = str_replace($shortcode_value, '[' . $shortcode[2] . $shortcode[3] . ']', $value);
                            }
                        } elseif ($shortcode[2] === 'meta' || $shortcode[2] === 'terms' || $shortcode[2] == 'e2pdf-wp') {
                            if (!isset($atts['id']) && isset($post->ID) && $post->ID) {
                                $shortcode[3] .= ' id="' . $post->ID . '"';
                            }
                            if ($shortcode[2] === 'meta') {
                                $shortcode[3] .= ' meta="true"';
                            }
                            if ($shortcode[2] === 'terms') {
                                $shortcode[3] .= ' terms="true"';
                            }

                            if (substr($shortcode_value, -11) === '[/e2pdf-wp]' || substr($shortcode_value, -8) === '[/terms]' || substr($shortcode_value, -7) === '[/meta]') {
                                if ($shortcode[5]) {
                                    $shortcode[5] = $this->render($shortcode[5], array(), false);
                                }
                                $value = str_replace($shortcode_value, '[e2pdf-wp' . $shortcode[3] . ']' . $shortcode[5] . '[/e2pdf-wp]', $value);
                            } else {
                                $value = str_replace($shortcode_value, '[e2pdf-wp' . $shortcode[3] . ']', $value);
                            }
                        } elseif ($shortcode[2] === 'e2pdf-wp-term') {
                            if (isset($atts['id']) && $atts['id'] == 'dynamic' && substr($shortcode_value, -16) === '[/e2pdf-wp-term]') {
                                if ($shortcode[5]) {
                                    $shortcode[5] = $this->render($shortcode[5], array(), false);
                                }
                                $value = str_replace($shortcode_value, '[e2pdf-wp-term' . $shortcode[3] . ']' . $shortcode[5] . '[/e2pdf-wp-term]', $value);
                            }
                        } elseif (in_array($shortcode[2], $wordpress_shortcodes)) {
                            if (!isset($atts['id']) && isset($post->ID) && $post->ID) {
                                $shortcode[3] .= ' id="' . $post->ID . '"';
                            }
                            $shortcode[3] .= ' key="' . $shortcode[2] . '"';
                            $value = str_replace($shortcode_value, '[e2pdf-wp' . $shortcode[3] . ']', $value);
                        } elseif ($shortcode[2] === 'e2pdf-user') {
                            if (!isset($atts['id']) && $user_id) {
                                $shortcode[3] .= ' id="' . $user_id . '"';
                                $value = str_replace($shortcode_value, '[' . $shortcode[2] . $shortcode[3] . ']', $value);
                            } elseif (isset($atts['id']) && $atts['id'] == 'dynamic' && substr($shortcode_value, -13) === '[/e2pdf-user]') {
                                if ($shortcode[5]) {
                                    $shortcode[5] = $this->render($shortcode[5], array(), false);
                                }
                                $value = str_replace($shortcode_value, '[e2pdf-user' . $shortcode[3] . ']' . $shortcode[5] . '[/e2pdf-user]', $value);
                            }
                        } elseif ($shortcode[2] == 'e2pdf-arg') {
                            if (isset($atts['key']) && isset($args[$atts['key']])) {
                                $value = str_replace($shortcode_value, $this->strip_shortcodes($args[$atts['key']]), $value);
                            } else {
                                $value = str_replace($shortcode_value, '', $value);
                            }
                        }
                    }
                }

                $shortcode_tags = array(
                    'e2pdf-format-number',
                    'e2pdf-format-date',
                    'e2pdf-format-output',
                );
                $shortcode_tags = apply_filters('e2pdf_extension_render_shortcodes_tags', $shortcode_tags);
                preg_match_all('@\[([^<>&/\[\]\x00-\x20=]++)@', $value, $matches);
                $tagnames = array_intersect($shortcode_tags, $matches[1]);
                if (!empty($tagnames)) {
                    $pattern = $this->helper->load('shortcode')->get_shortcode_regex($tagnames);
                    preg_match_all("/$pattern/", $value, $shortcodes);
                    foreach ($shortcodes[0] as $key => $shortcode_value) {
                        $shortcode = array();
                        $shortcode[1] = $shortcodes[1][$key];
                        $shortcode[2] = $shortcodes[2][$key];
                        $shortcode[3] = $shortcodes[3][$key];
                        $shortcode[4] = $shortcodes[4][$key];
                        $shortcode[5] = $shortcodes[5][$key];
                        $shortcode[6] = $shortcodes[6][$key];
                        if ($shortcode[5]) {
                            $shortcode[5] = $this->render($shortcode[5], array(), false);
                        }
                        $value = str_replace($shortcode_value, '[' . $shortcode[2] . $shortcode[3] . ']' . $shortcode[5] . '[/' . $shortcode[2] . ']', $value);
                    }
                }
            }

            add_filter('frm_filter_view', array($this, 'filter_frm_filter_view'));

            $value = apply_filters('e2pdf_extension_render_shortcodes_pre_do_shortcode', $value, $element_id, $template_id, $item, $dataset, false, false);
            $value = do_shortcode($value);
            $value = apply_filters('e2pdf_extension_render_shortcodes_after_do_shortcode', $value, $element_id, $template_id, $item, $dataset, false, false);
            $value = apply_filters('e2pdf_extension_render_shortcodes_pre_value', $value, $element_id, $template_id, $item, $dataset, false, false);

            remove_filter('frm_filter_view', array($this, 'filter_frm_filter_view'));

            if (isset($field['type']) && ($field['type'] === 'e2pdf-image' || $field['type'] === 'e2pdf-signature')) {
                $esig = isset($field['properties']['esig']) && $field['properties']['esig'] ? true : false;
                if ($esig) {
                    //process e-signature
                    $value = '';
                } else {
                    $value = $this->helper->load('properties')->apply($field, $value);
                    if (!$this->helper->load('image')->get_image($value)) {
                        if ($value && 0 === strpos($value, 'image/jsignature;base30,')) {
                            $options = apply_filters(
                                    'e2pdf_image_sig_output_options',
                                    array(
                                        'bgColour' => 'transparent',
                                        'penColour' => isset($field['properties']['text_color']) && $field['properties']['text_color'] ? $this->helper->load('convert')->to_hex_color($field['properties']['text_color']) : array(0x14, 0x53, 0x94),
                                    ), $element_id, $template_id
                            );

                            $model_e2pdf_signature = new Model_E2pdf_Signature();
                            $value = $model_e2pdf_signature->j_signature($value, $options);
                        } else {
                            if (isset($field['properties']['only_image']) && $field['properties']['only_image']) {
                                $value = '';
                            } else {
                                $value = $this->strip_shortcodes($value);

                                $font = false;
                                $model_e2pdf_font = new Model_E2pdf_Font();
                                if (isset($field['properties']['text_font']) && $field['properties']['text_font']) {
                                    $font = $model_e2pdf_font->get_font_path($field['properties']['text_font']);
                                }
                                if (!$font) {
                                    $font = $model_e2pdf_font->get_font_path('Noto Sans Regular');
                                }
                                if (!$font) {
                                    $font = $model_e2pdf_font->get_font_path('Noto Sans');
                                }

                                $options = apply_filters(
                                        'e2pdf_image_sig_output_options',
                                        array(
                                            'bgColour' => 'transparent',
                                            'penColour' => isset($field['properties']['text_color']) && $field['properties']['text_color'] ? $this->helper->load('convert')->to_hex_color($field['properties']['text_color']) : array(0x14, 0x53, 0x94),
                                            'font' => $font,
                                            'fontSize' => isset($field['properties']['text_font_size']) && $field['properties']['text_font_size'] ? $field['properties']['text_font_size'] : 150,
                                        ), $element_id, $template_id
                                );

                                $model_e2pdf_signature = new Model_E2pdf_Signature();
                                $value = $model_e2pdf_signature->ttf_signature($value, $options);
                            }
                        }
                    }
                }
            } elseif (isset($field['type']) && $field['type'] === 'e2pdf-qrcode') {
                $value = $this->helper->load('qrcode')->qrcode($this->strip_shortcodes($value), $field);
            } elseif (isset($field['type']) && $field['type'] === 'e2pdf-barcode') {
                $value = $this->helper->load('qrcode')->barcode($this->strip_shortcodes($value), $field);
            } else {

                if (false !== strpos($value, '[pdf_num]') || false !== strpos($value, '[e2pdf-num]')) {
                    $replace = array(
                        '[pdf_num]' => '[e2pdf-num]',
                        '[e2pdf-num]' => '',
                    );
                    if ($this->get('entry')) {
                        if (!$this->get('entry')->load_by_uid()) {
                            $this->get('entry')->save();
                        }
                        $replace['[e2pdf-num]'] = $this->get('entry')->get('pdf_num') + 1;
                    }
                    $value = str_replace(array_keys($replace), $replace, $value);
                }

                $value = $this->convert_shortcodes($value);
                $value = $this->helper->load('properties')->apply($field, $value);
            }
        }
        return apply_filters(
                'e2pdf_extension_render_shortcodes_value', $value, $element_id, $template_id, $item, $dataset, false, false
        );
    }

    /**
     * Strip unused shortcodes
     * @param string $value - Content
     * @return string - Value with removed unused shortcodes
     */
    public function strip_shortcodes($value) {
        $value = preg_replace('~(?:\[/?)[^/\]]+/?\]~s', '', $value);
        return $value;
    }

    /**
     * Convert shortcodes inside value string
     * @param string $value - Value string
     * @param bool $to - Convert From/To
     * @return string - Converted value
     */
    public function convert_shortcodes($value, $to = false, $html = false) {
        if ($value) {
            if ($to) {
                $value = str_replace('&#91;', '[', $value);
                if (!$html) {
                    $value = wp_specialchars_decode($value, ENT_QUOTES);
                }
            } else {
                $value = str_replace('[', '&#91;', $value);
            }
        }
        return $value;
    }

    public function auto() {

        $response = array();
        $elements = array();

        $elements[] = array(
            'type' => 'e2pdf-html',
            'block' => true,
            'properties' => array(
                'top' => '20',
                'left' => '20',
                'right' => '20',
                'width' => '100%',
                'height' => 'auto',
                'value' => '<h1>[e2pdf-wp key="post_title"]</h1>',
            ),
        );

        $elements[] = array(
            'type' => 'e2pdf-html',
            'block' => true,
            'properties' => array(
                'top' => '20',
                'left' => '20',
                'right' => '20',
                'width' => '100%',
                'height' => 'auto',
                'value' => __('Post name', 'e2pdf') . ': [e2pdf-wp key="post_name"]',
            ),
        );

        $elements[] = array(
            'type' => 'e2pdf-html',
            'block' => true,
            'properties' => array(
                'top' => '20',
                'left' => '20',
                'right' => '20',
                'width' => '100%',
                'height' => 'auto',
                'value' => __('Post type', 'e2pdf') . ': [e2pdf-wp key="post_type"]',
            ),
        );

        $elements[] = array(
            'type' => 'e2pdf-html',
            'block' => true,
            'properties' => array(
                'top' => '20',
                'left' => '20',
                'right' => '20',
                'width' => '100%',
                'height' => 'auto',
                'value' => __('ID', 'e2pdf') . ': [e2pdf-wp key="id"]',
            ),
        );

        $elements[] = array(
            'type' => 'e2pdf-html',
            'block' => true,
            'properties' => array(
                'top' => '20',
                'left' => '20',
                'right' => '20',
                'width' => '100%',
                'height' => 'auto',
                'value' => __('Author', 'e2pdf') . ': [e2pdf-wp key="post_author"]',
            ),
        );

        $elements[] = array(
            'type' => 'e2pdf-html',
            'block' => true,
            'properties' => array(
                'top' => '20',
                'left' => '20',
                'right' => '20',
                'width' => '100%',
                'height' => '300',
                'value' => '[e2pdf-wp key="post_content"]',
            ),
        );

        $elements[] = array(
            'type' => 'e2pdf-html',
            'block' => true,
            'properties' => array(
                'top' => '20',
                'left' => '20',
                'right' => '20',
                'width' => '100%',
                'height' => 'auto',
                'value' => __('Created', 'e2pdf') . ': [e2pdf-wp key="post_date"]',
            ),
        );

        $elements[] = array(
            'type' => 'e2pdf-html',
            'block' => true,
            'properties' => array(
                'top' => '20',
                'left' => '20',
                'right' => '20',
                'width' => '100%',
                'height' => 'auto',
                'value' => __('Modified', 'e2pdf') . ': [e2pdf-wp key="post_modified"]',
            ),
        );

        $response['page'] = array(
            'bottom' => '20',
            'top' => '20',
            'left' => '20',
            'right' => '20',
        );

        $response['elements'] = $elements;
        return $response;
    }

    public function action_elementor_widget_before_render_content($widget) {
        if ($widget && $widget->get_name() == 'shortcode') {
            $content = $widget->get_settings('shortcode');
            if ($content) {
                $widget->set_settings('shortcode', $this->filter_content($content));
            }
        }
    }

    public function action_jet_engine_listing_grid_before_render($listing_grid) {
        $this->set('queried_object', true);
    }

    public function action_jet_engine_listing_grid_after_render($listing_grid) {
        $this->set('queried_object', false);
    }

    /**
     * Delete attachments that were sent by MemberPress email 
     * https://memberpress.com/
     */
    public function action_mepr_email_sent($email, $values, $attachments) {
        $files = $this->helper->get('wordpress_attachments_mepr');
        if (is_array($files) && !empty($files)) {
            foreach ($files as $key => $file) {
                $this->helper->delete_dir(dirname($file) . '/');
            }
            $this->helper->deset('wordpress_attachments_mepr');
        }
    }

    /**
     * Search and update shortcodes for this extension inside content
     * Auto set of dataset id
     * @param string $content - Content
     * @param string $post_id - Custom Post ID
     * @return string - Content with updated shortcodes
     */
    public function filter_content($content, $post_id = false, $wp_reset_postdata = true) {
        global $post;

        if (!is_string($content) || false === strpos($content, '[')) {
            return $content;
        }

        $shortcode_tags = array(
            'e2pdf-download',
            'e2pdf-save',
            'e2pdf-view',
            'e2pdf-adobesign',
            'e2pdf-zapier',
        );

        preg_match_all('@\[([^<>&/\[\]\x00-\x20=]++)@', $content, $matches);
        $tagnames = array_intersect($shortcode_tags, $matches[1]);

        if (!empty($tagnames)) {
            $pattern = $this->helper->load('shortcode')->get_shortcode_regex($tagnames);
            preg_match_all('/' . $pattern . '/', $content, $shortcodes);
            foreach ($shortcodes[0] as $key => $shortcode_value) {
                $shortcode = array();
                $shortcode[1] = $shortcodes[1][$key];
                $shortcode[2] = $shortcodes[2][$key];
                $shortcode[3] = $shortcodes[3][$key];
                $shortcode[4] = $shortcodes[4][$key];
                $shortcode[5] = $shortcodes[5][$key];
                $shortcode[6] = $shortcodes[6][$key];

                $atts = shortcode_parse_atts($shortcode[3]);

                if (isset($atts['wp_reset_postdata'])) {
                    if ($atts['wp_reset_postdata'] == 'true') {
                        $wp_reset_postdata = true;
                    } else {
                        $wp_reset_postdata = false;
                    }
                }

                if ($wp_reset_postdata) {
                    wp_reset_postdata();
                }

                if (($shortcode[2] === 'e2pdf-save' && isset($atts['attachment']) && $atts['attachment'] == 'true') || $shortcode[2] === 'e2pdf-attachment') { // phpcs:ignore Generic.CodeAnalysis.EmptyStatement.DetectedIf
                } else {

                    if (isset($atts['id'])) {

                        $template = new Model_E2pdf_Template();
                        $template->load($atts['id']);
                        if ($template->get('extension') === 'woocommerce') {
                            continue;
                        } elseif ($template->get('extension') === 'wordpress') { // phpcs:ignore WordPress.WP.CapitalPDangit.Misspelled
                            if (!isset($atts['dataset'])) {
                                if ($this->get('queried_object') && !$post_id) {
                                    $queried_object = get_queried_object();
                                    $post_id = $queried_object && isset($queried_object->ID) ? $queried_object->ID : false;
                                }
                                if ($post_id || isset($post->ID)) {
                                    $dataset = $post_id ? $post_id : $post->ID;
                                    $atts['dataset'] = $dataset;
                                    $shortcode[3] .= ' dataset="' . $dataset . '"';
                                }
                            }
                        }
                    }

                    if (!isset($atts['apply'])) {
                        $shortcode[3] .= ' apply="true"';
                    }

                    if (!isset($atts['filter'])) {
                        $shortcode[3] .= ' filter="true"';
                    }

                    $content = str_replace($shortcode_value, do_shortcode_tag($shortcode), $content);
                }
            }
        }

        return $content;
    }

    /**
     * [e2pdf-exclude] support inside Formidable Forms View beforeContent and afterContent
     */
    public function filter_frm_filter_view($view) {
        if (isset($view->frm_before_content) && $view->frm_before_content) {
            $view->frm_before_content = str_replace('[e2pdf-exclude]', '[e2pdf-exclude apply="true"]', $view->frm_before_content);
        }
        if (isset($view->post_content) && $view->post_content) {
            $view->post_content = str_replace('[e2pdf-exclude]', '[e2pdf-exclude apply="true"]', $view->post_content);
        }
        if (isset($view->frm_after_content) && $view->frm_after_content) {
            $view->frm_after_content = str_replace('[e2pdf-exclude]', '[e2pdf-exclude apply="true"]', $view->frm_after_content);
        }
        return $view;
    }

    public function filter_vc_map_get_attributes($atts, $tag) {
        if ($tag == 'vc_single_image' && ((isset($atts['onclick']) && $atts['onclick'] == 'custom_link') || (empty($atts['onclick']) && (!isset($atts['img_link_large']) || 'yes' !== $atts['img_link_large'] ))) && (!empty($atts['link']) || !empty($atts['img_link']))) {

            if (!empty($atts['link'])) {
                $atts['link'] = $this->filter_content($atts['link']);
            }

            if (!empty($atts['img_link'])) {
                $atts['img_link'] = $this->filter_content($atts['img_link']);
            }
        }
        return $atts;
    }

    public function filter_themify_builder_module_content($content) {
        if ($content) {
            $content = $this->filter_content($content);
        }
        return $content;
    }

    public function filter_vc_basic_grid_items_list($items) {
        if ($items) {
            $items = $this->filter_content($items);
        }
        return $items;
    }

    public function filter_the_content($content, $post_id = false) {
        $content = $this->filter_content($content, $post_id);
        return $content;
    }

    public function filter_content_custom($content) {
        $content = $this->filter_content($content);
        return $content;
    }

    public function filter_content_loop($content) {
        $content = $this->filter_content($content, false, false);
        return $content;
    }

    /**
     * Memberpress Mail attachments filter
     * https://memberpress.com/
     */
    public function filter_mepr_email_send_attachments($attachments, $mail, $body, $values) {

        $message = '';
        if ($body) {
            $message = $body;
        } else {
            $message = $mail->body();
        }

        if ($message && false !== strpos($message, '[')) {

            $message = $mail->replace_variables($message, $values);

            $shortcode_tags = array(
                'e2pdf-attachment',
                'e2pdf-save',
            );

            preg_match_all('@\[([^<>&/\[\]\x00-\x20=]++)@', $message, $matches);
            $tagnames = array_intersect($shortcode_tags, $matches[1]);

            if (!empty($tagnames)) {

                $pattern = $this->helper->load('shortcode')->get_shortcode_regex($tagnames);
                preg_match_all('/' . $pattern . '/', $message, $shortcodes);

                foreach ($shortcodes[0] as $key => $shortcode_value) {
                    $shortcode = array();
                    $shortcode[1] = $shortcodes[1][$key];
                    $shortcode[2] = $shortcodes[2][$key];
                    $shortcode[3] = $shortcodes[3][$key];
                    $shortcode[4] = $shortcodes[4][$key];
                    $shortcode[5] = $shortcodes[5][$key];
                    $shortcode[6] = $shortcodes[6][$key];

                    $atts = shortcode_parse_atts($shortcode[3]);

                    $file = false;
                    if (isset($atts['id']) && isset($atts['dataset'])) {
                        if (!isset($atts['apply'])) {
                            $shortcode[3] .= ' apply="true"';
                        }
                        if (!isset($atts['filter'])) {
                            $shortcode[3] .= ' filter="true"';
                        }

                        if (($shortcode[2] === 'e2pdf-save' && isset($atts['attachment']) && $atts['attachment'] == 'true') || $shortcode[2] === 'e2pdf-attachment') {
                            $file = do_shortcode_tag($shortcode);
                            if ($file) {
                                $tmp = false;
                                if (substr($file, 0, 4) === 'tmp:') {
                                    $file = substr($file, 4);
                                    $tmp = true;
                                }
                                if ($shortcode[2] === 'e2pdf-save' || isset($atts['pdf'])) {
                                    if ($tmp) {
                                        $this->helper->add('wordpress_attachments_mepr', $file);
                                    }
                                } else {
                                    $this->helper->add('wordpress_attachments_mepr', $file);
                                }
                                $attachments[] = $file;
                            }
                        }
                    }
                }
            }
        }

        return $attachments;
    }

    /**
     * Thrive Theme Builder dynamic shortcode support
     */
    public function filter_thrive_theme_template_content($html) {
        add_filter('e2pdf_model_shortcode_e2pdf_download_atts', array($this, 'filter_global_post_id'));
        add_filter('e2pdf_model_shortcode_e2pdf_view_atts', array($this, 'filter_global_post_id'));
        add_filter('e2pdf_model_shortcode_e2pdf_save_atts', array($this, 'filter_global_post_id'));
        add_filter('e2pdf_model_shortcode_e2pdf_zapier_atts', array($this, 'filter_global_post_id'));
        return $html;
    }

    /**
     * Dynamic Post ID support
     */
    public function filter_global_post_id($atts) {
        if (!isset($atts['dataset']) && isset($atts['id'])) {
            $template_id = isset($atts['id']) ? (int) $atts['id'] : 0;
            $template = new Model_E2pdf_Template();
            if ($template->load($template_id, false)) {
                if ($template->get('extension') === 'wordpress') { // phpcs:ignore WordPress.WP.CapitalPDangit.Misspelled
                    global $post;
                    if (isset($post->ID)) {
                        $atts['dataset'] = (string) $post->ID;
                        if (!isset($atts['apply'])) {
                            $atts['apply'] = 'true';
                        }
                        if (!isset($atts['filter'])) {
                            $atts['filter'] = 'true';
                        }
                    }
                }
            }
        }
        return $atts;
    }

    /**
     * Verify if item and dataset exists
     * @return bool - item and dataset exists
     */
    public function verify() {
        if ($this->get('item') && $this->get('dataset') && get_post($this->get('dataset')) && $this->get('item') == get_post_type($this->get('dataset'))) {
            return true;
        }
        return false;
    }

    /**
     * Init Visual Mapper data
     * @return bool|string - HTML data source for Visual Mapper
     */
    public function visual_mapper() {

        $vc = '';

        $vc .= '<h3 class="e2pdf-plr5">' . __('Common', 'e2pdf') . '</h3>';
        $vc .= '<div class="e2pdf-grid">';
        $vc .= '<div class="e2pdf-ib e2pdf-w50 e2pdf-vm-item">' . $this->get_vm_element(__('ID', 'e2pdf'), 'e2pdf-wp key="id"') . '</div>';
        $vc .= '<div class="e2pdf-ib e2pdf-w50 e2pdf-vm-item">' . $this->get_vm_element(__('Author', 'e2pdf'), 'e2pdf-wp key="post_author"') . '</div>';
        $vc .= '<div class="e2pdf-ib e2pdf-w50 e2pdf-vm-item">' . $this->get_vm_element(__('Author ID', 'e2pdf'), 'e2pdf-wp key="post_author_id"') . '</div>';
        $vc .= '<div class="e2pdf-ib e2pdf-w50 e2pdf-vm-item">' . $this->get_vm_element(__('Date', 'e2pdf'), 'e2pdf-wp key="post_date"') . '</div>';
        $vc .= '<div class="e2pdf-ib e2pdf-w50 e2pdf-vm-item">' . $this->get_vm_element(__('Date (GMT)', 'e2pdf'), 'e2pdf-wp key="post_date_gmt"') . '</div>';
        $vc .= '<div class="e2pdf-ib e2pdf-w50 e2pdf-vm-item">' . $this->get_vm_element(__('Content', 'e2pdf'), 'e2pdf-wp key="post_content"') . '</div>';
        $vc .= '<div class="e2pdf-ib e2pdf-w50 e2pdf-vm-item">' . $this->get_vm_element(__('Title', 'e2pdf'), 'e2pdf-wp key="post_title"') . '</div>';
        $vc .= '<div class="e2pdf-ib e2pdf-w50 e2pdf-vm-item">' . $this->get_vm_element(__('Excerpt', 'e2pdf'), 'e2pdf-wp key="post_excerpt"') . '</div>';
        $vc .= '<div class="e2pdf-ib e2pdf-w50 e2pdf-vm-item">' . $this->get_vm_element(__('Status', 'e2pdf'), 'e2pdf-wp key="post_status"') . '</div>';
        $vc .= '<div class="e2pdf-ib e2pdf-w50 e2pdf-vm-item">' . $this->get_vm_element(__('Comment Status', 'e2pdf'), 'e2pdf-wp key="comment_status"') . '</div>';
        $vc .= '<div class="e2pdf-ib e2pdf-w50 e2pdf-vm-item">' . $this->get_vm_element(__('Ping Status', 'e2pdf'), 'e2pdf-wp key="ping_status"') . '</div>';
        $vc .= '<div class="e2pdf-ib e2pdf-w50 e2pdf-vm-item">' . $this->get_vm_element(__('Password', 'e2pdf'), 'e2pdf-wp key="post_password"') . '</div>';
        $vc .= '<div class="e2pdf-ib e2pdf-w50 e2pdf-vm-item">' . $this->get_vm_element(__('Name', 'e2pdf'), 'e2pdf-wp key="post_name"') . '</div>';
        $vc .= '<div class="e2pdf-ib e2pdf-w50 e2pdf-vm-item">' . $this->get_vm_element(__('To Ping', 'e2pdf'), 'e2pdf-wp key="to_ping"') . '</div>';
        $vc .= '<div class="e2pdf-ib e2pdf-w50 e2pdf-vm-item">' . $this->get_vm_element(__('Ping', 'e2pdf'), 'e2pdf-wp key="pinged"') . '</div>';
        $vc .= '<div class="e2pdf-ib e2pdf-w50 e2pdf-vm-item">' . $this->get_vm_element(__('Modified Date', 'e2pdf'), 'e2pdf-wp key="post_modified"') . '</div>';
        $vc .= '<div class="e2pdf-ib e2pdf-w50 e2pdf-vm-item">' . $this->get_vm_element(__('Modified Date (GMT)', 'e2pdf'), 'e2pdf-wp key="post_modified_gmt"') . '</div>';
        $vc .= '<div class="e2pdf-ib e2pdf-w50 e2pdf-vm-item">' . $this->get_vm_element(__('Filtered Content', 'e2pdf'), 'e2pdf-wp key="post_content_filtered"') . '</div>';
        $vc .= '<div class="e2pdf-ib e2pdf-w50 e2pdf-vm-item">' . $this->get_vm_element(__('Parent ID', 'e2pdf'), 'e2pdf-wp key="post_parent"') . '</div>';
        $vc .= '<div class="e2pdf-ib e2pdf-w50 e2pdf-vm-item">' . $this->get_vm_element(__('GUID', 'e2pdf'), 'e2pdf-wp key="guid"') . '</div>';
        $vc .= '<div class="e2pdf-ib e2pdf-w50 e2pdf-vm-item">' . $this->get_vm_element(__('Menu Order', 'e2pdf'), 'e2pdf-wp key="menu_order"') . '</div>';
        $vc .= '<div class="e2pdf-ib e2pdf-w50 e2pdf-vm-item">' . $this->get_vm_element(__('Type', 'e2pdf'), 'e2pdf-wp key="post_type"') . '</div>';
        $vc .= '<div class="e2pdf-ib e2pdf-w50 e2pdf-vm-item">' . $this->get_vm_element(__('Mime Type', 'e2pdf'), 'e2pdf-wp key="post_mime_type"') . '</div>';
        $vc .= '<div class="e2pdf-ib e2pdf-w50 e2pdf-vm-item">' . $this->get_vm_element(__('Comments Count', 'e2pdf'), 'e2pdf-wp key="comment_count"') . '</div>';
        $vc .= '<div class="e2pdf-ib e2pdf-w50 e2pdf-vm-item">' . $this->get_vm_element(__('Filter', 'e2pdf'), 'e2pdf-wp key="filter"') . '</div>';
        $vc .= '<div class="e2pdf-ib e2pdf-w50 e2pdf-vm-item">' . $this->get_vm_element(__('Post Thumbnail', 'e2pdf'), 'e2pdf-wp key="get_the_post_thumbnail"') . '</div>';
        $vc .= '<div class="e2pdf-ib e2pdf-w50 e2pdf-vm-item">' . $this->get_vm_element(__('Post Thumbnail URL', 'e2pdf'), 'e2pdf-wp key="get_the_post_thumbnail_url"') . '</div>';
        $vc .= '<div class="e2pdf-ib e2pdf-w50 e2pdf-vm-item">' . $this->get_vm_element(__('Permalink', 'e2pdf'), 'e2pdf-wp key="get_permalink"') . '</div>';
        $vc .= '<div class="e2pdf-ib e2pdf-w50 e2pdf-vm-item">' . $this->get_vm_element(__('Post Permalink', 'e2pdf'), 'e2pdf-wp key="get_post_permalink"') . '</div>';
        $vc .= '</div>';

        $meta_keys = $this->get_post_meta_keys();
        if (!empty($meta_keys)) {
            $vc .= "<h3 class='e2pdf-plr5'>" . __('Meta Keys', 'e2pdf') . '</h3>';
            $vc .= "<div class='e2pdf-grid'>";
            foreach ($meta_keys as $meta_key) {
                $vc .= '<div class="e2pdf-ib e2pdf-w50 e2pdf-vm-item">' . $this->get_vm_element($meta_key, 'e2pdf-wp key="' . $meta_key . '" meta="true"') . '</div>';
            }
            $vc .= '</div>';
        }

        $meta_keys = $this->get_post_taxonomy_keys();
        if (!empty($meta_keys)) {
            $vc .= "<h3 class='e2pdf-plr5'>" . __('Taxonomy', 'e2pdf') . '</h3>';
            $vc .= "<div class='e2pdf-grid'>";
            foreach ($meta_keys as $meta_key) {
                $vc .= '<div class="e2pdf-ib e2pdf-w50 e2pdf-vm-item">' . $this->get_vm_element($meta_key, 'e2pdf-wp key="' . $meta_key . '" terms="true"') . '</div>';
            }
            $vc .= '</div>';
        }

        $vc .= "<h3 class='e2pdf-plr5'>" . __('User', 'e2pdf') . '</h3>';
        $vc .= "<div class='e2pdf-grid'>";
        $vc .= '<div class="e2pdf-ib e2pdf-w50 e2pdf-vm-item">' . $this->get_vm_element(__('ID', 'e2pdf'), 'e2pdf-user key="ID"') . '</div>';
        $vc .= '<div class="e2pdf-ib e2pdf-w50 e2pdf-vm-item">' . $this->get_vm_element(__('Login', 'e2pdf'), 'e2pdf-user key="user_login"') . '</div>';
        $vc .= '<div class="e2pdf-ib e2pdf-w50 e2pdf-vm-item">' . $this->get_vm_element(__('Nicename', 'e2pdf'), 'e2pdf-user key="user_nicename"') . '</div>';
        $vc .= '<div class="e2pdf-ib e2pdf-w50 e2pdf-vm-item">' . $this->get_vm_element(__('Email', 'e2pdf'), 'e2pdf-user key="user_email"') . '</div>';
        $vc .= '<div class="e2pdf-ib e2pdf-w50 e2pdf-vm-item">' . $this->get_vm_element(__('Url', 'e2pdf'), 'e2pdf-user key="user_url"') . '</div>';
        $vc .= '<div class="e2pdf-ib e2pdf-w50 e2pdf-vm-item">' . $this->get_vm_element(__('Registered', 'e2pdf'), 'e2pdf-user key="user_registered"') . '</div>';
        $vc .= '<div class="e2pdf-ib e2pdf-w50 e2pdf-vm-item">' . $this->get_vm_element(__('Display Name', 'e2pdf'), 'e2pdf-user key="display_name"') . '</div>';
        $vc .= '<div class="e2pdf-ib e2pdf-w50 e2pdf-vm-item">' . $this->get_vm_element(__('Roles', 'e2pdf'), 'e2pdf-user key="roles"') . '</div>';
        $vc .= '<div class="e2pdf-ib e2pdf-w50 e2pdf-vm-item">' . $this->get_vm_element(__('Avatar', 'e2pdf'), 'e2pdf-user key="get_avatar"') . '</div>';
        $vc .= '<div class="e2pdf-ib e2pdf-w50 e2pdf-vm-item">' . $this->get_vm_element(__('Avatar Url', 'e2pdf'), 'e2pdf-user key="get_avatar_url"') . '</div>';
        $vc .= '</div>';

        $meta_keys = $this->get_user_meta_keys();
        if (!empty($meta_keys)) {
            $vc .= "<h3 class='e2pdf-plr5'>" . __('User Meta Keys', 'e2pdf') . '</h3>';
            $vc .= "<div class='e2pdf-grid'>";
            foreach ($meta_keys as $meta_key) {
                $vc .= '<div class="e2pdf-ib e2pdf-w50 e2pdf-vm-item">' . $this->get_vm_element($meta_key, 'e2pdf-user key="' . $meta_key . '" meta="true"') . '</div>';
            }
            $vc .= '</div>';
        }

        return $vc;
    }

    private function get_post_meta_keys() {
        global $wpdb;
        $meta_keys = array();
        if ($this->get('item')) {
            $condition = array(
                'p.post_type' => array(
                    'condition' => '=',
                    'value' => $this->get('item'),
                    'type' => '%s',
                ),
            );
            $order_condition = array(
                'orderby' => 'meta_key',
                'order' => 'desc',
            );
            $where = $this->helper->load('db')->prepare_where($condition);
            $orderby = $this->helper->load('db')->prepare_orderby($order_condition);
            $meta_keys = $wpdb->get_col($wpdb->prepare('SELECT DISTINCT `meta_key` FROM ' . $wpdb->postmeta . ' `pm` LEFT JOIN ' . $wpdb->posts . ' `p` ON (`p`.`ID` = `pm`.`post_ID`) ' . $where['sql'] . $orderby . '', $where['filter']));
        }
        return $meta_keys;
    }

    private function get_user_meta_keys() {
        global $wpdb;
        $meta_keys = array();
        if ($this->get('item')) {
            $order_condition = array(
                'orderby' => 'meta_key',
                'order' => 'desc',
            );
            $orderby = $this->helper->load('db')->prepare_orderby($order_condition);
            $meta_keys = $wpdb->get_col($wpdb->prepare('SELECT DISTINCT `meta_key` FROM ' . $wpdb->usermeta . ' ' . $orderby . ''));
        }
        return $meta_keys;
    }

    private function get_post_taxonomy_keys() {
        global $wpdb;
        $meta_keys = array();
        if ($this->get('item')) {
            $order_condition = array(
                'orderby' => 'taxonomy',
                'order' => 'desc',
            );
            $orderby = $this->helper->load('db')->prepare_orderby($order_condition);
            $meta_keys = $wpdb->get_col($wpdb->prepare('SELECT DISTINCT `taxonomy` FROM ' . $wpdb->term_taxonomy . ' `t` ' . $orderby . ''));
        }
        return $meta_keys;
    }

    private function get_vm_element($name, $id) {
        $element = '<div>';
        $element .= '<label>' . $name . ':</label>';
        $element .= '<input type="text" name=\'[' . $id . ']\' value=\'[' . $id . ']\' class="e2pdf-w100">';
        $element .= '</div>';
        return $element;
    }
}

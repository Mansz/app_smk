<?php

/**
 * E2Pdf Divi Extension
 * @copyright  Copyright 2017 https://e2pdf.com
 * @license    GPLv3
 * @version    1
 * @link       https://e2pdf.com
 * @since      0.00.01
 */
if (!defined('ABSPATH')) {
    die('Access denied.');
}

class Extension_E2pdf_Divi extends Model_E2pdf_Model {

    private $options;
    private $info = array(
        'key' => 'divi',
        'title' => 'Divi Forms',
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
        if (file_exists(get_template_directory() . '/et-pagebuilder/et-pagebuilder.php')) {
            return true;
        } else {
            if (defined('E2PDF_DIVI_EXTENSION') || $this->helper->load('extension')->is_plugin_active('divi-builder/divi-builder.php')) {
                return true;
            }
        }
        return false;
    }

    /**
     * Set option
     * @param string $attr - Key of option
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
        global $wpdb;

        $condition = array(
            'post_content' => array(
                'condition' => 'LIKE',
                'value' => '%et_pb_contact_form%',
                'type' => '%s',
            ),
            'post_type' => array(
                'condition' => '<>',
                'value' => array(
                    'revision',
                    'et_pb_layout',
                ),
                'type' => '%s',
            ),
        );
        $order_condition = array(
            'orderby' => 'id',
            'order' => 'desc',
        );
        $where = $this->helper->load('db')->prepare_where($condition);
        $orderby = $this->helper->load('db')->prepare_orderby($order_condition);
        $posts = $wpdb->get_results($wpdb->prepare('SELECT * FROM ' . $wpdb->prefix . 'posts' . $where['sql'] . $orderby . '', $where['filter']));

        $content = array();
        foreach ($posts as $key => $post) {
            foreach ($this->get_forms($post->post_content) as $form_key => $form_value) {
                $content[] = $this->item($form_key);
            }
        }
        return $content;
    }

    /**
     * Parse available forms from pages
     * @param string $content - Page content
     * @return array() - Forms list
     */
    public function get_forms($content) {
        $forms = array();
        if (false !== strpos($content, 'et_pb_contact_form')) {
            $shortcode_tags = array(
                'et_pb_contact_form',
            );
            preg_match_all('@\[([^<>&/\[\]\x00-\x20=]++)@', $content, $matches);
            $tagnames = array_intersect($shortcode_tags, $matches[1]);
            if (!empty($tagnames)) {
                $pattern = $this->helper->load('shortcode')->get_shortcode_regex($tagnames);
                preg_match_all("/$pattern/", $content, $shortcodes);
                foreach ($shortcodes[0] as $key => $shortcode_value) {
                    $shortcode = array();
                    $shortcode[1] = $shortcodes[1][$key];
                    $shortcode[2] = $shortcodes[2][$key];
                    $shortcode[3] = $shortcodes[3][$key];
                    $shortcode[4] = $shortcodes[4][$key];
                    $shortcode[5] = $shortcodes[5][$key];
                    $shortcode[6] = $shortcodes[6][$key];
                    preg_match_all('/admin_label="(.*?)"/', $shortcode[3], $labels);
                    if (isset($labels['1'])) {
                        foreach ($labels['1'] as $label) {
                            $forms[$label] = $label;
                        }
                    }
                }
            }
        }
        return $forms;
    }

    /**
     * Get entries for export
     * @param string $item - Item
     * @param string $name - Entries names
     * @return array() - Entries list
     */
    public function datasets($item = false, $name = false) {
        global $wpdb;

        $datasets = array();
        if ($item) {
            $condition = array(
                'extension' => array(
                    'condition' => '=',
                    'value' => 'divi',
                    'type' => '%s',
                ),
                'item' => array(
                    'condition' => '=',
                    'value' => $item,
                    'type' => '%s',
                ),
            );
            $order_condition = array(
                'orderby' => 'ID',
                'order' => 'desc',
            );
            $where = $this->helper->load('db')->prepare_where($condition);
            $orderby = $this->helper->load('db')->prepare_orderby($order_condition);
            $datasets_tmp = $wpdb->get_results($wpdb->prepare('SELECT * FROM ' . $wpdb->prefix . 'e2pdf_datasets' . $where['sql'] . $orderby . '', $where['filter']));

            if ($datasets_tmp) {
                $this->set('item', $item);
                foreach ($datasets_tmp as $key => $dataset) {
                    $this->set('dataset', $dataset->ID);
                    $dataset_title = $this->render($name);
                    if (!$dataset_title) {
                        $dataset_title = $dataset->ID;
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
            return;
        }
        $actions = new stdClass();
        $actions->view = false;
        $actions->delete = true;
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
        $actions->delete = true;
        return $actions;
    }

    /**
     * Get item
     * @param string $item - Item
     * @return object - Item
     */
    public function item($item = false) {

        $form = new stdClass();

        if (!$item && $this->get('item')) {
            $item = $this->get('item');
        }

        if ($item) {
            $form->id = (string) $item;
            $form->name = $item;
            $post = $this->get_post($item);
            if (isset($post->ID)) {
                $form->url = $this->helper->get_url(
                        array(
                            'post' => $post->ID,
                            'action' => 'edit',
                        ), 'post.php?'
                );
            } else {
                $form->url = 'javascript:void(0);';
            }
        } else {
            $form->id = '';
            $form->name = '';
            $form->url = 'javascript:void(0);';
        }
        return $form;
    }

    /**
     * Get post
     * @param string $item - Form label
     * @return object - Post
     */
    public function get_post($item = false) {
        global $wpdb;

        $item_post = false;

        $condition = array(
            'post_content' => array(
                'condition' => 'LIKE',
                'value' => '%admin_label="' . $item . '"%',
                'type' => '%s',
            ),
            'post_type' => array(
                'condition' => '<>',
                'value' => array(
                    'revision',
                    'et_pb_layout',
                ),
                'type' => '%s',
            ),
        );

        $order_condition = array(
            'orderby' => 'id',
            'order' => 'desc',
        );

        $where = $this->helper->load('db')->prepare_where($condition);
        $orderby = $this->helper->load('db')->prepare_orderby($order_condition);

        $posts = $wpdb->get_results($wpdb->prepare('SELECT * FROM ' . $wpdb->prefix . 'posts' . $where['sql'] . $orderby . '', $where['filter']));
        foreach ($posts as $key => $post) {
            if (in_array($item, $this->get_forms($post->post_content))) {
                $item_post = $post;
                break;
            }
        }
        return $item_post;
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
        global $wpdb;

        $dataset = $this->get('dataset');
        $item = $this->get('item');
        $user_id = $this->get('user_id');
        $args = $this->get('args');
        $template_id = $this->get('template_id') ? $this->get('template_id') : false;
        $element_id = isset($field['element_id']) ? $field['element_id'] : false;

        if ($this->verify()) {

            $args = apply_filters('e2pdf_extension_render_shortcodes_args', $args, $element_id, $template_id, $item, $dataset, false, false);

            $condition = array(
                'ID' => array(
                    'condition' => '=',
                    'value' => $dataset,
                    'type' => '%d',
                ),
                'item' => array(
                    'condition' => '=',
                    'value' => $item,
                    'type' => '%s',
                ),
                'extension' => array(
                    'condition' => '=',
                    'value' => 'divi',
                    'type' => '%s',
                ),
            );

            $where = $this->helper->load('db')->prepare_where($condition);
            $entry = $wpdb->get_row($wpdb->prepare('SELECT * FROM ' . $wpdb->prefix . 'e2pdf_datasets' . $where['sql'] . '', $where['filter']));

            if ($entry) {
                $post = @unserialize($entry->entry, array('allowed_classes' => false));
                $processed_fields_values = array();
                if ($post && is_array($post)) {
                    $et_contact_proccess = array_search('et_contact_proccess', $post);
                    $et_pb_contact_form_num = $et_contact_proccess === false ? 0 : str_replace('et_pb_contactform_submit_', '', $et_contact_proccess);
                    $current_form_fields = isset($post['et_pb_contact_email_fields_' . $et_pb_contact_form_num]) ? $post['et_pb_contact_email_fields_' . $et_pb_contact_form_num] : '';
                    if ('' !== $current_form_fields) {
                        $fields_data_json = str_replace('\\', '', $current_form_fields);
                        $fields_data_array = json_decode($fields_data_json, true);
                        if (!empty($fields_data_array)) {
                            foreach ($fields_data_array as $index => $field_value) {
                                $processed_fields_values[$field_value['original_id']]['value'] = isset($post[$field_value['field_id']]) ? $post[$field_value['field_id']] : '';
                                $processed_fields_values[$field_value['original_id']]['label'] = $field_value['field_label'];
                                if (
                                        (
                                        (isset($post[$field_value['field_id'] . '_is_signature_pad']) && $post[$field_value['field_id'] . '_is_signature_pad'] == 'yes') ||
                                        (isset($post[$field_value['field_id'] . '_is_file']) && $post[$field_value['field_id'] . '_is_file'] == 'yes')
                                        ) && $processed_fields_values[$field_value['original_id']]['value']
                                ) {
                                    $subdir = isset($post['_subdir']) ? $post['_subdir'] : '';
                                    if (isset($post['_save_files_to_media']) && $post['_save_files_to_media'] == 'on') {
                                        if ($subdir && !file_exists(path_join(wp_upload_dir()['basedir'] . $subdir, $processed_fields_values[$field_value['original_id']]['value'])) && preg_match('/^\/\d{4}\/\d{2}$/', $subdir)) {
                                            $tmpsubdir = '/' . date('Y/m', strtotime(str_replace('/', '-', ltrim($subdir, '/')) . " -1 month"));
                                            if (file_exists(path_join(wp_upload_dir()['basedir'] . $tmpsubdir, $processed_fields_values[$field_value['original_id']]['value']))) {
                                                $subdir = $tmpsubdir;
                                            }
                                        }
                                        $processed_fields_values[$field_value['original_id']]['value'] = path_join(wp_upload_dir()['baseurl'] . $subdir, $processed_fields_values[$field_value['original_id']]['value']);
                                    } else {
                                        $contact_form_id = isset($post['_unique_id']) ? $post['_unique_id'] : '';
                                        if (function_exists('pwh_dcfh_file_helpers') && $contact_form_id) {
                                            if ($subdir && !file_exists(pwh_dcfh_file_helpers()::get_form_upload_dir($contact_form_id, $subdir, $processed_fields_values[$field_value['original_id']]['value'])) && preg_match('/^\d{4}\/\d{2}$/', $subdir)) {
                                                $tmpsubdir = date('Y/m', strtotime(str_replace('/', '-', ltrim($subdir, '/')) . " -1 month"));
                                                if (file_exists(pwh_dcfh_file_helpers()::get_form_upload_dir($contact_form_id, $tmpsubdir, $processed_fields_values[$field_value['original_id']]['value']))) {
                                                    $subdir = $tmpsubdir;
                                                }
                                            }
                                            $processed_fields_values[$field_value['original_id']]['value'] = pwh_dcfh_file_helpers()::get_form_upload_url($contact_form_id, $subdir, $processed_fields_values[$field_value['original_id']]['value']);
                                        } else {
                                            $processed_fields_values[$field_value['original_id']]['value'] = '';
                                        }
                                    }
                                }
                            }
                        }
                    }

                    if (!isset($processed_fields_values['_wp_http_referer'])) {
                        $processed_fields_values['_wp_http_referer'] = array(
                            'value' => isset($post['_wp_http_referer']) ? $post['_wp_http_referer'] : '',
                            'label' => '_wp_http_referer',
                        );
                    }

                    if (!isset($processed_fields_values['e2pdf_entry_id'])) {
                        $processed_fields_values['e2pdf_entry_id'] = array(
                            'value' => (int) $dataset,
                            'label' => 'e2pdf_entry_id',
                        );
                    }
                }
                $meta_data = array();
                foreach ($processed_fields_values as $field_key => $field_value) {
                    $meta_data['%%' . $field_key . '%%'] = $field_value['value'];
                }
                if (false !== strpos($value, '[')) {

                    $replace = array(
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
                                                    'e2pdf_extension_divi_render_shortcodes_site_url',
                                                )
                                        )
                                );
                            }
                        }
                        $replace['[e2pdf-url]'] = $pdf_url;
                    }
                    $value = str_replace(array_keys($replace), $replace, $value);

                    $shortcode_tags = array(
                        'e2pdf-user',
                        'e2pdf-arg',
                    );
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

                            $atts = shortcode_parse_atts($shortcode[3]);

                            if ($shortcode[2] === 'e2pdf-user') {
                                if (!isset($atts['id']) && $user_id) {
                                    $shortcode[3] .= ' id="' . $user_id . '"';
                                    $value = str_replace($shortcode_value, '[' . $shortcode[2] . $shortcode[3] . ']', $value);
                                } elseif (isset($atts['id']) && $atts['id'] == 'dynamic' && substr($shortcode_value, -13) === '[/e2pdf-user]') {
                                    if ($shortcode[5]) {
                                        $shortcode[5] = $this->render($shortcode[5], array(), false);
                                    }
                                    $value = str_replace($shortcode_value, '[e2pdf-user' . $shortcode[3] . ']' . $shortcode[5] . '[/e2pdf-user]', $value);
                                }
                            } elseif ($shortcode[2] === 'e2pdf-arg') {
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

                $value = apply_filters('e2pdf_extension_render_shortcodes_pre_do_shortcode', $value, $element_id, $template_id, $item, $dataset, false, false);
                $value = do_shortcode($value);
                $value = apply_filters('e2pdf_extension_render_shortcodes_after_do_shortcode', $value, $element_id, $template_id, $item, $dataset, false, false);

                if ($entry) {
                    $value = $this->helper->load('convert')->stritr($value, $meta_data);
                }

                $value = apply_filters('e2pdf_extension_render_shortcodes_pre_value', $value, $element_id, $template_id, $item, $dataset, false, false);

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
        $value = preg_replace('~%%[^%%]*%%~', '', $value);
        return $value;
    }

    /**
     * Convert "shortcodes" inside value string
     * @param string $value - Value string
     * @param bool $to - Convert From/To
     * @return string - Converted value
     */
    public function convert_shortcodes($value, $to = false, $html = false) {
        if ($value) {
            if ($to) {
                $value = stripslashes_deep($value);
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

        if ($this->get('item')) {
            $post = $this->get_post($this->get('item'));
            if ($post && isset($post->post_content)) {

                $content = $post->post_content;

                if (false !== strpos($content, '[')) {
                    $shortcode_tags = array(
                        'et_pb_contact_form',
                    );

                    preg_match_all('@\[([^<>&/\[\]\x00-\x20=]++)@', $content, $matches);
                    $tagnames = array_intersect($shortcode_tags, $matches[1]);

                    if (!empty($tagnames)) {

                        $pattern = $this->helper->load('shortcode')->get_shortcode_regex($tagnames);

                        preg_match_all("/$pattern/", $content, $shortcodes);

                        foreach ($shortcodes[0] as $key => $shortcode_value) {

                            $shortcode = array();
                            $shortcode[1] = $shortcodes[1][$key];
                            $shortcode[2] = $shortcodes[2][$key];
                            $shortcode[3] = $shortcodes[3][$key];
                            $shortcode[4] = $shortcodes[4][$key];
                            $shortcode[5] = $shortcodes[5][$key];
                            $shortcode[6] = $shortcodes[6][$key];

                            $atts = shortcode_parse_atts($shortcode[3]);
                            if (isset($atts['admin_label']) && $atts['admin_label'] == $this->get('item') && defined('ET_BUILDER_DIR')) {

                                require_once ET_BUILDER_DIR . 'class-et-builder-element.php';
                                require_once ET_BUILDER_DIR . 'functions.php';
                                require_once ET_BUILDER_DIR . 'ab-testing.php';
                                require_once ET_BUILDER_DIR . 'class-et-global-settings.php';
                                if (file_exists(ET_BUILDER_DIR . 'module/type/WithSpamProtection.php')) {
                                    require_once ET_BUILDER_DIR . 'module/type/WithSpamProtection.php';
                                }
                                require_once ET_BUILDER_DIR . 'module/ContactForm.php';
                                require_once ET_BUILDER_DIR . 'module/ContactFormItem.php';

                                new ET_Builder_Module_Contact_Form();
                                new ET_Builder_Module_Contact_Form_Item();

                                $source = do_shortcode($shortcode_value);

                                libxml_use_internal_errors(true);
                                $dom = new DOMDocument();
                                if (function_exists('mb_convert_encoding')) {
                                    $html = $dom->loadHTML(mb_convert_encoding($source, 'HTML-ENTITIES', 'UTF-8'));
                                } else {
                                    $html = $dom->loadHTML('<?xml encoding="UTF-8">' . $source);
                                }
                                libxml_clear_errors();

                                if ($html) {

                                    $xml = $this->helper->load('xml');
                                    $xml->set('dom', $dom);
                                    $xpath = new DomXPath($dom);

                                    $blocks = $xpath->query("//*[contains(@class, 'et_pb_contact_field')]");
                                    foreach ($blocks as $element) {

                                        if ($xml->get_node_value($element, 'data-type') == 'radio') {

                                            $label = $xpath->query('.//label', $element)->item(0);
                                            $check_handler = $xpath->query(".//input[contains(@class, 'et_pb_checkbox_handle')]", $element)->item(0);

                                            $name = '';
                                            if ($check_handler) {
                                                $name = '%%' . $xml->get_node_value($check_handler, 'data-original_id') . '%%';
                                            }

                                            if ($label) {
                                                $elements[] = $this->auto_field(
                                                        $element,
                                                        array(
                                                            'type' => 'e2pdf-html',
                                                            'block' => true,
                                                            'class' => $xml->get_node_value($element, 'class'),
                                                            'properties' => array(
                                                                'top' => '20',
                                                                'left' => '20',
                                                                'right' => '20',
                                                                'width' => '100%',
                                                                'height' => 'auto',
                                                                'value' => $label->nodeValue,
                                                            ),
                                                        )
                                                );
                                            }

                                            $fields = $xpath->query("//*[contains(@class, 'et_pb_contact_field_radio')]", $element);
                                            foreach ($fields as $field) {
                                                $radio_label = $xpath->query('.//label', $field)->item(0);
                                                $radio = $xpath->query(".//input[@type='radio']", $field)->item(0);

                                                if (
                                                        $radio->attributes->getNamedItem('data-original_id') &&
                                                        $radio->attributes->getNamedItem('value')
                                                ) {
                                                    $elements[] = $this->auto_field(
                                                            $field,
                                                            array(
                                                                'type' => 'e2pdf-radio',
                                                                'class' => $xml->get_node_value($field, 'class'),
                                                                'properties' => array(
                                                                    'top' => '5',
                                                                    'width' => 'auto',
                                                                    'height' => 'auto',
                                                                    'value' => '%%' . $xml->get_node_value($radio, 'data-original_id') . '%%',
                                                                    'option' => $xml->get_node_value($radio, 'value'),
                                                                    'group' => '%%' . $xml->get_node_value($radio, 'data-original_id') . '%%',
                                                                ),
                                                            )
                                                    );
                                                }

                                                if ($radio_label) {
                                                    $elements[] = $this->auto_field(
                                                            $radio,
                                                            array(
                                                                'type' => 'e2pdf-html',
                                                                'float' => true,
                                                                'class' => $xml->get_node_value($radio, 'class'),
                                                                'properties' => array(
                                                                    'left' => '5',
                                                                    'width' => '100%',
                                                                    'height' => 'auto',
                                                                    'value' => $radio_label->nodeValue,
                                                                ),
                                                            )
                                                    );
                                                }
                                            }
                                        } elseif ($xml->get_node_value($element, 'data-type') == 'checkbox') {

                                            $label = $xpath->query('.//label', $element)->item(0);
                                            $check_handler = $xpath->query(".//input[contains(@class, 'et_pb_checkbox_handle')]", $element)->item(0);

                                            $name = '';
                                            if ($check_handler) {
                                                $name = '%%' . $xml->get_node_value($check_handler, 'data-original_id') . '%%';
                                            }

                                            if ($label) {
                                                $elements[] = $this->auto_field(
                                                        $element,
                                                        array(
                                                            'type' => 'e2pdf-html',
                                                            'block' => true,
                                                            'class' => $xml->get_node_value($element, 'class'),
                                                            'properties' => array(
                                                                'top' => '20',
                                                                'left' => '20',
                                                                'right' => '20',
                                                                'width' => '100%',
                                                                'height' => 'auto',
                                                                'value' => $label->nodeValue,
                                                            ),
                                                        )
                                                );
                                            }

                                            $fields = $xpath->query("//*[contains(@class, 'et_pb_contact_field_checkbox')]", $element);
                                            foreach ($fields as $field) {
                                                $checkbox_label = $xpath->query('.//label', $field)->item(0);
                                                $checkbox = $xpath->query(".//input[@type='checkbox']", $field)->item(0);

                                                $elements[] = $this->auto_field(
                                                        $field,
                                                        array(
                                                            'type' => 'e2pdf-checkbox',
                                                            'class' => $xml->get_node_value($field, 'class'),
                                                            'properties' => array(
                                                                'top' => '5',
                                                                'width' => 'auto',
                                                                'height' => 'auto',
                                                                'value' => $name,
                                                                'option' => $xml->get_node_value($checkbox, 'value'),
                                                            ),
                                                        )
                                                );

                                                if ($checkbox_label) {
                                                    $elements[] = $this->auto_field(
                                                            $checkbox,
                                                            array(
                                                                'type' => 'e2pdf-html',
                                                                'float' => true,
                                                                'class' => $xml->get_node_value($checkbox, 'class'),
                                                                'properties' => array(
                                                                    'left' => '5',
                                                                    'width' => '100%',
                                                                    'height' => 'auto',
                                                                    'value' => $checkbox_label->nodeValue,
                                                                ),
                                                            )
                                                    );
                                                }
                                            }
                                        } else {

                                            $label = $xpath->query('.//label', $element)->item(0);
                                            $input_text = $xpath->query(".//input[@type='text']", $element)->item(0);
                                            $select = $xpath->query('.//select', $element)->item(0);
                                            $textarea = $xpath->query('.//textarea', $element)->item(0);

                                            if ($label && ($input_text || $select || $textarea)) {
                                                $elements[] = $this->auto_field(
                                                        $element,
                                                        array(
                                                            'type' => 'e2pdf-html',
                                                            'block' => true,
                                                            'class' => $xml->get_node_value($element, 'class'),
                                                            'properties' => array(
                                                                'top' => '20',
                                                                'left' => '20',
                                                                'right' => '20',
                                                                'width' => '100%',
                                                                'height' => 'auto',
                                                                'value' => $label->nodeValue,
                                                            ),
                                                        )
                                                );
                                            }

                                            if ($input_text) {
                                                $elements[] = $this->auto_field(
                                                        $input_text,
                                                        array(
                                                            'type' => 'e2pdf-input',
                                                            'class' => $xml->get_node_value($input_text, 'class'),
                                                            'properties' => array(
                                                                'top' => '5',
                                                                'width' => '100%',
                                                                'height' => 'auto',
                                                                'value' => '%%' . $xml->get_node_value($input_text, 'data-original_id') . '%%',
                                                            ),
                                                        )
                                                );
                                            } elseif ($select) {
                                                $options_tmp = array();
                                                $options = $xpath->query('.//option', $select);
                                                foreach ($options as $option) {
                                                    $options_tmp[] = $xml->get_node_value($option, 'value');
                                                }

                                                $elements[] = $this->auto_field(
                                                        $select,
                                                        array(
                                                            'type' => 'e2pdf-select',
                                                            'class' => $xml->get_node_value($select, 'class'),
                                                            'properties' => array(
                                                                'top' => '5',
                                                                'width' => '100%',
                                                                'height' => 'auto',
                                                                'options' => implode("\n", $options_tmp),
                                                                'value' => '%%' . $xml->get_node_value($select, 'data-original_id') . '%%',
                                                            ),
                                                        )
                                                );
                                            } elseif ($textarea) {
                                                $elements[] = $this->auto_field(
                                                        $textarea,
                                                        array(
                                                            'type' => 'e2pdf-textarea',
                                                            'class' => $xml->get_node_value($textarea, 'class'),
                                                            'properties' => array(
                                                                'top' => '5',
                                                                'width' => '100%',
                                                                'height' => '150',
                                                                'value' => '%%' . $xml->get_node_value($textarea, 'data-original_id') . '%%',
                                                            ),
                                                        )
                                                );
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }

        $response['page'] = array(
            'bottom' => '20',
            'top' => '20',
            'right' => '20',
            'left' => '20',
        );
        $response['elements'] = $elements;

        return $response;
    }

    /**
     * Convert Field name to Value
     * @since 0.01.34
     * @param string $name - Field name
     * @return bool|string - Converted value or false
     */
    public function auto_map($name = false) {
        $item = $this->get('item');
        if ($item) {
            $post = $this->get_post($item);
            if ($post && isset($post->post_content)) {
                $content = $post->post_content;

                if (false !== strpos($content, '[')) {
                    $shortcode_tags = array(
                        'et_pb_contact_form',
                    );

                    preg_match_all('@\[([^<>&/\[\]\x00-\x20=]++)@', $content, $matches);
                    $tagnames = array_intersect($shortcode_tags, $matches[1]);

                    if (!empty($tagnames)) {

                        $pattern = $this->helper->load('shortcode')->get_shortcode_regex($tagnames);

                        preg_match_all("/$pattern/", $content, $shortcodes);

                        foreach ($shortcodes[0] as $key => $shortcode_value) {

                            $shortcode = array();
                            $shortcode[1] = $shortcodes[1][$key];
                            $shortcode[2] = $shortcodes[2][$key];
                            $shortcode[3] = $shortcodes[3][$key];
                            $shortcode[4] = $shortcodes[4][$key];
                            $shortcode[5] = $shortcodes[5][$key];
                            $shortcode[6] = $shortcodes[6][$key];

                            $atts = shortcode_parse_atts($shortcode[3]);
                            if (isset($atts['admin_label']) && $atts['admin_label'] == $this->get('item')) {

                                $field_content = $shortcode_value;
                                $field_shortcode_tags = array(
                                    'et_pb_contact_field',
                                );

                                preg_match_all('@\[([^<>&/\[\]\x00-\x20=]++)@', $field_content, $field_matches);
                                $field_tagnames = array_intersect($field_shortcode_tags, $field_matches[1]);

                                if (!empty($field_tagnames)) {

                                    $field_pattern = $this->helper->load('shortcode')->get_shortcode_regex($field_tagnames);

                                    preg_match_all("/$field_pattern/", $field_content, $field_shortcodes);

                                    foreach ($field_shortcodes[0] as $field_key => $field_shortcode_value) {
                                        $field_shortcode = array();
                                        $field_shortcode[3] = $field_shortcodes[3][$field_key];
                                        $field_atts = shortcode_parse_atts($field_shortcode[3]);
                                        if (isset($field_atts['field_title']) && isset($field_atts['field_id'])) {
                                            if ($field_atts['field_title'] == $name || $field_atts['field_id'] == $name) {
                                                return '%%' . strtolower($field_atts['field_id']) . '%%';
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }

        return false;
    }

    /**
     * Generate field for Auto PDF
     * @param object $field - Formidable field object
     * @param string $type - Field type
     * @param array $options - Field additional options
     * @return array - Prepared auto field
     */
    public function auto_field($field = false, $element = array()) {

        if (!$field) {
            return false;
        }

        if (!isset($element['block'])) {
            $element['block'] = false;
        }

        if (!isset($element['float'])) {
            $element['float'] = false;
        }

        $classes = array();
        if (isset($element['class']) && $element['class']) {
            $classes = explode(' ', $element['class']);
            unset($element['class']);
        }

        $float_classes = array(
            'et_pb_contact_field_half',
        );
        $array_intersect = array_intersect($classes, $float_classes);

        if (!empty($array_intersect) && $element['block']) {
            $element['float'] = true;
        };

        $primary_class = false;
        if (!empty($array_intersect)) {
            $primary_class = end($array_intersect);
        }

        if ($element['block']) {
            switch ($primary_class) {
                case 'et_pb_contact_field_half':
                    $element['width'] = '50%';
                    break;
                default:
                    break;
            }
        }

        return $element;
    }

    /**
     * Verify if item and dataset exists
     * @return bool - item and dataset exists
     */
    public function verify() {
        global $wpdb;
        if ($this->get('item') && $this->get('dataset')) {
            $condition = array(
                'ID' => array(
                    'condition' => '=',
                    'value' => $this->get('dataset'),
                    'type' => '%d',
                ),
                'extension' => array(
                    'condition' => '=',
                    'value' => 'divi',
                    'type' => '%s',
                ),
                'item' => array(
                    'condition' => '=',
                    'value' => $this->get('item'),
                    'type' => '%s',
                ),
            );

            $where = $this->helper->load('db')->prepare_where($condition);
            $entry = $wpdb->get_row($wpdb->prepare('SELECT * FROM ' . $wpdb->prefix . 'e2pdf_datasets' . $where['sql'] . '', $where['filter']));

            if ($entry) {
                return true;
            }
        }
        return false;
    }

    /**
     * Init Visual Mapper data
     * @return bool|string - HTML data source for Visual Mapper
     */
    public function visual_mapper() {

        $source = '';
        $html = '';

        if ($this->get('item')) {
            $post = $this->get_post($this->get('item'));
            if ($post && isset($post->post_content)) {

                $content = $post->post_content;

                if (false !== strpos($content, '[')) {
                    $shortcode_tags = array(
                        'et_pb_contact_form',
                    );

                    preg_match_all('@\[([^<>&/\[\]\x00-\x20=]++)@', $content, $matches);
                    $tagnames = array_intersect($shortcode_tags, $matches[1]);

                    if (!empty($tagnames)) {

                        $pattern = $this->helper->load('shortcode')->get_shortcode_regex($tagnames);

                        preg_match_all("/$pattern/", $content, $shortcodes);

                        foreach ($shortcodes[0] as $key => $shortcode_value) {

                            $shortcode = array();
                            $shortcode[1] = $shortcodes[1][$key];
                            $shortcode[2] = $shortcodes[2][$key];
                            $shortcode[3] = $shortcodes[3][$key];
                            $shortcode[4] = $shortcodes[4][$key];
                            $shortcode[5] = $shortcodes[5][$key];
                            $shortcode[6] = $shortcodes[6][$key];

                            $atts = shortcode_parse_atts($shortcode[3]);
                            if (isset($atts['admin_label']) && $atts['admin_label'] == $this->get('item')) {

                                require_once ET_BUILDER_DIR . 'class-et-builder-element.php';
                                require_once ET_BUILDER_DIR . 'functions.php';
                                require_once ET_BUILDER_DIR . 'ab-testing.php';
                                require_once ET_BUILDER_DIR . 'class-et-global-settings.php';
                                if (file_exists(ET_BUILDER_DIR . 'module/type/WithSpamProtection.php')) {
                                    require_once ET_BUILDER_DIR . 'module/type/WithSpamProtection.php';
                                }
                                require_once ET_BUILDER_DIR . 'module/ContactForm.php';
                                require_once ET_BUILDER_DIR . 'module/ContactFormItem.php';

                                new ET_Builder_Module_Contact_Form();
                                new ET_Builder_Module_Contact_Form_Item();

                                $source = do_shortcode($shortcode_value);

                                if ($source) {
                                    libxml_use_internal_errors(true);
                                    $dom = new DOMDocument();
                                    if (function_exists('mb_convert_encoding')) {
                                        $html = $dom->loadHTML(mb_convert_encoding($source, 'HTML-ENTITIES', 'UTF-8'));
                                    } else {
                                        $html = $dom->loadHTML('<?xml encoding="UTF-8">' . $source);
                                    }
                                    libxml_clear_errors();
                                }

                                if (!$source) {
                                    return __('Form source is empty', 'e2pdf');
                                } elseif (!$html) {
                                    return __('Form could not be parsed due incorrect HTML', 'e2pdf');
                                } else {

                                    $xml = $this->helper->load('xml');
                                    $xml->set('dom', $dom);
                                    $xpath = new DomXPath($dom);

                                    /* Replace names */
                                    $fields = $xpath->query("//*[contains(@name, 'et_pb_contact_')]");
                                    foreach ($fields as $element) {
                                        $element = $xml->set_node_value($element, 'name', '%%' . $xml->get_node_value($element, 'data-original_id') . '%%');
                                    }

                                    $checkboxes = $xpath->query("//*[contains(@class, 'et_pb_contact_field') and @data-type='checkbox']");
                                    foreach ($checkboxes as $element) {
                                        $check_handler = $xpath->query(".//input[contains(@class, 'et_pb_checkbox_handle')]", $element)->item(0);

                                        $name = '';
                                        if ($check_handler) {
                                            $name = '%%' . $xml->get_node_value($check_handler, 'data-original_id') . '%%';
                                        }

                                        $checks = $xpath->query(".//input[@type='checkbox']", $element);
                                        foreach ($checks as $check) {
                                            $check = $xml->set_node_value($check, 'name', $name);
                                        }
                                    }

                                    $remove_by_class = array(
                                        'et_pb_contact_submit',
                                        'et_pb_contactform_validate_field',
                                    );
                                    foreach ($remove_by_class as $key => $class) {
                                        $elements = $xpath->query("//*[contains(@class, '{$class}')]");
                                        foreach ($elements as $element) {
                                            $element->parentNode->removeChild($element);
                                        }
                                    }

                                    $remove_parent_by_class = array(
                                        'et_pb_contact_captcha_question',
                                    );
                                    foreach ($remove_parent_by_class as $key => $class) {
                                        $elements = $xpath->query("//*[contains(@class, '{$class}')]/parent::*");
                                        foreach ($elements as $element) {
                                            $element->parentNode->removeChild($element);
                                        }
                                    }
                                }

                                return $dom->saveHTML();
                            }
                        }
                    }
                }
            }
        }

        return false;
    }

    public function filter_wp_mail_pwh_dcfh($args) {
        if (isset($args['message']) && $args['message']) {
            $args['message'] = preg_replace('/(\{\{)((e2pdf-download|e2pdf-view|e2pdf-save|e2pdf-attachment|e2pdf-adobesign|e2pdf-zapier)[^\}]*?)(\}\})/', '[$2]', $args['message']);
        }
        return $this->filter_wp_mail($args);
    }

    public function filter_wp_mail($args) {
        if (isset($args['message'])) {
            if (false !== strpos($args['message'], '[')) {
                $shortcode_tags = array(
                    'e2pdf-download',
                    'e2pdf-save',
                    'e2pdf-attachment',
                    'e2pdf-adobesign',
                    'e2pdf-zapier',
                );

                preg_match_all('@\[([^<>&/\[\]\x00-\x20=]++)@', $args['message'], $matches);
                $tagnames = array_intersect($shortcode_tags, $matches[1]);

                if (!empty($tagnames)) {

                    $pattern = $this->helper->load('shortcode')->get_shortcode_regex($tagnames);
                    preg_match_all("/$pattern/", $args['message'], $shortcodes);

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
                                        $this->helper->add('divi_attachments', $file);
                                    }
                                } else {
                                    $this->helper->add('divi_attachments', $file);
                                }
                                $args['attachments'][] = $file;
                            }
                            $args['message'] = str_replace($shortcode_value, '', $args['message']);
                        } else {
                            if (is_array($args['headers']) && !in_array('Content-Type: text/html; charset=UTF-8', $args['headers'])) {
                                $args['headers'][] = 'Content-Type: text/html; charset=UTF-8';
                            }
                            $args['message'] = str_replace($shortcode_value, do_shortcode_tag($shortcode), $args['message']);
                            $args['message'] = str_replace("\r\n", '<br/>', $args['message']);
                        }
                    }
                }
            }
        }

        $wp_mail = array(
            'to' => $args['to'],
            'subject' => $args['subject'],
            'message' => $args['message'],
            'headers' => $args['headers'],
            'attachments' => $args['attachments'],
        );

        return $wp_mail;
    }

    /**
     * Load actions for this extension
     */
    public function load_actions() { // phpcs:ignore Squiz.WhiteSpace.SuperfluousWhitespace.EndLine
    }

    /**
     * Load filters for this extension
     */
    public function load_filters() {
        /* Divi Contact Form Helper Confirmation Email compatibility fix */
        if (defined('PWH_DCFH_PLUGIN_FILE')) {
            add_filter('et_pb_module_shortcode_attributes', array($this, 'filter_et_pb_module_shortcode_attributes'), 9, 5);
        } else {
            add_filter('et_pb_module_shortcode_attributes', array($this, 'filter_et_pb_module_shortcode_attributes'), 30, 5);
        }
        add_filter('et_module_shortcode_output', array($this, 'filter_et_module_shortcode_output'), 30, 3);
        add_filter('et_pb_module_content', array($this, 'filter_et_pb_module_content'), 30, 6);
    }

    public function filter_et_pb_module_content($content, $props, $attrs, $render_slug, $_address, $global_content) {

        if (($render_slug == 'et_pb_code' || $render_slug == 'et_pb_text') &&
                false !== strpos($content, '[') &&
                function_exists('et_core_is_builder_used_on_current_request') &&
                !et_core_is_builder_used_on_current_request()
        ) {
            global $post;
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
                preg_match_all("/$pattern/", $content, $shortcodes);
                foreach ($shortcodes[0] as $key => $shortcode_value) {
                    wp_reset_postdata();
                    $shortcode = array();
                    $shortcode[1] = $shortcodes[1][$key];
                    $shortcode[2] = $shortcodes[2][$key];
                    $shortcode[3] = $shortcodes[3][$key];
                    $shortcode[4] = $shortcodes[4][$key];
                    $shortcode[5] = $shortcodes[5][$key];
                    $shortcode[6] = $shortcodes[6][$key];
                    $atts = shortcode_parse_atts($shortcode[3]);
                    if (($shortcode[2] === 'e2pdf-save' && isset($atts['attachment']) && $atts['attachment'] == 'true') || $shortcode[2] === 'e2pdf-attachment') { // phpcs:ignore Generic.CodeAnalysis.EmptyStatement.DetectedIf
                    } else {
                        if (!isset($atts['dataset']) && isset($atts['id']) && (isset($post->ID))) {
                            $dataset = $post->ID;
                            $atts['dataset'] = $dataset;
                            $shortcode[3] .= ' dataset="' . $dataset . '"';
                        }
                    }
                    if (!isset($atts['apply'])) {
                        $shortcode[3] .= ' apply="true"';
                    }

                    if (!isset($atts['filter'])) {
                        $shortcode[3] .= ' filter="true"';
                    }
                    $new_shortcode = '[' . $shortcode[2] . $shortcode[3] . ']';
                    $content = str_replace($shortcode_value, $new_shortcode, $content);
                }
            }
        }
        return $content;
    }

    public function filter_et_pb_module_shortcode_attributes($props, $attrs, $render_slug, $address, $content) {
        global $wpdb;

        if ($render_slug && $render_slug == 'et_pb_contact_form' && !empty($_POST) && $et_contact_proccess = array_search('et_contact_proccess', $_POST)) {
            $e2pdf_shortcodes = false;
            $success_message = isset($props['success_message']) ? str_replace(array('&#91;', '&#93;', '&quot;'), array('[', ']', '"'), $props['success_message']) : '';
            if (false !== strpos($success_message, '[')) {
                $shortcode_tags = array(
                    'e2pdf-download',
                    'e2pdf-save',
                    'e2pdf-view',
                    'e2pdf-adobesign',
                    'e2pdf-zapier',
                );
                preg_match_all('@\[([^<>&/\[\]\x00-\x20=]++)@', $success_message, $matches);
                $tagnames = array_intersect($shortcode_tags, $matches[1]);
                if (!empty($tagnames)) {
                    $e2pdf_shortcodes = true;
                } else {
                    $success_message = '';
                }
            }

            $use_custom_message_richtext = isset($props['use_custom_message_richtext']) && $props['use_custom_message_richtext'] == 'on' && isset($props['custom_message_richtext']) ? true : false;
            if ($use_custom_message_richtext) {
                $custom_message = str_replace(array('&#91;', '&#93;'), array('[', ']'), $props['custom_message_richtext']);
            } else {
                $custom_message = isset($props['custom_message']) ? str_replace(array('&#91;', '&#93;'), array('[', ']'), $props['custom_message']) : '';
            }
            if (false !== strpos($custom_message, '[')) {
                $shortcode_tags = array(
                    'e2pdf-download',
                    'e2pdf-save',
                    'e2pdf-attachment',
                    'e2pdf-adobesign',
                    'e2pdf-zapier',
                );

                preg_match_all('@\[([^<>&/\[\]\x00-\x20=]++)@', $custom_message, $matches);
                $tagnames = array_intersect($shortcode_tags, $matches[1]);
                if (!empty($tagnames)) {
                    $e2pdf_shortcodes = true;
                } else {
                    $custom_message = '';
                }
            }

            /* Divi Contact Form Helper Confirmation Email and Confirmation Email RichText */
            $use_confirmation_message_richtext = isset($props['use_confirmation_email']) && $props['use_confirmation_email'] == 'on' && isset($props['use_confirmation_message_richtext']) && $props['use_confirmation_message_richtext'] == 'on' && isset($props['confirmation_message_richtext']) ? true : false;
            if ($use_confirmation_message_richtext) {
                $confirmation_email_message = str_replace(array('&#91;', '&#93;'), array('[', ']'), $props['confirmation_message_richtext']);
            } else {
                $confirmation_email_message = isset($props['use_confirmation_email']) && $props['use_confirmation_email'] == 'on' && isset($props['confirmation_email_message']) ? str_replace(array('&#91;', '&#93;'), array('[', ']'), $props['confirmation_email_message']) : '';
            }
            if (false !== strpos($confirmation_email_message, '[')) {
                $shortcode_tags = array(
                    'e2pdf-download',
                    'e2pdf-save',
                    'e2pdf-attachment',
                    'e2pdf-adobesign',
                    'e2pdf-zapier',
                );
                preg_match_all('@\[([^<>&/\[\]\x00-\x20=]++)@', $confirmation_email_message, $matches);
                $tagnames = array_intersect($shortcode_tags, $matches[1]);
                if (!empty($tagnames)) {
                    $e2pdf_shortcodes = true;
                } else {
                    $confirmation_email_message = '';
                }
            }

            /* Check if E2Pdf shortcodes exist in messages */
            if ($e2pdf_shortcodes) {
                $data = $_POST;
                if (isset($props['_unique_id'])) {
                    $data['_unique_id'] = $props['_unique_id'];
                }
                if (isset($props['save_files_to_media']) && $props['save_files_to_media'] == 'on') {
                    $data['_save_files_to_media'] = $props['save_files_to_media'];
                    $data['_subdir'] = wp_upload_dir()['subdir'];
                } elseif (function_exists('pwh_dcfh_file_helpers')) {
                    $subdir = pwh_dcfh_file_helpers()::get_subdir();
                    if (is_array($subdir)) {
                        $data['_subdir'] = implode('/', $subdir);
                    }
                }

                $captcha = isset($props['captcha']) ? $props['captcha'] : '';
                $use_spam_service = isset($props['use_spam_service']) ? $props['use_spam_service'] : 'off';
                $et_pb_contact_form_num = str_replace('et_pb_contactform_submit_', '', $et_contact_proccess);
                $et_contact_error = false;
                $current_form_fields = isset($data['et_pb_contact_email_fields_' . $et_pb_contact_form_num]) ? $data['et_pb_contact_email_fields_' . $et_pb_contact_form_num] : '';
                $contact_email = '';
                $nonce_result = isset($data['_wpnonce-et-pb-contact-form-submitted-' . $et_pb_contact_form_num]) && wp_verify_nonce($data['_wpnonce-et-pb-contact-form-submitted-' . $et_pb_contact_form_num], 'et-pb-contact-form-submit') ? true : false;

                if ($nonce_result && isset($data['et_pb_contactform_submit_' . $et_pb_contact_form_num]) && empty($data['et_pb_contact_et_number_' . $et_pb_contact_form_num])) {
                    if ('' !== $current_form_fields) {
                        $fields_data_json = str_replace('\\', '', $current_form_fields);
                        $fields_data_array = json_decode($fields_data_json, true);
                        /* Check whether captcha field is not empty */
                        if ('on' === $captcha && 'off' === $use_spam_service && (!isset($data['et_pb_contact_captcha_' . $et_pb_contact_form_num]) || empty($data['et_pb_contact_captcha_' . $et_pb_contact_form_num]) )) {
                            $et_contact_error = true;
                        } elseif ('on' === $use_spam_service) {
                            if (class_exists('ET_Builder_Element')) {
                                $contact_form = ET_Builder_Element::get_module('et_pb_contact_form');
                                if ($contact_form && is_object($contact_form) && method_exists($contact_form, 'is_spam_submission')) {
                                    $contact_form->props = $props;
                                    if ($contact_form->is_spam_submission()) {
                                        if (!empty($_POST['token'])) {
                                            unset($_POST['token']);
                                        }
                                        $et_contact_error = true;
                                    } else {
                                        $props['use_spam_service'] = 'off';
                                        $props['captcha'] = 'off';
                                    }
                                }
                            }
                        }

                        /* Check all fields on current form and generate error message if needed */
                        if (!empty($fields_data_array)) {
                            foreach ($fields_data_array as $index => $value) {
                                if (isset($value['field_id']) && 'et_pb_contact_et_number_' . $et_pb_contact_form_num === $value['field_id']) {
                                    continue;
                                }
                                /* Check all the required fields, generate error message if required field is empty */
                                $field_value = isset($data[$value['field_id']]) ? trim($data[$value['field_id']]) : '';
                                if ('required' === $value['required_mark'] && empty($field_value) && !is_numeric($field_value)) {
                                    $et_contact_error = true;
                                    continue;
                                }
                                /* Additional check for email field */
                                if ('email' === $value['field_type'] && 'required' === $value['required_mark'] && !empty($field_value)) {
                                    $contact_email = isset($data[$value['field_id']]) ? sanitize_email($data[$value['field_id']]) : '';
                                    if (!empty($contact_email) && !is_email($contact_email)) {
                                        $et_contact_error = true;
                                    }
                                }
                            }
                        }
                    } else {
                        $et_contact_error = true;
                    }
                } else {
                    $et_contact_error = true;
                }

                if (!$et_contact_error && $nonce_result) {
                    $dataset = false;
                    if (false !== strpos($success_message, '[')) {
                        $shortcode_tags = array(
                            'e2pdf-download',
                            'e2pdf-save',
                            'e2pdf-view',
                            'e2pdf-adobesign',
                            'e2pdf-zapier',
                        );
                        preg_match_all('@\[([^<>&/\[\]\x00-\x20=]++)@', $success_message, $matches);
                        $tagnames = array_intersect($shortcode_tags, $matches[1]);
                        if (!empty($tagnames)) {
                            $pattern = $this->helper->load('shortcode')->get_shortcode_regex($tagnames);
                            preg_match_all("/$pattern/", $success_message, $shortcodes);
                            foreach ($shortcodes[0] as $key => $shortcode_value) {
                                $item = false;
                                $shortcode = array();
                                $shortcode[1] = $shortcodes[1][$key];
                                $shortcode[2] = $shortcodes[2][$key];
                                $shortcode[3] = $shortcodes[3][$key];
                                $shortcode[4] = $shortcodes[4][$key];
                                $shortcode[5] = $shortcodes[5][$key];
                                $shortcode[6] = $shortcodes[6][$key];
                                $atts = shortcode_parse_atts($shortcode[3]);
                                if (($shortcode[2] === 'e2pdf-save' && isset($atts['attachment']) && $atts['attachment'] == 'true') || $shortcode[2] === 'e2pdf-attachment') { // phpcs:ignore Generic.CodeAnalysis.EmptyStatement.DetectedIf
                                } else {
                                    if (!isset($atts['dataset']) && isset($atts['id'])) {
                                        $template = new Model_E2pdf_Template();
                                        $template->load($atts['id']);
                                        if ($template->get('extension') === 'divi') {
                                            $item = $template->get('item');
                                            if (!$dataset) {
                                                $entry = array(
                                                    'extension' => 'divi',
                                                    'item' => $item,
                                                    'entry' => serialize($data),
                                                );
                                                $wpdb->insert($wpdb->prefix . 'e2pdf_datasets', $entry);
                                                $dataset = $wpdb->insert_id;
                                            }
                                            $atts['dataset'] = $dataset;
                                            $shortcode[3] .= ' dataset="' . $dataset . '"';
                                        }
                                    }
                                    if (!isset($atts['apply'])) {
                                        $shortcode[3] .= ' apply="true"';
                                    }
                                    if (!isset($atts['iframe_download'])) {
                                        $shortcode[3] .= ' iframe_download="true"';
                                    }
                                    $props['success_message'] = str_replace(str_replace(array('[', ']'), array('&#91;', '&#93;'), $shortcode_value), '[' . $shortcode[2] . $shortcode[3] . ']', $props['success_message']);
                                }
                            }
                        }
                    }

                    if (false !== strpos($custom_message, '[')) {
                        $shortcode_tags = array(
                            'e2pdf-download',
                            'e2pdf-save',
                            'e2pdf-attachment',
                            'e2pdf-adobesign',
                            'e2pdf-zapier',
                        );

                        preg_match_all('@\[([^<>&/\[\]\x00-\x20=]++)@', $custom_message, $matches);
                        $tagnames = array_intersect($shortcode_tags, $matches[1]);
                        if (!empty($tagnames)) {
                            $pattern = $this->helper->load('shortcode')->get_shortcode_regex($tagnames);
                            preg_match_all("/$pattern/", $custom_message, $shortcodes);
                            add_filter('wp_mail', array($this, 'filter_wp_mail'), 11);
                            foreach ($shortcodes[0] as $key => $shortcode_value) {
                                $item = false;
                                $shortcode = array();
                                $shortcode[1] = $shortcodes[1][$key];
                                $shortcode[2] = $shortcodes[2][$key];
                                $shortcode[3] = $shortcodes[3][$key];
                                $shortcode[4] = $shortcodes[4][$key];
                                $shortcode[5] = $shortcodes[5][$key];
                                $shortcode[6] = $shortcodes[6][$key];
                                $atts = shortcode_parse_atts($shortcode[3]);
                                if (!isset($atts['dataset']) && isset($atts['id'])) {
                                    $template = new Model_E2pdf_Template();
                                    $template->load($atts['id']);
                                    if ($template->get('extension') === 'divi') {
                                        $item = $template->get('item');
                                        if (!$dataset) {
                                            $entry = array(
                                                'extension' => 'divi',
                                                'item' => $item,
                                                'entry' => serialize($data),
                                            );
                                            $wpdb->insert($wpdb->prefix . 'e2pdf_datasets', $entry);
                                            $dataset = $wpdb->insert_id;
                                        }
                                        $atts['dataset'] = $dataset;
                                        $shortcode[3] .= ' dataset="' . $dataset . '"';
                                    }
                                }
                                if ($use_custom_message_richtext) {
                                    if (defined('PWH_DCFH_PLUGIN_VERSION') && version_compare(PWH_DCFH_PLUGIN_VERSION, '1.5.1', '>=')) {
                                        $props['custom_message_richtext'] = str_replace(str_replace(array('[', ']'), array('&#91;', '&#93;'), $shortcode_value), '{{' . $shortcode[2] . $shortcode[3] . '}}', $props['custom_message_richtext']);
                                    } else {
                                        $props['custom_message_richtext'] = str_replace(str_replace(array('[', ']'), array('&#91;', '&#93;'), $shortcode_value), '[' . $shortcode[2] . $shortcode[3] . ']', $props['custom_message_richtext']);
                                    }
                                } else {
                                    $props['custom_message'] = str_replace(str_replace(array('[', ']'), array('&#91;', '&#93;'), $shortcode_value), '[' . $shortcode[2] . $shortcode[3] . ']', $props['custom_message']);
                                }
                            }
                        }
                    }

                    if (false !== strpos($confirmation_email_message, '[')) {
                        $shortcode_tags = array(
                            'e2pdf-download',
                            'e2pdf-save',
                            'e2pdf-attachment',
                            'e2pdf-adobesign',
                            'e2pdf-zapier',
                        );
                        preg_match_all('@\[([^<>&/\[\]\x00-\x20=]++)@', $confirmation_email_message, $matches);
                        $tagnames = array_intersect($shortcode_tags, $matches[1]);
                        if (!empty($tagnames)) {
                            $pattern = $this->helper->load('shortcode')->get_shortcode_regex($tagnames);
                            preg_match_all("/$pattern/", $confirmation_email_message, $shortcodes);
                            add_filter('wp_mail', array($this, 'filter_wp_mail_pwh_dcfh'), 11);
                            foreach ($shortcodes[0] as $key => $shortcode_value) {
                                $item = false;
                                $shortcode = array();
                                $shortcode[1] = $shortcodes[1][$key];
                                $shortcode[2] = $shortcodes[2][$key];
                                $shortcode[3] = $shortcodes[3][$key];
                                $shortcode[4] = $shortcodes[4][$key];
                                $shortcode[5] = $shortcodes[5][$key];
                                $shortcode[6] = $shortcodes[6][$key];
                                $atts = shortcode_parse_atts($shortcode[3]);
                                if (!isset($atts['dataset']) && isset($atts['id'])) {
                                    $template = new Model_E2pdf_Template();
                                    $template->load($atts['id']);
                                    if ($template->get('extension') === 'divi') {
                                        $item = $template->get('item');
                                        if (!$dataset) {
                                            $entry = array(
                                                'extension' => 'divi',
                                                'item' => $item,
                                                'entry' => serialize($data),
                                            );
                                            $wpdb->insert($wpdb->prefix . 'e2pdf_datasets', $entry);
                                            $dataset = $wpdb->insert_id;
                                        }
                                        $atts['dataset'] = $dataset;
                                        $shortcode[3] .= ' dataset="' . $dataset . '"';
                                    }
                                }
                                if (defined('PWH_DCFH_PLUGIN_VERSION') && version_compare(PWH_DCFH_PLUGIN_VERSION, '1.5.1', '>=')) {
                                    if ($use_confirmation_message_richtext) {
                                        $props['confirmation_message_richtext'] = str_replace(str_replace(array('[', ']'), array('&#91;', '&#93;'), $shortcode_value), '{{' . $shortcode[2] . $shortcode[3] . '}}', $props['confirmation_message_richtext']);
                                    } else {
                                        $props['confirmation_email_message'] = str_replace(str_replace(array('[', ']'), array('&#91;', '&#93;'), $shortcode_value), '{{' . $shortcode[2] . $shortcode[3] . '}}', $props['confirmation_email_message']);
                                    }
                                } else {
                                    if ($use_confirmation_message_richtext) {
                                        $props['confirmation_message_richtext'] = str_replace(str_replace(array('[', ']'), array('&#91;', '&#93;'), $shortcode_value), '[' . $shortcode[2] . $shortcode[3] . ']', $props['confirmation_message_richtext']);
                                    } else {
                                        $props['confirmation_email_message'] = str_replace(str_replace(array('[', ']'), array('&#91;', '&#93;'), $shortcode_value), '[' . $shortcode[2] . $shortcode[3] . ']', $props['confirmation_email_message']);
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        return $props;
    }

    public function filter_et_module_shortcode_output($output, $render_slug, $form) {

        $et_contact_proccess = !empty($_POST) && is_array($_POST) ? array_search('et_contact_proccess', $_POST) : false;
        if ($render_slug && $render_slug == 'et_pb_contact_form' && $et_contact_proccess) {

            $et_pb_contact_form_num = str_replace(array('pwh_dcfh_et_pb_contactform_submit_', 'et_pb_contactform_submit_'), array('', ''), $et_contact_proccess);
            $nonce_result = isset($_POST['_wpnonce-et-pb-contact-form-submitted-' . $et_pb_contact_form_num]) && wp_verify_nonce($_POST['_wpnonce-et-pb-contact-form-submitted-' . $et_pb_contact_form_num], 'et-pb-contact-form-submit') ? true : false;

            if ($nonce_result && (
                    (isset($_POST['et_pb_contactform_submit_' . $et_pb_contact_form_num]) && empty($_POST['et_pb_contact_et_number_' . $et_pb_contact_form_num])) ||
                    (isset($_POST['pwh_dcfh_et_pb_contactform_submit_' . $et_pb_contact_form_num]) && $_POST['pwh_dcfh_et_pb_contactform_submit_' . $et_pb_contact_form_num] == 'et_contact_proccess')
                    )
            ) {

                $success_message = isset($form->props['success_message']) ? str_replace(array('&#91;', '&#93;', '&quot;'), array('[', ']', '"'), $form->props['success_message']) : '';
                if (false !== strpos($success_message, '[')) {
                    $shortcode_tags = array(
                        'e2pdf-download',
                        'e2pdf-save',
                        'e2pdf-view',
                        'e2pdf-adobesign',
                        'e2pdf-zapier',
                    );

                    preg_match_all('@\[([^<>&/\[\]\x00-\x20=]++)@', $success_message, $matches);
                    $tagnames = array_intersect($shortcode_tags, $matches[1]);

                    if (!empty($tagnames)) {

                        $pattern = $this->helper->load('shortcode')->get_shortcode_regex($tagnames);
                        preg_match_all("/$pattern/", $success_message, $shortcodes);

                        foreach ($shortcodes[0] as $key => $shortcode_value) {
                            $shortcode = array();
                            $shortcode[1] = $shortcodes[1][$key];
                            $shortcode[2] = $shortcodes[2][$key];
                            $shortcode[3] = $shortcodes[3][$key];
                            $shortcode[4] = $shortcodes[4][$key];
                            $shortcode[5] = $shortcodes[5][$key];
                            $shortcode[6] = $shortcodes[6][$key];

                            if (isset($form->props['enable_multistep']) && 'on' === $form->props['enable_multistep']) {
                                $output = str_replace($shortcode_value, do_shortcode_tag($shortcode), $output);
                            } else {
                                $output = str_replace(str_replace(array('"'), array('&quot;'), $shortcode_value), do_shortcode_tag($shortcode), $output);
                            }
                        }
                    }
                }
            }

            remove_filter('wp_mail', array($this, 'filter_wp_mail'), 11);
            remove_filter('wp_mail', array($this, 'filter_wp_mail_pwh_dcfh'), 11);

            $files = $this->helper->get('divi_attachments');
            if (is_array($files) && !empty($files)) {
                foreach ($files as $key => $file) {
                    $this->helper->delete_dir(dirname($file) . '/');
                }
                $this->helper->deset('divi_attachments');
            }
        }

        return $output;
    }

    /**
     * Delete dataset for template
     * @param int $template_id - Template ID
     * @param int $dataset - Dataset ID
     * @return bool - Result of removing items
     */
    public function delete_item($template_id = false, $dataset = false) {
        global $wpdb;

        $template = new Model_E2pdf_Template();
        if ($template_id && $dataset && $template->load($template_id)) {
            if ($template->get('extension') === 'divi' && $template->get('item')) {
                $item = $template->get('item');
                $where = array(
                    'ID' => $dataset,
                    'item' => $item,
                    'extension' => 'divi',
                );
                $wpdb->delete($wpdb->prefix . 'e2pdf_datasets', $where);
                return true;
            }
        }

        return false;
    }

    /**
     * Delete all datasets for Template
     * @param int $template_id - Template ID
     * @return bool - Result of removing items
     */
    public function delete_items($template_id = false) {
        global $wpdb;

        $template = new Model_E2pdf_Template();

        if ($template_id && $template->load($template_id)) {
            if ($template->get('extension') === 'divi' && $template->get('item')) {
                $item = $template->get('item');
                $where = array(
                    'item' => $item,
                    'extension' => 'divi',
                );
                $wpdb->delete($wpdb->prefix . 'e2pdf_datasets', $where);
                return true;
            }
        }

        return false;
    }

    /**
     * Get styles for generating Map Field function
     * @return array - List of css files to load
     */
    public function styles($item = false) {
        $styles = array(
            plugins_url('css/extension/divi.css?v=' . time(), $this->helper->get('plugin_file_path')),
        );
        return $styles;
    }
}

<?php

/**
 * E2pdf Options Helper
 * 
 * @copyright  Copyright 2017 https://e2pdf.com
 * @license    GPLv3
 * @version    1
 * @link       https://e2pdf.com
 * @since      0.00.01
 */
if (!defined('ABSPATH')) {
    die('Access denied.');
}

class Model_E2pdf_Options extends Model_E2pdf_Model {

    /**
     * Get Options list
     * 
     * @param bool $all - Get all options
     * @param array $only_group - Array list of groups only to include
     * @param array $exclude - Array list of groups to exclude
     * 
     * @return array() - List of options
     */
    public static function get_options($all = true, $only_group = array(), $exclude = false) {

        $helper = Helper_E2pdf_Helper::instance();
        $extensions_options = array();
        if ($all) {
            $extensions_options[] = array(
                'key' => 'e2pdf_disabled_extensions',
                'value' => !is_array(get_option('e2pdf_disabled_extensions')) ? array() : get_option('e2pdf_disabled_extensions'),
            );
        } else {
            $model_e2pdf_extension = new Model_E2pdf_Extension();
            $extensions = $model_e2pdf_extension->extensions(false);
            $disabled_extensions = !is_array(get_option('e2pdf_disabled_extensions')) ? array() : get_option('e2pdf_disabled_extensions');
            foreach ($extensions as $extension) {
                $extensions_options[] = array(
                    'name' => ucfirst($extension),
                    'key' => 'e2pdf_disabled_extensions[]',
                    'value' => in_array($extension, $disabled_extensions) ? $extension : '',
                    'checkbox_value' => $extension,
                    'placeholder' => __('Disable', 'e2pdf'),
                    'type' => 'checkbox',
                );
            }
            if (isset($extensions_options['0'])) {
                $extensions_options['0']['header'] = __('Extensions', 'e2pdf');
            }
        }

        $e2pdf_mod_rewrite_url = get_option('e2pdf_mod_rewrite_url') ? get_option('e2pdf_mod_rewrite_url') : 'e2pdf/%uid%/';

        $options = array(
            'static_group' => array(
                'name' => __('Static', 'e2pdf'),
                'options' => array(
                    array(
                        'key' => 'e2pdf_version',
                        'value' => $helper->get('version')
                    ),
                    array(
                        'key' => 'e2pdf_license',
                        'value' => get_option('e2pdf_license') === false ? false : get_option('e2pdf_license'),
                    ),
                    array(
                        'key' => 'e2pdf_email',
                        'value' => get_option('e2pdf_email') === false ? false : get_option('e2pdf_email'),
                    ),
                    array(
                        'key' => 'e2pdf_templates_screen_per_page',
                        'value' => get_option('e2pdf_templates_screen_per_page') === false ? '20' : get_option('e2pdf_templates_screen_per_page'),
                    ),
                    array(
                        'key' => 'e2pdf_cached_fonts',
                        'value' => !is_array(get_option('e2pdf_cached_fonts')) ? array() : get_option('e2pdf_cached_fonts'),
                    ),
                    array(
                        'key' => 'e2pdf_nonce_key',
                        'value' => get_option('e2pdf_nonce_key') === false ? wp_generate_password('64') : get_option('e2pdf_nonce_key'),
                    ),
                )
            ),
            'common_group' => array(
                'name' => __('Common', 'e2pdf'),
                'options' => array(
                    array(
                        'name' => __('E2Pdf Connected Account', 'e2pdf'),
                        'key' => 'e2pdf_user_email',
                        'default_value' => '',
                        'value' => get_option('e2pdf_user_email') === false ? '' : get_option('e2pdf_user_email'),
                        'type' => 'text',
                        'placeholder' => __('E2Pdf Account E-mail', 'e2pdf')
                    ),
                    array(
                        'name' => __('API Server', 'e2pdf'),
                        'key' => 'e2pdf_api_custom',
                        'value' => apply_filters('e2pdf_api', get_option('e2pdf_api')),
                        'default_value' => 'api.e2pdf.com',
                        'type' => get_option('e2pdf_api') !== apply_filters('e2pdf_api', get_option('e2pdf_api')) ? 'text' : 'hidden',
                        'readonly' => 'readonly',
                    ),
                    array(
                        'name' => __('API Server', 'e2pdf'),
                        'key' => 'e2pdf_api',
                        'value' => get_option('e2pdf_api') === false ? 'api.e2pdf.com' : get_option('e2pdf_api'),
                        'default_value' => 'api.e2pdf.com',
                        'type' => get_option('e2pdf_api') !== apply_filters('e2pdf_api', get_option('e2pdf_api')) ? 'hidden' : 'select',
                        'options' => array(
                            'api.e2pdf.com' => 'api.e2pdf.com (US)',
                            'api2.e2pdf.com' => 'api2.e2pdf.com (US)',
                            'api3.e2pdf.com' => 'api3.e2pdf.com (EU)',
                            'api4.e2pdf.com' => 'api4.e2pdf.com (EU)'
                        )
                    ),
                    array(
                        'name' => __('API Connection Timout', 'e2pdf'),
                        'key' => 'e2pdf_connection_timeout',
                        'value' => get_option('e2pdf_connection_timeout') === false ? '300' : get_option('e2pdf_connection_timeout'),
                        'default_value' => '300',
                        'type' => 'text',
                        'class' => 'e2pdf-numbers',
                        'placeholder' => '0'
                    ),
                    array(
                        'name' => __('PDF Processor', 'e2pdf'),
                        'key' => 'e2pdf_processor',
                        'value' => get_option('e2pdf_processor') === false ? '0' : get_option('e2pdf_processor'),
                        'default_value' => '0',
                        'type' => 'select',
                        'options' => get_option('e2pdf_debug') ? array(
                    '0' => __('Default (Stable Version)', 'e2pdf'),
                    '2' => __('Backport (1.16.19 Version)', 'e2pdf'),
                    '1' => __('Release Candidate (Debug Mode)', 'e2pdf'),
                        ) : array(
                    '0' => __('Default (Stable Version)', 'e2pdf')
                        ),
                    ),
                    array(
                        'name' => __('Font Processor', 'e2pdf'),
                        'key' => 'e2pdf_font_processor',
                        'value' => get_option('e2pdf_font_processor') === false ? '0' : get_option('e2pdf_font_processor'),
                        'default_value' => '0',
                        'type' => 'select',
                        'options' => array(
                            __('Default (Stable Version)', 'e2pdf'),
                            __('Complex Fonts (Experimental)', 'e2pdf')
                        )
                    ),
                    array(
                        'name' => __('Release Candidate Builds', 'e2pdf'),
                        'key' => 'e2pdf_dev_update',
                        'value' => get_option('e2pdf_dev_update') === false ? '0' : get_option('e2pdf_dev_update'),
                        'default_value' => '0',
                        'type' => 'checkbox',
                        'checkbox_value' => '1',
                        'placeholder' => __('Update from E2Pdf.com', 'e2pdf'),
                    ),
                    array(
                        'name' => __('Url Format', 'e2pdf'),
                        'key' => 'e2pdf_url_format',
                        'value' => get_option('e2pdf_url_format') === false ? 'siteurl' : get_option('e2pdf_url_format'),
                        'default_value' => 'siteurl',
                        'type' => 'select',
                        'options' => array(
                            'siteurl' => 'WordPress Address (URL)',
                            'home' => 'Site Address (URL)'
                        )
                    ),
                    array(
                        'name' => __('Url Rewrite', 'e2pdf'),
                        'key' => 'e2pdf_mod_rewrite',
                        'value' => get_option('e2pdf_mod_rewrite') === false ? '0' : get_option('e2pdf_mod_rewrite'),
                        'default_value' => '0',
                        'type' => 'checkbox',
                        'checkbox_value' => '1',
                        'placeholder' => __('Url Rewrite', 'e2pdf'),
                    ),
                    array(
                        'name' => '',
                        'key' => 'e2pdf_mod_rewrite_url',
                        'default_value' => '',
                        'value' => $e2pdf_mod_rewrite_url,
                        'type' => 'text',
                        'class' => 'e2pdf-mod-rewrite-url',
                        'placeholder' => 'e2pdf/%uid%/',
                        'prefield' => rtrim($helper->get_frontend_site_url(), '/') . '/',
                    ),
                    array(
                        'name' => __('Cache', 'e2pdf'),
                        'key' => 'e2pdf_cache',
                        'value' => get_option('e2pdf_cache') === false ? '0' : get_option('e2pdf_cache'),
                        'default_value' => '0',
                        'type' => 'checkbox',
                        'checkbox_value' => '1',
                        'placeholder' => __('Turn on Cache', 'e2pdf'),
                    ),
                    array(
                        'name' => __('Fonts Cache', 'e2pdf'),
                        'key' => 'e2pdf_cache_fonts',
                        'value' => get_option('e2pdf_cache_fonts') === false ? '0' : get_option('e2pdf_cache_fonts'),
                        'default_value' => '0',
                        'type' => 'checkbox',
                        'checkbox_value' => '1',
                        'placeholder' => __('Turn on Fonts Cache', 'e2pdf'),
                    ),
                    array(
                        'name' => __('Hide Warnings', 'e2pdf'),
                        'key' => 'e2pdf_hide_warnings',
                        'value' => get_option('e2pdf_hide_warnings') === false ? '0' : get_option('e2pdf_hide_warnings'),
                        'default_value' => '0',
                        'type' => 'checkbox',
                        'checkbox_value' => '1',
                        'placeholder' => __('Hide Warnings', 'e2pdf'),
                    ),
                    array(
                        'name' => __('Local Images', 'e2pdf'),
                        'key' => 'e2pdf_images_remote_request',
                        'value' => get_option('e2pdf_images_remote_request') === false ? '0' : get_option('e2pdf_images_remote_request'),
                        'default_value' => '0',
                        'type' => 'checkbox',
                        'checkbox_value' => '1',
                        'placeholder' => __('Load via Remote Request', 'e2pdf'),
                    ),
                    array(
                        'name' => __('Images Timout', 'e2pdf'),
                        'key' => 'e2pdf_images_timeout',
                        'value' => get_option('e2pdf_images_timeout') === false ? '30' : get_option('e2pdf_images_timeout'),
                        'default_value' => '30',
                        'type' => 'text',
                        'class' => 'e2pdf-numbers',
                        'placeholder' => '0'
                    ),
                    array(
                        'name' => __('Revisions Limit', 'e2pdf'),
                        'key' => 'e2pdf_revisions_limit',
                        'value' => get_option('e2pdf_revisions_limit', '3'),
                        'default_value' => '3',
                        'type' => 'text',
                        'class' => 'e2pdf-numbers',
                        'placeholder' => '0'
                    ),
                    array(
                        'name' => __('Debug Mode', 'e2pdf'),
                        'key' => 'e2pdf_debug',
                        'value' => get_option('e2pdf_debug') === false ? '0' : get_option('e2pdf_debug'),
                        'default_value' => '0',
                        'type' => 'checkbox',
                        'checkbox_value' => '1',
                        'placeholder' => __('Turn on Debug Mode', 'e2pdf'),
                    ),
                    array(
                        'name' => __('Recovery Mode E-mail', 'e2pdf'),
                        'key' => 'e2pdf_recovery_mode_email',
                        'value' => get_option('e2pdf_recovery_mode_email') === false ? '' : get_option('e2pdf_recovery_mode_email'),
                        'default_value' => '',
                        'type' => get_option('e2pdf_debug') ? 'text' : 'hidden',
                        'placeholder' => __('Recovery Mode E-mail', 'e2pdf')
                    ),
                    array(
                        'name' => __('Memory/Time Usage', 'e2pdf'),
                        'key' => 'e2pdf_memory_time',
                        'value' => get_option('e2pdf_memory_time') === false ? '0' : get_option('e2pdf_memory_time'),
                        'default_value' => '0',
                        'type' => get_option('e2pdf_debug') ? 'checkbox' : 'hidden',
                        'checkbox_value' => '1',
                        'placeholder' => __('Show Memory/Time Usage', 'e2pdf'),
                    ),
                )
            ),
            'maintenance_group' => array(
                'name' => __('Maintenance', 'e2pdf'),
                'action' => 'maintenance',
                'options' => array()
            ),
            'fonts_group' => array(
                'name' => __('Fonts', 'e2pdf'),
                'action' => 'fonts',
                'options' => array()
            ),
            'permissions_group' => array(
                'name' => __('Permissions', 'e2pdf'),
                'action' => 'permissions',
                'options' => array()
            ),
            'adobesign_group' => array(
                'name' => __('Adobe Sign', 'e2pdf'),
                'action' => 'adobesign',
                'options' => array(
                    array(
                        'name' => __('Status', 'e2pdf'),
                        'key' => 'e2pdf_adobesign_status',
                        'value' => get_option('e2pdf_adobesign_refresh_token') ? __('Authorized', 'e2pdf') : __('Not Authorized', 'e2pdf'),
                        'default_value' => '',
                        'type' => 'text',
                        'readonly' => 'readonly',
                    ),
                    array(
                        'name' => __('Client ID', 'e2pdf'),
                        'key' => 'e2pdf_adobesign_client_id',
                        'value' => get_option('e2pdf_adobesign_client_id') === false ? '' : get_option('e2pdf_adobesign_client_id'),
                        'default_value' => '',
                        'type' => 'text',
                        'placeholder' => ''
                    ),
                    array(
                        'name' => __('Client Secret', 'e2pdf'),
                        'key' => 'e2pdf_adobesign_client_secret',
                        'value' => get_option('e2pdf_adobesign_client_secret') === false ? '' : get_option('e2pdf_adobesign_client_secret'),
                        'default_value' => '',
                        'type' => 'text',
                        'placeholder' => ''
                    ),
                    array(
                        'name' => __('Region', 'e2pdf'),
                        'key' => 'e2pdf_adobesign_region',
                        'value' => get_option('e2pdf_adobesign_region') === false ? '' : get_option('e2pdf_adobesign_region'),
                        'default_value' => '',
                        'type' => 'text',
                        'placeholder' => __('na2', 'e2pdf')
                    ),
                    array(
                        'name' => __('Code', 'e2pdf'),
                        'key' => 'e2pdf_adobesign_code',
                        'value' => get_option('e2pdf_adobesign_code') === false ? '' : get_option('e2pdf_adobesign_code'),
                        'default_value' => '',
                        'type' => get_option('e2pdf_debug') ? 'text' : 'hidden',
                        'placeholder' => '',
                        'readonly' => 'readonly',
                    ),
                    array(
                        'name' => __('Web Access Point', 'e2pdf'),
                        'key' => 'e2pdf_adobesign_web_access_point',
                        'value' => get_option('e2pdf_adobesign_web_access_point') === false ? '' : get_option('e2pdf_adobesign_web_access_point'),
                        'default_value' => '',
                        'type' => get_option('e2pdf_debug') ? 'text' : 'hidden',
                        'placeholder' => '',
                        'readonly' => 'readonly',
                    ),
                    array(
                        'name' => __('Api Access Point', 'e2pdf'),
                        'key' => 'e2pdf_adobesign_api_access_point',
                        'value' => get_option('e2pdf_adobesign_api_access_point') === false ? '' : get_option('e2pdf_adobesign_api_access_point'),
                        'default_value' => '',
                        'type' => get_option('e2pdf_debug') ? 'text' : 'hidden',
                        'placeholder' => '',
                        'readonly' => 'readonly',
                    ),
                    array(
                        'name' => __('Refresh Token', 'e2pdf'),
                        'key' => 'e2pdf_adobesign_refresh_token',
                        'value' => get_option('e2pdf_adobesign_refresh_token') === false ? '' : get_option('e2pdf_adobesign_refresh_token'),
                        'default_value' => '',
                        'type' => 'text',
                        'placeholder' => '',
                        'type' => get_option('e2pdf_debug') ? 'text' : 'hidden',
                        'readonly' => 'readonly',
                    ),
                    array(
                        'name' => __('Access Token', 'e2pdf'),
                        'key' => 'e2pdf_adobesign_access_token',
                        'value' => get_transient('e2pdf_adobesign_access_token') === false ? '' : get_transient('e2pdf_adobesign_access_token'),
                        'default_value' => '',
                        'type' => get_option('e2pdf_debug') ? 'text' : 'hidden',
                        'placeholder' => '',
                        'readonly' => 'readonly',
                    ),
                    array(
                        'header' => __('Scopes', 'e2pdf'),
                        'name' => __('user_read', 'e2pdf'),
                        'key' => 'e2pdf_adobesign_scope_user_read',
                        'value' => get_option('e2pdf_adobesign_scope_user_read') === false ? '' : get_option('e2pdf_adobesign_scope_user_read'),
                        'default_value' => '',
                        'type' => 'select',
                        'options' => array(
                            '' => __('disabled', 'e2pdf'),
                            'self' => 'self',
                            'group' => 'group',
                            'account' => 'account'
                        )
                    ),
                    array(
                        'name' => __('user_write', 'e2pdf'),
                        'key' => 'e2pdf_adobesign_scope_user_write',
                        'value' => get_option('e2pdf_adobesign_scope_user_write') === false ? '' : get_option('e2pdf_adobesign_scope_user_write'),
                        'default_value' => '',
                        'type' => 'select',
                        'options' => array(
                            '' => __('disabled', 'e2pdf'),
                            'self' => 'self',
                            'group' => 'group',
                            'account' => 'account'
                        )
                    ),
                    array(
                        'name' => __('user_login', 'e2pdf'),
                        'key' => 'e2pdf_adobesign_scope_user_login',
                        'value' => get_option('e2pdf_adobesign_scope_user_login') === false ? '' : get_option('e2pdf_adobesign_scope_user_login'),
                        'default_value' => '',
                        'type' => 'select',
                        'options' => array(
                            '' => __('disabled', 'e2pdf'),
                            'self' => 'self',
                            'group' => 'group',
                            'account' => 'account'
                        )
                    ),
                    array(
                        'name' => __('agreement_read', 'e2pdf'),
                        'key' => 'e2pdf_adobesign_scope_agreement_read',
                        'value' => get_option('e2pdf_adobesign_scope_agreement_read') === false ? '' : get_option('e2pdf_adobesign_scope_agreement_read'),
                        'default_value' => '',
                        'type' => 'select',
                        'options' => array(
                            '' => __('disabled', 'e2pdf'),
                            'self' => 'self',
                            'group' => 'group',
                            'account' => 'account'
                        )
                    ),
                    array(
                        'name' => __('agreement_write', 'e2pdf'),
                        'key' => 'e2pdf_adobesign_scope_agreement_write',
                        'value' => get_option('e2pdf_adobesign_scope_agreement_write') === false ? '' : get_option('e2pdf_adobesign_scope_agreement_write'),
                        'default_value' => '',
                        'type' => 'select',
                        'options' => array(
                            '' => __('disabled', 'e2pdf'),
                            'self' => 'self',
                            'group' => 'group',
                            'account' => 'account'
                        )
                    ),
                    array(
                        'name' => __('agreement_send', 'e2pdf'),
                        'key' => 'e2pdf_adobesign_scope_agreement_send',
                        'value' => get_option('e2pdf_adobesign_scope_agreement_send') === false ? '' : get_option('e2pdf_adobesign_scope_agreement_send'),
                        'default_value' => '',
                        'type' => 'select',
                        'options' => array(
                            '' => __('disabled', 'e2pdf'),
                            'self' => 'self',
                            'group' => 'group',
                            'account' => 'account'
                        )
                    ),
                    array(
                        'name' => __('widget_read', 'e2pdf'),
                        'key' => 'e2pdf_adobesign_scope_widget_read',
                        'value' => get_option('e2pdf_adobesign_scope_widget_read') === false ? '' : get_option('e2pdf_adobesign_scope_widget_read'),
                        'default_value' => '',
                        'type' => 'select',
                        'options' => array(
                            '' => __('disabled', 'e2pdf'),
                            'self' => 'self',
                            'group' => 'group',
                            'account' => 'account'
                        )
                    ),
                    array(
                        'name' => __('widget_write', 'e2pdf'),
                        'key' => 'e2pdf_adobesign_scope_widget_write',
                        'value' => get_option('e2pdf_adobesign_scope_widget_write') === false ? '' : get_option('e2pdf_adobesign_scope_widget_write'),
                        'default_value' => '',
                        'type' => 'select',
                        'options' => array(
                            '' => __('disabled', 'e2pdf'),
                            'self' => 'self',
                            'group' => 'group',
                            'account' => 'account'
                        )
                    ),
                    array(
                        'name' => __('library_read', 'e2pdf'),
                        'key' => 'e2pdf_adobesign_scope_library_read',
                        'value' => get_option('e2pdf_adobesign_scope_library_read') === false ? '' : get_option('e2pdf_adobesign_scope_library_read'),
                        'default_value' => '',
                        'type' => 'select',
                        'options' => array(
                            '' => __('disabled', 'e2pdf'),
                            'self' => 'self',
                            'group' => 'group',
                            'account' => 'account'
                        )
                    ),
                    array(
                        'name' => __('library_write', 'e2pdf'),
                        'key' => 'e2pdf_adobesign_scope_library_write',
                        'value' => get_option('e2pdf_adobesign_scope_library_write') === false ? '' : get_option('e2pdf_adobesign_scope_library_write'),
                        'default_value' => '',
                        'type' => 'select',
                        'options' => array(
                            '' => __('disabled', 'e2pdf'),
                            'self' => 'self',
                            'group' => 'group',
                            'account' => 'account'
                        )
                    ),
                    array(
                        'name' => __('workflow_read', 'e2pdf'),
                        'key' => 'e2pdf_adobesign_scope_workflow_read',
                        'value' => get_option('e2pdf_adobesign_scope_workflow_read') === false ? '' : get_option('e2pdf_adobesign_scope_workflow_read'),
                        'default_value' => '',
                        'type' => 'select',
                        'options' => array(
                            '' => __('disabled', 'e2pdf'),
                            'self' => 'self',
                            'group' => 'group',
                            'account' => 'account'
                        )
                    ),
                    array(
                        'name' => __('workflow_write', 'e2pdf'),
                        'key' => 'e2pdf_adobesign_scope_workflow_write',
                        'value' => get_option('e2pdf_adobesign_scope_workflow_write') === false ? '' : get_option('e2pdf_adobesign_scope_workflow_write'),
                        'default_value' => '',
                        'type' => 'select',
                        'options' => array(
                            '' => __('disabled', 'e2pdf'),
                            'self' => 'self',
                            'group' => 'group',
                            'account' => 'account'
                        )
                    ),
                    array(
                        'name' => __('webhook_read', 'e2pdf'),
                        'key' => 'e2pdf_adobesign_scope_webhook_read',
                        'value' => get_option('e2pdf_adobesign_scope_webhook_read') === false ? '' : get_option('e2pdf_adobesign_scope_webhook_read'),
                        'default_value' => '',
                        'type' => 'select',
                        'options' => array(
                            '' => __('disabled', 'e2pdf'),
                            'self' => 'self',
                            'group' => 'group',
                            'account' => 'account'
                        )
                    ),
                    array(
                        'name' => __('webhook_write', 'e2pdf'),
                        'key' => 'e2pdf_adobesign_scope_webhook_write',
                        'value' => get_option('e2pdf_adobesign_scope_webhook_write') === false ? '' : get_option('e2pdf_adobesign_scope_webhook_write'),
                        'default_value' => '',
                        'type' => 'select',
                        'options' => array(
                            '' => __('disabled', 'e2pdf'),
                            'self' => 'self',
                            'group' => 'group',
                            'account' => 'account'
                        )
                    ),
                    array(
                        'name' => __('webhook_retention', 'e2pdf'),
                        'key' => 'e2pdf_adobesign_scope_webhook_retention',
                        'value' => get_option('e2pdf_adobesign_scope_webhook_retention') === false ? '' : get_option('e2pdf_adobesign_scope_webhook_retention'),
                        'default_value' => '',
                        'type' => 'select',
                        'options' => array(
                            '' => __('disabled', 'e2pdf'),
                            'self' => 'self',
                            'group' => 'group',
                            'account' => 'account'
                        )
                    ),
                )
            ),
            'extensions_group' => array(
                'name' => __('Extensions', 'e2pdf'),
                'action' => 'extensions',
                'options' => $extensions_options
            ),
        );

        if (class_exists('TRP_Translate_Press') || class_exists('WeglotWP\Services\Translate_Service_Weglot') || $all) {
            $options['translation_group'] = array(
                'name' => __('Translation', 'e2pdf'),
                'action' => 'translation',
                'options' => array(
                    array(
                        'name' => __('PDF Translation', 'e2pdf'),
                        'key' => 'e2pdf_pdf_translation',
                        'value' => get_option('e2pdf_pdf_translation') === false ? '2' : get_option('e2pdf_pdf_translation'),
                        'default_value' => '2',
                        'type' => 'select',
                        'options' => array(
                            '0' => __('No Translation', 'e2pdf'),
                            '1' => __('Partial Translation', 'e2pdf'),
                            '2' => __('Full Translation', 'e2pdf')
                        )
                    ),
            ));
        }

        $options = apply_filters('e2pdf_model_options_get_options_options', $options);

        if ($all) {
            $opt = array();
            foreach ($options as $group_key => $group) {
                foreach ($group['options'] as $option_key => $option) {
                    $opt[$option['key']] = isset($option['value']) ? $option['value'] : '';
                }
            }
            return $opt;
        } else {
            foreach ($options as $group_key => $group) {
                if ($exclude) {
                    if (in_array($group_key, $only_group)) {
                        unset($options[$group_key]);
                    }
                } else {
                    if (!in_array($group_key, $only_group)) {
                        unset($options[$group_key]);
                    }
                }
            }

            return $options;
        }
    }

    /**
     * Update Options list by group
     * 
     * @param string $group - Group data
     * @param array $data - Array list of options to set
     * 
     * @return bool - true
     */
    public static function update_options($group = '', $data = array()) {
        $options = self::get_options(false, array($group));
        foreach ($options as $group_key => $group) {
            foreach ($group['options'] as $option_key => $option_value) {
                if (array_key_exists($option_value['key'], $data)) {
                    if (isset($option_value['readonly']) && $option_value['readonly'] == 'readonly') {
                        
                    } else {
                        if ($option_value['key'] == 'e2pdf_mod_rewrite_url') {
                            if (false === strpos($data[$option_value['key']], '%uid%')) {
                                $data[$option_value['key']] = rtrim($data[$option_value['key']], '/') . '/%uid%/';
                            }
                            if (!trim(str_replace(array('/', '%uid%'), array('', ''), $data[$option_value['key']]))) {
                                $data[$option_value['key']] = 'e2pdf/%uid%/';
                            }
                            $data[$option_value['key']] = ltrim($data[$option_value['key']], '/');
                        }
                        update_option($option_value['key'], $data[$option_value['key']]);
                    }
                }
            }
        }
        return true;
    }

}

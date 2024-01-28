<?php

/**
 * E2pdf Zip Helper
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

class Helper_E2pdf_Translator {

    private $translator = null;

    public function __construct() {

        /**
         * Translate Multilingual sites – TranslatePress
         * https://wordpress.org/plugins/translatepress-multilingual/
         */
        if (class_exists('TRP_Translate_Press') && get_option('e2pdf_pdf_translation') !== '0') {
            $this->translator = TRP_Translate_Press::get_trp_instance();
        }

        /**
         * Weglot Translate – Translate your WordPress website and go multilingual
         * https://wordpress.org/plugins/weglot/
         */
        if (class_exists('WeglotWP\Services\Translate_Service_Weglot') && get_option('e2pdf_pdf_translation') !== '0' && function_exists('weglot_get_current_language') && function_exists('weglot_get_original_language')) {
            if (weglot_get_current_language() != weglot_get_original_language()) {
                $this->translator = new WeglotWP\Services\Translate_Service_Weglot();
            }
        }
    }

    public function translate($content = '', $type = 'default') {
        if ($this->translator && $content) {
            $translation = false;
            switch ($type) {
                case 'full':
                    if (get_option('e2pdf_pdf_translation') === false || get_option('e2pdf_pdf_translation') === '2') {
                        $translation = true;
                    }
                    break;
                case 'partial':
                    if (get_option('e2pdf_pdf_translation') === '1') {
                        $translation = true;
                    }
                    break;
                default:
                    $translation = true;
                    break;
            }

            if ($translation) {
                /**
                 * Weglot Translate – Translate your WordPress website and go multilingual
                 * https://wordpress.org/plugins/weglot/
                 */
                if (is_a($this->translator, 'WeglotWP\Services\Translate_Service_Weglot')) {
                    if (weglot_get_current_language() != weglot_get_original_language()) {
                        $content = str_replace(array('e2pdf-page-number', 'e2pdf-page-total'), array('e-2-p-d-f-p-a-g-e-n-u-m-b-e-r', 'e-2-p-d-f-p-a-g-e-t-o-t-a-l'), $content);
                        $content = $this->translator->weglot_treat_page($content);
                        $content = str_replace(array('e-2-p-d-f-p-a-g-e-n-u-m-b-e-r', 'e-2-p-d-f-p-a-g-e-t-o-t-a-l'), array('e2pdf-page-number', 'e2pdf-page-total'), $content);
                    }
                }

                /**
                 * Translate Multilingual sites – TranslatePress
                 * https://wordpress.org/plugins/translatepress-multilingual/
                 */
                if (is_a($this->translator, 'TRP_Translate_Press')) {
                    $content = $this->translator->get_component('translation_render')->translate_page($content);
                }
            }
        }
        return $content;
    }

    public function translate_url($url = false) {
        if ($this->translator && $url) {
            if (is_a($this->translator, 'WeglotWP\Services\Translate_Service_Weglot')) {
                if (weglot_get_current_language() != weglot_get_original_language()) {
                    $request_url_service = weglot_get_request_url_service();
                    $replaced_url = $request_url_service->create_url_object($url)->getForLanguage($request_url_service->get_current_language());
                    if ($replaced_url) {
                        $url = $replaced_url;
                    }
                }
            } else if (is_a($this->translator, 'TRP_Translate_Press')) {
                $url = $this->translator->get_component('url_converter')->get_url_for_language(null, $url, '');
            }
        }
        return $url;
    }

}

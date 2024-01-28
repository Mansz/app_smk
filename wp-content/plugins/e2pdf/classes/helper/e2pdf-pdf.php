<?php

/**
 * E2pdf Pdf Helper
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

class Helper_E2pdf_Pdf {

    private $allowed_ext = array(
        'pdf'
    );
    private $helper;

    public function __construct() {
        $this->helper = Helper_E2pdf_Helper::instance();
    }

    /**
     * Get Base64 Encoded Pdf
     * 
     * @param string $pdf - Pdf path
     * 
     * @return mixed - Base64 encoded Pdf OR FALSE
     */
    public function get_pdf($pdf, $extension = false) {

        $source = false;

        if ($pdf) {

            $pdf = trim($pdf);
            $site_url = site_url('/');
            $https = str_replace('http://', 'https://', $site_url);
            $http = str_replace('https://', 'http://', $site_url);
            if (!get_option('e2pdf_images_remote_request')) {
                $pdf_path = false;
                if (0 === strpos($pdf, $https)) {
                    $pdf_path = ABSPATH . substr($pdf, strlen($https));
                } elseif (0 === strpos($pdf, $http)) {
                    $pdf_path = ABSPATH . substr($pdf, strlen($http));
                }

                if ($pdf_path && @file_exists($pdf_path) && in_array(strtolower(pathinfo($pdf_path, PATHINFO_EXTENSION)), $this->allowed_ext)) {
                    $contents = @file_get_contents($pdf_path);
                    if ($contents) {
                        $source = base64_encode($contents);
                    }
                    if (!$source && $extension == 'formidable' && class_exists('FrmProFileField')) {
                        clearstatcache();
                        if (0200 == (fileperms($pdf_path) & 0777)) {
                            FrmProFileField::chmod($pdf_path, 0400);
                            $contents = @file_get_contents($pdf_path);
                            if ($contents) {
                                $source = base64_encode($contents);
                            }
                            FrmProFileField::chmod($pdf_path, 0200);
                        }
                    }
                }
            }

            if (!$source) {
                if (0 === strpos($pdf, ABSPATH) && @file_exists($pdf) && in_array(strtolower(pathinfo($pdf, PATHINFO_EXTENSION)), $this->allowed_ext)) {
                    $contents = @file_get_contents($pdf);
                    if ($contents) {
                        $source = base64_encode($contents);
                    }
                } elseif ($tmp_pdf = base64_decode($pdf, true)) {
                    if ($this->get_pdf_extension($tmp_pdf)) {
                        $source = $pdf;
                    }
                } elseif ($body = $this->get_by_url($pdf)) {
                    $source = base64_encode($body);
                }
            }
        }
        return $source;
    }

    /**
     * Get pdf by Url
     * 
     * @param string $url - Url to pdf
     * 
     * @return array();
     */
    public function get_by_url($url) {

        $timeout = get_option('e2pdf_images_timeout');
        if ($timeout === false) {
            $timeout = 30;
        }

        $response = wp_remote_get($url, array(
            'timeout' => $timeout,
            'sslverify' => false
        ));

        if (wp_remote_retrieve_response_code($response) === 200) {
            return wp_remote_retrieve_body($response);
        } else {
            return '';
        }
    }

    public function get_pdf_extension($pdf = false) {

        if (!$pdf) {
            return false;
        }

        $mime = false;
        if (function_exists('finfo_open') && function_exists('finfo_buffer')) {
            $f = finfo_open();
            $mime = finfo_buffer($f, $pdf, FILEINFO_MIME_TYPE);
        }

        switch ($mime) {
            case 'application/pdf':
                $ext = "pdf";
                break;

            default:
                $ext = false;
                break;
        }

        return $ext;
    }

}

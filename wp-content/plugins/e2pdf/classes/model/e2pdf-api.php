<?php

/**
 * E2Pdf Api Model
 * @copyright  Copyright 2017 https://e2pdf.com
 * @license    GPLv3
 * @version    1
 * @link       https://e2pdf.com
 * @since      0.00.01
 */
if (!defined('ABSPATH')) {
    die('Access denied.');
}

class Model_E2pdf_Api extends Model_E2pdf_Model {

    protected $api = null;

    /**
     * Submit API Request to Remote Server
     * @param string $key - Return Value by Key
     * @return mixed 
     */
    public function request($key = false, $api_server = false) {
        if ($this->api->action) {

            $api_processor = get_option('e2pdf_debug') && get_option('e2pdf_processor') ? get_option('e2pdf_processor') : '0';
            if ($api_processor == '2') {
                $api_version = '1.16.19';
            } else {
                $api_version = '1.20.17';
            }

            $data = array(
                'api_url' => $this->get_domain(),
                'api_license_key' => $this->get_license(),
                'api_processor' => apply_filters('e2pdf_api_processor', $api_processor),
                'api_version' => apply_filters('e2pdf_api_version', $api_version),
            );

            if (!$api_server) {
                if (defined('E2PDF_API_SERVER')) {
                    $api_server = E2PDF_API_SERVER;
                } else {
                    if (get_option('e2pdf_api')) {
                        $api_server = apply_filters('e2pdf_api', get_option('e2pdf_api'));
                    } else {
                        $api_server = apply_filters('e2pdf_api', 'api.e2pdf.com');
                    }
                }
            }

            $request_url = 'https://' . $api_server . '/' . $this->api->action;

            $timeout = get_option('e2pdf_connection_timeout');
            if ($timeout === false) {
                $timeout = 300;
            }

            $ch = apply_filters('e2pdf_api_connection', curl_init($request_url));
            curl_setopt($ch, CURLOPT_USERAGENT, $this->get_domain());
            curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
            curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
            if (!ini_get('safe_mode') && !ini_get('open_basedir')) {
                curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
            }
            curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, $timeout);

            if (defined('E2PDF_API_PROXY')) {
                curl_setopt($ch, CURLOPT_PROXY, E2PDF_API_PROXY);
            }
            if (defined('E2PDF_API_PROXYPORT')) {
                curl_setopt($ch, CURLOPT_PROXYPORT, E2PDF_API_PROXYPORT);
            }
            if (defined('E2PDF_API_PROXYUSERPWD')) {
                curl_setopt($ch, CURLOPT_PROXYUSERPWD, E2PDF_API_PROXYUSERPWD);
            }
            if (defined('E2PDF_API_PROXYTYPE')) {
                curl_setopt($ch, CURLOPT_PROXYTYPE, E2PDF_API_PROXYTYPE);
            }
            if (defined('E2PDF_API_PROXYAUTH')) {
                curl_setopt($ch, CURLOPT_PROXYAUTH, E2PDF_API_PROXYAUTH);
            }
            if (!empty($this->api->data)) {
                $data = array_merge($data, $this->api->data);
            }
            curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($data));

            $json = curl_exec($ch);
            $curl_errno = curl_errno($ch);
            $curl_error = curl_error($ch);
            curl_close($ch);

            if ($curl_errno > 0) {
                if ($api_server == 'api.e2pdf.com') {
                    return $this->request($key, 'api2.e2pdf.com');
                } elseif ($api_server == 'api3.e2pdf.com') {
                    return $this->request($key, 'api4.e2pdf.com');
                } else {
                    $response['error'] = "[{$curl_errno}] {$curl_error}";
                }
            } else {
                $result = json_decode($json, true);
                $response = $result['response'];

                if (($this->api->action === 'common/activate' || $this->api->action === 'license/update' || $this->api->action === 'license/request' ) && isset($response['license_key'])) {
                    update_option('e2pdf_license', $response['license_key']);
                }

                if (empty($response)) {
                    if ($api_server == 'api.e2pdf.com') {
                        return $this->request($key, 'api2.e2pdf.com');
                    } elseif ($api_server == 'api3.e2pdf.com') {
                        return $this->request($key, 'api4.e2pdf.com');
                    } else {
                        $response['error'] = __('Something went wrong!', 'e2pdf');
                    }
                }
            }

            if ($key) {
                if (isset($response[$key])) {
                    return $response[$key];
                } else {
                    return false;
                }
            } else {
                return $response;
            }
        }
        return false;
    }

    /**
     * Remove API Request options
     */
    public function flush() {
        $this->api = null;
    }

    /**
     * Set options for API Request
     * @param string $key - Key
     * @param mixed $value - Value
     */
    public function set($key, $value = false) {
        if (!$this->api) {
            $this->api = new stdClass();
        }
        if (is_array($key)) {
            foreach ($key as $attr => $value) {
                $this->api->$attr = $value;
            }
        } else {
            $this->api->$key = $value;
        }
    }

    /**
     * Get License
     * @return string - License Key
     */
    public function get_license() {
        return get_option('e2pdf_license');
    }

    /**
     * Get Domain
     * @return string - Domain
     */
    public function get_domain() {
        return site_url();
    }

}

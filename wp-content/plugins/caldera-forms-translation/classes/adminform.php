<?php

/**
 * Utility Functions for the admin
 *
 * @package CF_Translate
 * @author    Josh Pollock <Josh@CalderaWP.com>
 * @license   GPL-2.0+
 * @link
 * @copyright 2016 CalderaWP LLC
 */
class CF_Translate_AdminForm {

	/**
	 * Nonce action for UI nonce
	 *
	 * @since 0.1.0
	 *
	 * @var string
	 */
	public static $nonce_action = 'cf-translate-load-form';

	/**
	 * Verify nonce
	 *
	 * @since 0.1.0
	 *
	 * @param string $nonce Nonce from request
	 *
	 * @return false|int
	 */
	public static function verify_nonce( $nonce ){
		$valid =  wp_verify_nonce( $nonce, self::$nonce_action );
		return $valid;
	}

	/**
	 * Get a nonce
	 *
	 * @since 0.1.0
	 *
	 * @return string
	 */
	public static function nonce(){
		return wp_create_nonce( self::$nonce_action );
	}

	/**
	 * Get name of nonce field
	 *
	 * @since 0.1.0
	 *
	 * @return string
	 */
	public static function nonce_field_name(){
		return 'cftrans_nonce';
	}




}
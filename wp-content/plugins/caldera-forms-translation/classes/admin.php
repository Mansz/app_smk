<?php

/**
 * Set up admin
 *
 * @package CF_Translate
 * @author    Josh Pollock <Josh@CalderaWP.com>
 * @license   GPL-2.0+
 * @link
 * @copyright 2016 CalderaWP LLC
 */
class CF_Translate_Admin {

	/**
	 * Slugs for resources
	 *
	 * @since 0.1.0
	 *
	 * @var stdClass
	 */
	protected $slugs;

	/**
	 * Plugin directory path
	 *
	 * @since 0.1.0
	 *
	 * @var string
	 */
	protected $path;

	/**
	 * Plugin directory url
	 *
	 * @since 0.1.0
	 *
	 * @var string
	 */
	protected $url;

	/**
	 * Plugin version
	 *
	 * @since 0.1.0
	 *
	 * @var string
	 */
	protected $version;

	/**
	 * CF_Translate_Admin constructor.
	 *
	 * @since 0.1.0
	 *
	 * @param $slugs
	 * @param $path
	 * @param $url
	 * @param $version
	 */
	public function __construct( $slugs, $path, $url, $version ) {
		$this->slugs = $slugs;
		$this->path = $path;
		$this->url = $url;
		$this->version = $version;

		add_action( 'admin_menu', array( $this, 'add_menu' ) );
		add_action( 'admin_enqueue_scripts', array( $this, 'register' ) );
		add_action( 'admin_enqueue_scripts', array( $this, 'enqueue' ) );

	}

	/**
	 * Add submenu to Caldera Forms menu
	 *
	 * @since 0.1.0
	 *
	 * @uses "admin_menu" action
	 */
	public function add_menu(){
		add_submenu_page(
			$this->slugs->cf,
			__( 'Translations', 'caldera-forms-translation' ),
			__( 'Translations', 'caldera-forms-translation' ),
			Caldera_Forms::get_manage_cap(),
			$this->slugs->translate,
			array( $this, 'render_admin' )
		);
	}

	/**
	 * Render the main admin page
	 *
	 * @since 0.1.0
	 */
	public function render_admin(){
		echo $this->webpack( true );
	}

	/**
	 * Register scripts/styles
	 *
	 * @since 0.1.0
	 *
	 * @uses "admin_enqueue_scripts"
	 */
	public function register( ){

	}

	/**
	 * Load scripts/styles
	 *
	 * @since 0.1.0
	 *
	 * @param string $hook Current hook
	 *
	 * @uses "admin_enqueue_scripts"
	 */
	public function enqueue( $hook ){
		if( $this->slugs->cf . '_page_' . $this->slugs->translate == $hook ){

		}

	}

	/**
	 * Create JavaScript localizer object
	 *
	 * @since 0.1.0
	 *
	 * @return CF_Translate_Localize
	 */
	public function localize(){
		$form = $this->get_form();
		if ( is_wp_error( $form ) ) {
			$form = null;
		}

		$localizer = new CF_Translate_Localize( $form );

		return $localizer;


	}

    /**
     * Get the form based on current HTTP request
     *
     * @since 0.1.0
     *
     * @return array|CF_Translate_Form|null|WP_Error
     */
	protected function get_form(){
		if( ! empty( $_GET[ 'form' ] ) && is_string( $_GET[ 'form' ] ) && ! empty( $_GET[ 'cftrans_nonce' ] ) ) {
			$form_id = $_GET[ 'form' ];
			$nonce   = $_GET[ 'cftrans_nonce' ];
			if( CF_Translate_AdminForm::verify_nonce( $nonce ) ){
				return  CF_Translate_Factories::get_form( esc_attr( $form_id ) );
			}
		}

		return null;

	}

	/**
	 * Print webpack entry to screen
	 *
	 * @param $enqueue_admin
	 *
	 * @return string
	 */
	protected function webpack( $enqueue_admin = true ){
		$inline = \Caldera_Forms_Render_Util::create_cdata( 'var CF_TRANS_ADMIN= ' . wp_json_encode( $this->localize()->to_array() ) . ';' );
		if ( $enqueue_admin ) {
			wp_enqueue_style( \Caldera_Forms_Admin_Assets::slug( 'admin', false ), \Caldera_Forms_Render_Assets::make_url( 'admin', false ) );
		}
		ob_start();

		include $this->path . 'dist/index.php';
		$str = ob_get_clean();
		foreach (
			[
				'styles',
				'manifest',
				'vendor',
				'client'
			] as $thing
		) {
			$str = str_replace( '/' . $thing, $this->url . 'dist/' . $thing, $str );
		}

		return $inline . str_replace( [
			'<head>',
			'</head>'
		], '', $str );
	}

}
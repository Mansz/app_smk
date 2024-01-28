<?php
/**
 * REST API routes for admin
 *
 * @package CF_Translate
 * @author    Josh Pollock <Josh@CalderaWP.com>
 * @license   GPL-2.0+
 * @link
 * @copyright 2016 CalderaWP LLC
 */
class CF_Translate_API implements Caldera_Forms_API_Route {

	/**
	 * @inheritdoc
	 */
	public function add_routes( $namespace ) {
		$base = '/translations/admin';
		register_rest_route( $namespace, $base, array(
			'methods' => WP_REST_Server::CREATABLE,
			'callback' => array( $this, 'save_translations' ),
			'permission_callback' => 'cf_translate_can_translate',
			'args' => array(
				'language' => array(
					'required' => true,

				),
				'form_id' => array(
					'required' => true,
				),
				'fields' => array(
					'required' => true,
				)
			)

		) );
		$endpoint =  $base . '/language';
		register_rest_route( $namespace, $endpoint,
			array(
				'methods' => WP_REST_Server::CREATABLE,
				'callback' => array( $this, 'add_language' ),
				'permission_callback' => 'cf_translate_can_translate',
				'args' => array(
					'language' => array(
						'required' => true,

					),
					'form_id' => array(
						'required' => true,
					)
				)

			)
		);
		register_rest_route( $namespace, $endpoint,	array(
				'methods' => WP_REST_Server::READABLE,
				'callback' => array( $this, 'get_language' ),
				'permission_callback' => 'cf_translate_can_translate',
				'args' => array(
					'language' => array(
						'required' => true,

					),
					'form_id' => array(
						'required' => true,
					)
				)

			)
		);

		$endpoint = $base . '/form';
		register_rest_route( $namespace, $endpoint ,	array(
				'methods' => WP_REST_Server::READABLE,
				'callback' => array( $this, 'get_form' ),
				'permission_callback' => 'cf_translate_can_translate',
				'args' => array(
					'form_id' => array(
						'required' => true,
					)
				)

			)
		);


	}

	/**
	 * Save a translation set
	 *
	 * @since 0.3.0
	 *
	 * @param WP_REST_Request $request
	 *
	 * @return Caldera_Forms_API_Error|Caldera_Forms_API_Response
	 */
	public function save_translations( WP_REST_Request $request ){
		$form = CF_Translate_Factories::get_form( $request[ 'form_id' ] );
		if( is_object( $form ) && ! is_wp_error( $form ) ) {

			$language = $request[ 'language' ];

			$fields = array();
			foreach ( $request[ 'fields' ] as $id => $field ) {
				$field[ 'ID' ] = $id;
				$fields[ $id ] = CF_Translate_Factories::field_object( $field, true );
				if( ! empty( $field[ 'option' ] ) ){
					foreach ( $field[ 'option'  ] as $opt => $label ){
						$fields[ $id ]->add_option( $opt, $label );
					}
				}

			}

			$form_info = $request->get_param( 'form_info' );
			if( ! empty( $form_info ) ){
				foreach ( $form_info as $key => $value ){
					$form->get_translator()->add_form_info(
						$language,
						$key,
						$value
					);

				}
			}

			/** @var  CF_Translate_Form $form */
			$form->get_translator()->add_fields_to_language( $language, $fields );
			$saved = $form->save();
			if ( $saved ) {
				return new Caldera_Forms_API_Response( __( 'Saved', 'caldera-forms-translations '), 201 );

			}else{
				return new Caldera_Forms_API_Error();
			}
		}

		return  Caldera_Forms_API_Response_Factory::error_form_not_found();

	}

	/**
	 * Add fields for a language
	 *
	 * @since 0.3.0
	 *
	 * @param WP_REST_Request $request
	 *
	 * @return Caldera_Forms_API_Error|Caldera_Forms_API_Response
	 */
	public function add_language( WP_REST_Request $request ){
		$form = CF_Translate_Factories::get_form( $request[ 'form_id' ] );
		if( ! empty( $form ) ) {
			$language = trim( strip_tags( trim( $request[ 'language' ] ) ) );

			$form->get_translator()->add_language( $language );

			$saved = $form->save();
			if ( $saved ) {
				return $this->form_response( $request->get_param( 'form_id' ), 201 );

			}else{
				return new Caldera_Forms_API_Error();
			}

		}else{
			return new Caldera_Forms_API_Error();
		}
	}

	/**
	 * Get fields for a language
	 *
	 * @since 0.3.0
	 *
	 * @param WP_REST_Request $request
	 *
	 * @return Caldera_Forms_API_Error|Caldera_Forms_API_Response
	 */
	public function get_language( WP_REST_Request $request ){
		$form = CF_Translate_Factories::get_form( $request[ 'form_id' ] );
		if( ! empty( $form ) ) {
			$language =  $request[ 'language' ];

			$form->get_translator()->add_language( $language );
			$form->get_translator()->add_fields_to_language( $language, CF_Translate_Factories::new_language_fields( $form ) );

			$fields = $form->get_translator()->get_fields( $language, true );
			return new Caldera_Forms_API_Response( $fields );
		}else{
			return new Caldera_Forms_API_Error();
		}
	}

	public function get_form( WP_REST_Request $request ){
		return $this->form_response( $request->get_param( 'form_id' ) );

	}

	/**
	 * @param $form_id
	 *
	 * @return Caldera_Forms_API_Response
	 */
	protected function form_response( $form_id, $status = 200 ){

		$localizer = new CF_Translate_Localize( CF_Translate_Factories::get_form( $form_id ) );

		return new Caldera_Forms_API_Response( $localizer->get_form_data(), $status );
	}
}
<?php

/**
 * Sets up the CFTRANS object for amdin
 *
 * @package CF_Translate
 * @author    Josh Pollock <Josh@CalderaWP.com>
 * @license   GPL-2.0+
 * @link
 * @copyright 2016 CalderaWP LLC
 */
class CF_Translate_Localize {

	/**
	 * Current form
	 *
	 * Not always set!
	 *
	 * @since 0.1.0
	 *
	 * @var CF_Translate_Form|null
	 */
	protected $form;

	/**
	 * CF_Translate_Localize constructor.
	 *
	 * @since 0.1.0
	 *
	 * @param CF_Translate_Form|null $form
	 */
	public function __construct( CF_Translate_Form $form = null ) {
		$this->form = $form;
	}

	/**
	 * Get data formatted as array
	 *
	 * @since 0.1.0
	 *
	 * @return array
	 */
	public function to_array() {
		$data = array(
			'strings' => $this->strings(),
			'data'    => $this->data(),
			'local'   => get_locale(),
			'languages' => CF_Translate_Languages::get_instance()->to_array(),
			'forms' => array()
		);

		foreach( Caldera_Forms_Forms::get_forms(true ) as $id => $form ){
			$data[ 'forms' ][ $id ] = array(
				'ID' => $id,
				'name' => $form[ 'name' ]
			);
		}

		$data = $this->get_form_data( $data );

		return $data;
	}

	protected function add_field_options( CF_Translate_Field $field){

		$opts = $field->option;
		if( empty( $opts ) ){
			if ( in_array( Caldera_Forms_Field_Util::get_type( $field->ID, $this->form->get_form() ), array(
				'checkbox',
				'radio',
				'dropdown',
				'select2',
				'toggle_switch'
			)) ) {
				$field_config          = Caldera_Forms_Field_Util::get_field( $field->ID, $this->form->get_form() );

				if( is_array( $field_config[ 'config' ][ 'option' ] ) ) {
					$field->option = $field_config[ 'config' ][ 'option' ];
				}else{
					$field->option = null;
				}
			}
		}

		return $field;
	}

	/**
	 * Get prepared form info
	 *
	 * @since 0.1.0
	 *
	 * @return array
	 */
	protected function form_info() {
		$translator = $this->form->get_translator();
		if( is_object( $translator ) ){
			return $translator->get_form_info();
		}

		return array(
			'name' => $this->form->get_name(),
			'success' => $this->form[ 'success' ],
			'pageNames' => $this->form[ 'page_names' ]
		);
	}
	/**
	 * Get prepared strings for UI
	 *
	 * @since 0.1.0
	 *
	 * @return array
	 */
	protected function strings() {
		return array(
			'bad_language'         => __( 'Could not add language, please check that it is supported.', 'caldera-forms-translation' ),
			'translations_saved'   => __( 'Translations Saved :)', 'caldera-forms-translation' ),
			'save_error'           => __( 'Not Saved :(', 'caldera-forms-translation' ),
			'unsaved_translations' => __( 'You Have Unsaved Translations!', 'caldera-forms-translation' ),
			'unsaved_settings'     => __( 'You Have Unsaved Settings!', 'caldera-forms-translation' ),
			'error'                => __( 'An unknown error has occured.', 'caldera-forms-translation' ),
			'nothing_to_save'      => __( 'Nothing to save', 'caldera-forms-translations' ),
			'choose_form'          => __( 'Choose Form', 'caldera-forms-translations' ),
			'add_lang_form'          => __( 'Add Language To This Form', 'caldera-forms-translations' ),
			'choose_field'         => __( 'Choose Field', 'caldera-forms-translations' ),
			'choose_lang'          => __( 'Choose Language', 'caldera-forms-translations' ),
			'add_lang'          => __( 'Add Language', 'caldera-forms-translations' ),
			'add_lang_q'          => __( 'Add Language To Form Translations?', 'caldera-forms-translations' ),
			'select_language'      => __( 'Select A Language', 'caldera-forms-translations' ),
			'select_field'         => __( 'Select A Field', 'caldera-forms-translations' ),
			'current_language'     => __( 'Current Language', 'caldera-forms-translations' ),
			'field_label'     => __( 'Field Label', 'caldera-forms-translations' ),
			'field_description'     => __( 'Field Description', 'caldera-forms-translations' ),
			'field_default'     => __( 'Field Default', 'caldera-forms-translations' ),
			'field_options'     => __( 'Field Options', 'caldera-forms-translations' ),
			'field_option'     => __( 'Field Option', 'caldera-forms-translations' ),
			'save'     => __( 'Save', 'caldera-forms-translations' ),
			'saving'     => __( 'Saving', 'caldera-forms-translations' ),
			'saved'     => __( 'Saved', 'caldera-forms-translations' ),
			'you_are_trans'     => __( 'You Are Translating', 'caldera-forms-translations' ),
			'success_message' =>__('Success Message', 'caldera-forms-translations')

		);
	}

	/**
	 * Get other info for UI
	 *
	 * @since 0.1.0
	 *
	 * @return array
	 */
	protected function data() {
		return array(
			'rest_nonce' => wp_create_nonce( 'wp_rest' ),
			'nonce'      => CF_Translate_AdminForm:: nonce(),
			'api'        => array(
				'root' => esc_url_raw( Caldera_Forms_API_Util::url( 'translations/admin' ) ),
				'form' => esc_url_raw( Caldera_Forms_API_Util::url( 'translations/form' ) ),
				'save' => esc_url_raw( Caldera_Forms_API_Util::url( 'translations/admin' ) ),
				'lang' => esc_url_raw( Caldera_Forms_API_Util::url( 'translations/admin/language' ) )
			)
		);
	}

	/**
	 * Add data about form to data
	 *
	 * Separate method used by API endpoint and in initial data print to DOM via wp_localize_script
	 *
	 * @param array $data Data to merge form data in with
	 *
	 * @return array
	 */
	public function get_form_data( array  $data = array() ){
		if ( ! empty( $this->form ) ) {
			$data[ 'form' ] = array(
				'ID'        => $this->form->get_id(),
				'name' => $this->form->get_name(),
				'languages' => $this->form->get_translator()->get_languages(),
				'languages_named' => $this->form->get_translator()->get_languages_with_names(),
				'info' => $this->form_info(),
			);
			foreach ( $data[ 'form' ][ 'languages' ] as $language ) {
				$fields = $this->form->get_translator()->get_fields( $language );
				if ( ! empty( $fields ) ) {
					foreach ( $fields as $id => $field ) {
						$_field = array();
						if ( $field instanceof CF_Translate_Field ) {

							$_field = $this->add_field_options( $field )->to_array( false );
						}

						if ( empty( $_field[ 'type' ] ) ) {
							$_field[ 'type' ] = Caldera_Forms_Field_Util::get_type( Caldera_Forms_Field_Util::get_field( $field->ID, $this->form->get_form() ), $this->form->get_form() );
						}

						$data[ 'form' ][ 'fields' ][ $language ][ $id ] = $_field;
					}
				}

				//add fields without translations
				foreach ( $this->form[ 'fields' ] as $id => $field ) {
					if( ! isset( $data[ 'form' ][ 'fields' ][ $language ] ) ){
						$data[ 'form' ][ 'fields' ][ $language ] = array();
					}
					if ( ! array_key_exists( $id, $data[ 'form' ][ 'fields' ][ $language ] ) ) {

						$_field = $this->add_field_options( CF_Translate_Factories::field_object( $field ) )->to_array( false );

						$_field[ 'type' ] = Caldera_Forms_Field_Util::get_type( Caldera_Forms_Field_Util::get_field( $field[ 'ID' ], $this->form->get_form() ), $this->form->get_form() );


						$data[ 'form' ][ 'fields' ][ $language ][ $id ] = $_field;

					}

				}


			}



		}else{
			$data[ 'form' ] = array(
				'ID'        => 0,
				'languages' => array(),
				'fields'    => array(),
				'name' => '',
				'info' => array( 'name' => '', 'success' => '', 'form_pages' => array() ),
			);
		}

		return $data;
	}

}
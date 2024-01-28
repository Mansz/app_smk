<?php

/**
 * Add all form languages to the language picker field
 *
 * @package CF_Translate
 * @author    Josh Pollock <Josh@CalderaWP.com>
 * @license   GPL-2.0+
 * @link
 * @copyright 2016 CalderaWP LLC
 */
class CF_Translate_PickerOptions extends CF_Translate_Filter {


	/**
	 * Languages in use
	 *
	 * @since 0.2.0
	 *
	 * @var array
	 */
	protected $languages;

	/**
	 * Add all field options to language picker
	 *
	 * @since 0.1.0
	 *
	 * @uses "caldera_forms_render_get_field_type-language-picker" filter
	 *
	 * @param $field
	 * @param $form
	 *
	 * @return array
	 */
	public function filter( $field, $form ){
		if( $form[ 'ID' ] != $this->form[ 'ID' ] ){
			return $form;
		}

		$languages = $this->form->get_translator()->get_languages();
		foreach ( $languages as $_language ){
			$code = $this->prepare_code( $_language );
			if( false == $code ){
				continue;
			}

			$language = $this->get_language( $code );
			if ( ! empty( $language ) ){
				$field['config']['option'][$code] = array(
					'value'	=>	$code,
					'label' =>	$language[ 'name' ]
				);
			}

		}

		$this->localize( $languages, $field[ 'ID' ] );
		return $field;
	}

	/**
	 * Setup our JavaScript
	 *
	 * @since 0.2.0
	 *
	 * @param array $languages language codes
	 * @param string $field_id Field ID
	 */
	protected function localize( $languages, $field_id ){
		global $current_form_count;
		$slug = Caldera_Forms_Render_Assets::make_slug( 'language-picker' );
		if ( ! wp_script_is( $slug ) ) {
			wp_enqueue_script( $slug, CFTRANS_URL . '/assets/js/language-picker.js' );
		}
		wp_localize_script( $slug, 'CF_LANGUAGE_PICKER_FIELD', array(
			'languages' => json_encode( $languages ),
			'form_id'   => esc_attr( $this->form->get_id() ),
			'field_id'  => esc_attr( $field_id ),
			'field_id_attr' => esc_attr( $field_id . '_' . $current_form_count ),
			'default'   => cf_translate_get_current_language(),
			'api'       => cf_ajax_api_url( $this->form->get_id() ),
			'wrap_id_attr' => esc_attr( $this->form->get_id() . '_' . $current_form_count ),
			'current_count' => $current_form_count
		) );

	}
	/**
	 * Get language if valid
	 *
	 * @since 0.1.0
	 *
	 * @param string $code Language code
	 *
	 * @return array|void
	 */
	protected function get_language( $code ){

		if( empty( $this->languages ) ){
			$this->languages = CF_Translate_Languages::get_instance()->to_array();
		}

		if( ! empty( $this->languages[ $code ] ) ){
			return $this->languages[ $code ];
		}
	}

	/**
	 * Validate language code
	 *
	 * @since 0.10
	 *
	 * @param string $code Language code
	 *
	 * @return string
	 */
	protected function prepare_code( $code ) {
		if( ! CF_Translate_Languages::get_instance()->valid( $code ) ){
			return false;
		}
		return $code;

	}

}
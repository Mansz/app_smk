<?php

class CF_Translate_Success extends CF_Translate_Filter{

	/**
	 * Change success message for form
	 *
	 * @uses "caldera_forms_submit_get_form" filter
	 *
	 * @since 1.2.0
	 *
	 * @param array $form Form config
	 * @return array
	 */
	public function translate( $form ){
		$form_info = $this->form->get_translator()->get_form_info( );
		if(
			isset(
				$form_info[ $this->current_language() ],
				$form_info[ $this->current_language() ][ 'success' ]
			)
		){
			$form[ 'success' ] = $form_info[ $this->current_language() ][ 'success' ];
		}

		return $form;
	}

}
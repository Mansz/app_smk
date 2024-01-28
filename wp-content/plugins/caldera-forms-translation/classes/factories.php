<?php

/**
 * Object factories
 *
 * @package CF_Translate
 * @author    Josh Pollock <Josh@CalderaWP.com>
 * @license   GPL-2.0+
 * @link
 * @copyright 2016 CalderaWP LLC
 */
class CF_Translate_Factories{

    /**
     * Get form as CF_Translate_Form object
     *
     * @since 0.1.0
     *
     * @param string|array $form_id Form config or form ID
     *
     * @return CF_Translate_Form|null|WP_Error
     */
    public static function get_form( $form_id ){
	    if (  ! is_array( $form_id ) ) {
		    $form = Caldera_Forms_Forms::get_form( $form_id );
	    }else{
	    	$form = $form_id;
	    }

        if( ! empty( $form ) ){
            $form = new CF_Translate_Form( $form );
            return $form;
        }else{
            return new WP_Error('', __( 'Can not find form', 'caldera-forms-translate' ) );
        }
    }

	/**
	 * Get a CF_Translate_Translator object for a form
	 *
	 * @since 0.1.0
	 *
	 * @param array $form Form config
	 *
	 * @return CF_Translate_Translator
	 */
    public static function new_translator( array  $form ){
        $code = get_locale();
        $translator = new CF_Translate_Translator(  );
        $translator->add_language( $code );

		$translator->add_fields_to_language( $code, self::new_language_fields( $form ) );

        return $translator;
    }


	/**
	 * Create a set of fields for a language
	 *
	 * @since 0.1.0
	 *
	 * @param CF_Translate_Form|array $form The form
	 *
	 * @return array
	 */
    public static function new_language_fields( $form  ){
        if( $form instanceof  CF_Translate_Form ){
            $form = $form->get_form();
        }
        $fields = Caldera_Forms_Forms::get_fields( $form, false );
        $objects = array();
        foreach ( $fields as $id => $field ){
            $objects[ $id ] = self::field_object( $field );
        }

        return $objects;
    }

	/**
	 * Create a CF_Translate_Field object form field config array
	 *
	 * @since 0.1.0
	 *
	 * @param array $field Field config
	 * @param bool $sanitize Optional. If true, field object is sanitized. False is default
	 *
	 * @return CF_Translate_Field
	 */
    public static function field_object( array $field, $sanitize = false ){
        $field_object = new CF_Translate_Field();
        foreach ( $field_object->get_field_names() as $key ){
        	if( 'option' === $key ){
        		if( empty( $field[ 'option' ] ) ){
        			continue;
		        }
		        foreach ( $field[ 'option' ] as $opt => $option ){
        			if( isset( $option[ 'label' ] ) ){

					}
		        }

	        }else{
		        if ( isset( $field[ $key ] ) ) {
			        $field_object->$key = $field[$key];
		        }
	        }

        }


        if( $sanitize ){
            return self::sanatize_field( $field_object );
        }
        return $field_object;

    }

	/**
	 * Sanitize a CF_Translate_Field object
	 *
	 * @since 0.1.0
	 *
	 * @param CF_Translate_Field $field
	 *
	 * @return CF_Translate_Field
	 */
    public static function sanatize_field( CF_Translate_Field $field  ){
        $field->ID = trim( strip_tags( $field->ID ) );
	    foreach ( $field->get_field_names() as $key ){
		    if (  ! empty(  $field->$key  ) ) {
		    	switch( $key ){
				    case 'ID':
				    	continue;
						break;
				    case 'option':
				    	if( is_array( $field->option ) ){
				    	    foreach ( $field->option as $opt => $label ){
				    	    	$field->add_option(
				    	    		$opt,
							        Caldera_Forms_Sanitize::sanitize( $opt )
						        );
					        }
					    }
					    break;
				    default :
					    $field->$key = Caldera_Forms_Sanitize::sanitize( $field->$key );
					    break;
			    }
		    }
	    }

        return $field;

    }
}
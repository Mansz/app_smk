<?php

/**
 * Filter abstraction
 *
 * Might be a bad idea, but it's sunday night and Josh is having fun.
 *
 * @package CF_Translate
 * @author    Josh Pollock <Josh@CalderaWP.com>
 * @license   GPL-2.0+
 * @link
 * @copyright 2016 CalderaWP LLC
 */
abstract class CF_Translate_Filter {

	/**
	 *
	 *  @since 0.1.0
	 *
	 * @var CF_Translate_Form
	 */
	protected $form;

	/**
	 *
	 * @since 0.1.0
	 *
	 * @var array
	 */
	protected $args;

	/**
	 * CF_Translate_Filter constructor.
	 * @param CF_Translate_Form $form
	 * @param array $args
	 */
	public function __construct( CF_Translate_Form  $form, array $args ){
		$this->form = $form;
		$this->parse_args( $args );
		$this->add_hook();

	}

	/**
	 * Add hook
	 *
	 * @since 0.1.0
	 */
	protected function add_hook(){
		add_filter( $this->args[ 'hook' ], array( $this, $this->args[ 'callback'] ), $this->args[ 'priority' ], $this->args[ 'num_args' ] );
	}


	/**
	 * Remove field translation hook
	 *
	 * @since 0.1.0
	 */
	public function remove_hook(){
		remove_filter( $this->args[ 'hook' ], array( $this, $this->args[ 'callback'] ), $this->args[ 'priority' ] );
	}

	/**
	 * Parse object args
	 *
	 * @since 0.1.0
	 *
	 * @param array $args
	 */
	protected function parse_args( $args ){
		$this->args = wp_parse_args( $args, array(
			'priority' => 51,
			'callback' => 'translate',
			'hook' => '',
			'language' => cf_translate_get_current_language(),
			'num_args' => 2
		));
	}

	/**
	 * Get current language
	 *
	 * @since 1.2.0
	 *
	 * @return string
	 */
	protected function current_language(){
		return $this->args[ 'language' ];
	}



}
/**
 * Custom scripts for Toggle Control
 *
 * @package Mystery Themes
 * @subpackage News Portal
 * @since 2.0.0
 */

wp.customize.controlConstructor['np-buttonset'] = wp.customize.Control.extend({

	ready: function() {

		'use strict';

		var control = this;

		// Change the value
		this.container.on( 'click', 'input', function() {
			control.setting.set( jQuery( this ).val() );
		});
	}

});

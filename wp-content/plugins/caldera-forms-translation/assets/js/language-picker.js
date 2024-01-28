window.addEventListener("load", function(){

    function CF_Translate_Language_Picker( settings, $ , explicit_lang){
        var current = explicit_lang || settings.default;
        var $field = $( document.getElementById( settings.field_id_attr ) );

        $field.on( 'change', function(e){
            var new_choice = $field.val();
            if( new_choice != current ){
                current = new_choice;
                $.get( settings.api, {
                    cf_lang: new_choice
                }).success( function( r ){

                    // Remove any event reference to the field so it doesn't stick around
                    $field.off('change');

                    var wrap =  document.getElementById( settings.wrap_id_attr  );
                    wrap.innerHTML = r;

                    $field = $( document.getElementById( settings.field_id_attr ) );

                    // Ensure the field is set to the value which is our "current";
                    $field.val(current);

                    CF_Translate_Language_Picker(settings, $, new_choice);
                }).error( function( r ){

                });
            }
        });

    }

    if ( 'object' == typeof CF_LANGUAGE_PICKER_FIELD ) {
        var chooser = CF_Translate_Language_Picker(CF_LANGUAGE_PICKER_FIELD, jQuery);
    }

});
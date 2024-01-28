<?php
if ( ! defined( 'ABSPATH' ) ) {
    exit;
}
$lang = CF_Translate_Languages::get_instance();
?>
<script>
    var cf_lang_codes = <?php echo json_encode( $lang ); ?>

</script>
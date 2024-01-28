<?php
/**
 * Caldera Forms Translate - Main View
 *
 * @package CF_Translate
 * @author    Josh Pollock <Josh@JoshPress.net>
 * @license   GPL-2.0+
 * @link
 * @copyright 2016 CalderaWP LLC
 */

?>

<div class="caldera-editor-header" id="cf-translate-header">
	<ul class="caldera-editor-header-nav">
		<li class="caldera-editor-logo">
		<span class="caldera-forms-name">
			Caldera Forms: Translations
		</span>
		</li>
	</ul>
</div>
<div class="support-admin-page-wrap caldera-grid" id="cf-translate-admin" style="margin-top: 75px;">
	<div id="cf-translate-forms-list" >
		<?php
			$forms = Caldera_Forms_Forms::get_forms( true, true );
			if( empty( $forms ) ){
				printf( '<p>%s</p>', esc_html__( 'You do not have any forms yet', 'caldera-forms-translation' ) );
			}else{
				printf( '<h3>%s</h3>', esc_html__( 'Choose Form', 'caldera-forms-translation') );
				?>
					<form id="cf-translations-form-chooser" action="<?php echo esc_url_raw( admin_url( 'admin.php?page=caldera-forms-translate' ) ); ?>">
						<?php wp_nonce_field( CF_Translate_AdminForm::$nonce_action, CF_Translate_AdminForm::nonce_field_name(), false ); ?>

						<div class="caldera-config-group">
							<label for="cf-translate-form-list" class="">
								<?php esc_html_e('Select Form', 'caldera-forms-translation'); ?>
							</label>
							<div class="caldera-config-field" id="cf-translate-form-list-wrap">
								<select id="cf-translate-form-list" class=" field-config" name="form">

									<?php
										foreach ( $forms as $id => $form ){
											$selected = '';
											if( ! empty( $_GET[ 'form' ] ) && $_GET[ 'form' ] == $id ){
												$selected = 'selected';
											}
											printf( '<option value="%s" %s >%s', esc_attr( $id ), $selected, esc_html( $form[ 'name' ] ) );
										}
									?>
								</select>
								<?php
								if( empty( $_GET[ 'form' ] ) ){
									$type = 'primary';
								}else{
									$type = 'secondary';
								}
								submit_button( __( 'Load Form', 'caldera-forms-translation' ), $type );
								?>
							</div>
						</div>
						<input type="hidden" value="caldera-forms-translate" class="block-input" name="page" />


					</form>
	</div>
	<div id="cf-translate-translation-section">
				<?php
			}


        if ( ! empty( $_GET[ 'form' ] ) ) {
            if (!empty($_GET['cftrans_nonce']) && true == CF_Translate_AdminForm::verify_nonce($_GET['cftrans_nonce'])) {

                ?>
                <form id="cf-translate-language-control">
	                <?php printf('<h3>%s</h3>', esc_html__('Choose Language', 'caldera-forms-translation')); ?>
                    <div >
	                    <div class="caldera-config-group">
	                        <label for="cf-translate-language-chooser">
	                            <?php esc_html_e('Select Language', 'caldera-forms-translation'); ?>
	                        </label>
	                        <div class="caldera-config-field">
	                            <select id="cf-translate-language-chooser" class="block-input" name="language">
	                            </select>
	                        </div>
	                    </div>

	                    <div class="caldera-config-group">
	                        <label for="cf-translate-add-language" class="">
	                            <?php esc_html_e('Enter New Language', 'caldera-forms-translation'); ?>
	                        </label>
	                        <div class="caldera-config-field">
	                            <select id="cf-translate-add-language" class="block-input">
		                            <?php foreach ( CF_Translate_Languages::get_instance()->to_array()  as $lang ){
		                            	printf( '<option value="%s">%s</option>', esc_attr( $lang[ 'code' ] ), esc_html( $lang[ 'name' ] ) );
		                            }?>
	                            </select>
	                        </div>
	                    </div>
	                    <div class="caldera-config-group">
	                        <button class="btn button-secondary button-secondary" id="cf-translate-add-language-button">
	                            <?php esc_html_e('Add Language', 'caldera-forms-translation'); ?>
                            </button>
	                    </div>
                    </div>
	                <div >
	                    <?php
	                    wp_nonce_field('choose-form-language', 'cftrans_nonce_lang', false);
	                    submit_button(__('Load Language', 'caldera-forms-translation'), 'secondary', 'cf-translate-load-language', false );
	                    ?>
	                </div>
                </form>
                <?php
                printf('<h3>%s</h3>', esc_html__('Translate Fields', 'caldera-forms-translation'));
                ?>
                <div class="">
	                <div class="caldera-config-group cf-translate-field-group" style="display: none;visibility: hidden" aria-hidden="true">
	                    <label for="cf-translate-field-select">
	                        <?php esc_html_e('Select Field', 'caldera-forms-translation'); ?>
	                    </label>
	                    <div class="caldera-config-field">
	                        <select id="cf-translate-field-select" type="text">

	                        </select>
	                    </div>
	                </div>

	                <div id="cf-translate-field-translator-wrap">

	                </div>
	            </div>

				<div >
					<div class="">
						<button role="button" id="cf-translations-save-button" title="<?php esc_attr_e('Save Translations For This Language', 'caldera-forms-translation' ); ?>" class="button primary button-primary" disabled>
							<?php esc_html_e( 'Save Translations', 'caldera-forms-translation' ); ?>
						</button>
					</div>
				</div>
	            <?php } else{
	                printf( '<div class="notice notice-error"><p>%s</p>', esc_html__( 'Please try the form chooser again', 'caldera-forms-translation') );
	            }
	        }
		?>
	</div>
</div>

<?php do_action( 'cf_translate_templates' ); ?>
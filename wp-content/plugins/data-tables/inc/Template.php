<?php 

namespace DTBL;

class Template{
    protected static $uniqid;

    public static function html($data){
        self::$uniqid = self::createId();
        ob_start();
        extract($data);
        ?>
        <div id="<?php echo esc_attr(self::$uniqid) ?>" class="dtbl-wrapper"> 
        <style><?php echo esc_html($style) ?></style>
          <table id="<?php echo esc_attr($uniqueId) ?>" class="dtbl-table" data-options='<?php echo esc_attr(wp_json_encode( $options )) ?>'>
              <thead>
                <tr>
                    <?php
                        if($options['enableSL']){
                            echo "<th width='20px'>".$options['SLHeading'] ?? 'SL.'."</th>";
                        }
                    ?>
                    <?php foreach($data['head'] as $index => $th){ ?>
                        <?php if( $options['attachmentColumn'] && $index + 1 === count($data['head'])){
                            echo "<th width='20px'>Attachment</th>";
                        }else { ?>
                            <th>
                                <?php echo wp_kses_post($th); ?>
                            </th>
                        <?php }  ?>
                    <?php } ?>
                </tr>
              </thead>
              <tbody>
                <?php foreach($data['body'] as $trIndex => $tr){ ?>
                    <tr>
                        <?php
                         if($options['enableSL']){
                            $trIndex = (int) $trIndex + 1;
                            echo "<td>".  $trIndex ."</td>";
                        }
                        ?>
                        <?php foreach($tr as $index => $td){ ?>
                            <?php if( $options['attachmentColumn'] && $index + 1 === count($tr)){
                                   if($td){
                                        echo "<td><a target='_blank' href='".$td."'><img src='".$options['attachmentIcon']."' /></a></td>";
                                   }else {
                                        echo "<td></td>";
                                   }
                                }else { ?>
                                    <td>
                                        <?php echo wp_kses_post($td); ?>&#xFEFF;
                                    </td>
                            <?php }  ?>
                        <?php } ?>
                    </tr>
                <?php } ?>
              </tbody>
          </table>
        </div>
        <?php
        return ob_get_clean();
    }


    /**
     * create a unique id
     */
    public static function createId(){
        return "dtbl".uniqid();
    }

    /**
     * generate style 
     */
    public static function style($data){
        $id = "#".self::$uniqid;   
        ob_start();
        ?>
        <style>
        <?php
            self::renderStyle("$id", 'border-radius', self::i($template, 'round'));
        ?>
        </style>
        <?php
        return ob_get_clean();
    }

    /**
     * enqueue essential file
     */
    public static function enqueueFile($infos){
        wp_enqueue_script('dtbl');
        wp_enqueue_style('dtbl');
    }


    /**
     * return value if it isset
     */
    public static function i($array = [], $index = ''){
        if(isset($array[$index])){
            return $array[$index];
        }
        return false;
    }

    /**
     * render style
     */
    public static function renderStyle($selector, $property, $value){
        if($value){
            echo esc_html("$selector { $property:$value }");
        }
        return false;
    }

}
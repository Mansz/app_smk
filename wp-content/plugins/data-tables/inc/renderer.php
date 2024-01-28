<?php
namespace DTBL;

use DTBL\Block;
use DTBL\Template;

class Renderer{

    public static function html($id){
        $blocks =  Block::getBlock($id);
        $output = '';
        if(is_array($blocks)){
            foreach($blocks as $block){
                if(isset($block['attrs'])){
                    $output .= render_block($block);
                }else {
                    $data = self::getData($block);
                    $output .= Template::html($data);
                }
            }
        }

        return $output;
    }

    public static function getData($block){
        $data = [
            'options' => self::i($block, 'options', '', []),
            'data' => self::i($block, 'data', '', []),
            'style' => self::i($block, 'style', '', ''),
            'uniqueId' => self::i($block, 'uniqueId', '', '')
        ];

        return $data;
    }

    public static function i($array, $key1, $key2 = '', $default = false){
        if(isset($array[$key1][$key2])){
            return $array[$key1][$key2];
        }else if (isset($array[$key1])){
            return $array[$key1];
        }
        return $default;
    }

}

<?php
namespace DTBL;

class Block{

    public static function get($id){
        $content_post = get_post($id);
        $content = $content_post->post_content;
        return $content;
    }

    public static function getBlock($id){
        $blocks = parse_blocks(self::get($id));
        $out = [];

        if(!isset($blocks[0])){
            return false;
        }
        foreach ($blocks as $block) {
            if($block['blockName'] === 'dtbl/data-table'){
                $out[] = $block['attrs'];
            }else {
                $out[] = $block;
            }
        }

        return $out;
    }
}
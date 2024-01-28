<?php

/**
 * E2pdf Get Helper
 * 
 * @copyright  Copyright 2017 https://e2pdf.com
 * @license    GPLv3
 * @version    1
 * @link       https://e2pdf.com
 * @since      0.00.01
 */
if (!defined('ABSPATH')) {
    die('Access denied.');
}

class Helper_E2pdf_Db {

    /**
     * Prepare WHERE for sql requests
     * 
     * @param string $condition - Array of conditions
     * 
     * @return array - Filtered WHERE request
     */
    public function prepare_where($condition = array()) {

        $sql = array();
        $filter = array();
        $sql[] = " WHERE '1' = '1'";
        $condition = apply_filters('e2pdf_helper_db_prepare_where_condition', $condition);

        if (!empty($condition)) {
            foreach ($condition as $key => $value) {

                $sql_keys = explode('.', $key);
                foreach ($sql_keys as $sql_sub_key => $sql_key) {
                    $sql_keys[$sql_sub_key] = '`' . $sql_key . '`';
                }

                if (is_array($value['value'])) {
                    foreach ($value['value'] as $sub_value) {
                        $sql[] = " " . implode('.', $sql_keys) . " {$value['condition']} '{$value['type']}'";
                        $filter[] = $sub_value;
                    }
                } else {
                    $sql[] = " " . implode('.', $sql_keys) . " {$value['condition']} '{$value['type']}'";
                    $filter[] = $value['value'];
                }
            }
        }

        $where = array(
            'sql' => implode(' AND', $sql),
            'filter' => $filter
        );

        return apply_filters('e2pdf_helper_db_prepare_where', $where, $condition);
    }

    /**
     * Prepare ORDER_BY for sql requests
     * 
     * @param string $condition - Array of conditions
     * 
     * @return array - Filtered ORDER_BY request
     */
    public function prepare_orderby($condition = array()) {

        $orderby = '';
        $condition = apply_filters('e2pdf_helper_db_prepare_orderby_condition', $condition);

        if (isset($condition['orderby']) && isset($condition['order'])) {
            $orderby .= " ORDER BY {$condition['orderby']} {$condition['order']}";
        }

        return apply_filters('e2pdf_helper_db_prepare_orderby', $orderby, $condition);
    }

    public function prepare_limit($condition = array()) {

        $limit = '';
        $condition = apply_filters('e2pdf_helper_db_prepare_limit_condition', $condition);

        if (isset($condition['limit']) && isset($condition['offset'])) {
            $limit .= " LIMIT {$condition['offset']}, {$condition['limit']}";
        }

        return apply_filters('e2pdf_helper_db_prepare_limit', $limit, $condition);
    }

}

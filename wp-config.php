<?php
define( 'WP_CACHE', true );
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the installation.
 * You don't have to use the web site, you can copy this file to "wp-config.php"
 * and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * Database settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://wordpress.org/documentation/article/editing-wp-config-php/
 *
 * @package WordPress
 */

// ** Database settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'n1601386_wp29' );

/** Database username */
define( 'DB_USER', 'n1601386_wp29' );

/** Database password */
define( 'DB_PASSWORD', '2S39-2p89-' );

/** Database hostname */
define( 'DB_HOST', 'localhost' );

/** Database charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8mb4' );

/** The database collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication unique keys and salts.
 *
 * Change these to different unique phrases! You can generate these using
 * the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}.
 *
 * You can change these at any point in time to invalidate all existing cookies.
 * This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',         'e9pikfhql3xyddeb698qdysdtkbhr0o3vb7bhmc45e7uhxxrzseoyccsonftb92r' );
define( 'SECURE_AUTH_KEY',  '6dmg6nyx3yvh4jg6fy61ymszhyr4phy0amc9llc8fpxowpiu3h9cd4qiaaf6p4jh' );
define( 'LOGGED_IN_KEY',    'shegx1l2ixvnoz6ucs0k4gat4avnaprfbtskwkj9axjapkboh3rpwcl8zzpwer0v' );
define( 'NONCE_KEY',        'kwqqkp1xguke6baw2bq0clgv5rvqgd9safpd2vpdunbs2xse9n2qzvjqiqlf5lbj' );
define( 'AUTH_SALT',        'flybkzm6c5wyw1ftir3gsw6nvvrazyraiiuk9ildw83h3t7ldxgldaf8vjeipcnk' );
define( 'SECURE_AUTH_SALT', 'vtirwopvcdxpnlqrfrxe5e6bzwbdwiwoyrr4cbo6ihb3uahczp87fgyr3naycsoo' );
define( 'LOGGED_IN_SALT',   '2o0xxceaxbfguqlkyz7jwyltetts8db41bimijjtzh8ifbysulssjkirsq8kryww' );
define( 'NONCE_SALT',       'xsevvhz6gmh4a1ghvnicezzxiohlmivuez2imduxu5b3sgiqqeint3qnvvpg8pta' );

/**#@-*/

/**
 * WordPress database table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wpka_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://wordpress.org/documentation/article/debugging-in-wordpress/
 */
define( 'WP_DEBUG', false );

/* Add any custom values between this line and the "stop editing" line. */



/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';

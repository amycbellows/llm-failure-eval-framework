<?php
/**
 * Plugin Name: LLM Behavior Gallery
 * Plugin URI:  https://github.com/amycbellows/llm-failure-eval-framework
 * Description: Interactive gallery of LLM behavioral exhibits with tag cloud navigation.
 * Version:     1.0.0
 * Author:      LLM Failure Eval Framework
 * Text Domain: llm-gallery
 * Requires at least: 6.0
 * Requires PHP: 7.4
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

define( 'LLM_GALLERY_VERSION', '1.0.0' );
define( 'LLM_GALLERY_PLUGIN_DIR', plugin_dir_path( __FILE__ ) );
define( 'LLM_GALLERY_PLUGIN_URL', plugin_dir_url( __FILE__ ) );

require_once LLM_GALLERY_PLUGIN_DIR . 'includes/cpt-register.php';
require_once LLM_GALLERY_PLUGIN_DIR . 'includes/tag-cloud.php';
require_once LLM_GALLERY_PLUGIN_DIR . 'includes/gallery-shortcodes.php';

/**
 * Enqueue plugin styles and scripts.
 */
function llm_gallery_enqueue_assets() {
    wp_enqueue_style(
        'llm-gallery',
        LLM_GALLERY_PLUGIN_URL . 'assets/css/llm-gallery.css',
        array(),
        LLM_GALLERY_VERSION
    );
    wp_enqueue_script(
        'llm-gallery',
        LLM_GALLERY_PLUGIN_URL . 'assets/js/llm-gallery.js',
        array(),
        LLM_GALLERY_VERSION,
        true
    );
}
add_action( 'wp_enqueue_scripts', 'llm_gallery_enqueue_assets' );

/**
 * Load plugin template files from the plugin's templates directory when a
 * theme does not provide its own override.
 *
 * @param string $template The resolved template file path.
 * @return string
 */
function llm_gallery_template_loader( $template ) {
    if ( is_singular( 'llm_exhibit' ) ) {
        $plugin_template = LLM_GALLERY_PLUGIN_DIR . 'includes/templates/single-exhibit.php';
        if ( file_exists( $plugin_template ) ) {
            return $plugin_template;
        }
    }

    if ( is_post_type_archive( 'llm_exhibit' ) ) {
        $plugin_template = LLM_GALLERY_PLUGIN_DIR . 'includes/templates/archive-exhibit.php';
        if ( file_exists( $plugin_template ) ) {
            return $plugin_template;
        }
    }

    return $template;
}
add_filter( 'template_include', 'llm_gallery_template_loader' );

/**
 * Register the tag cloud sidebar widget.
 */
function llm_gallery_register_widgets() {
    register_widget( 'LLM_Tag_Cloud_Widget' );
}
add_action( 'widgets_init', 'llm_gallery_register_widgets' );

/**
 * Simple tag cloud sidebar widget.
 */
class LLM_Tag_Cloud_Widget extends WP_Widget {

    public function __construct() {
        parent::__construct(
            'llm_tag_cloud_widget',
            __( 'LLM Exhibit Tag Cloud', 'llm-gallery' ),
            array( 'description' => __( 'Displays a tag cloud for LLM exhibits.', 'llm-gallery' ) )
        );
    }

    public function widget( $args, $instance ) {
        $title = ! empty( $instance['title'] ) ? $instance['title'] : __( 'Exhibit Tags', 'llm-gallery' );
        echo wp_kses_post( $args['before_widget'] );
        echo wp_kses_post( $args['before_title'] ) . esc_html( $title ) . wp_kses_post( $args['after_title'] );
        echo do_shortcode( '[llm_tag_cloud]' );
        echo wp_kses_post( $args['after_widget'] );
    }

    public function form( $instance ) {
        $title = ! empty( $instance['title'] ) ? $instance['title'] : __( 'Exhibit Tags', 'llm-gallery' );
        ?>
        <p>
            <label for="<?php echo esc_attr( $this->get_field_id( 'title' ) ); ?>">
                <?php esc_html_e( 'Title:', 'llm-gallery' ); ?>
            </label>
            <input
                class="widefat"
                id="<?php echo esc_attr( $this->get_field_id( 'title' ) ); ?>"
                name="<?php echo esc_attr( $this->get_field_name( 'title' ) ); ?>"
                type="text"
                value="<?php echo esc_attr( $title ); ?>"
            />
        </p>
        <?php
    }

    public function update( $new_instance, $old_instance ) {
        $instance          = array();
        $instance['title'] = sanitize_text_field( $new_instance['title'] );
        return $instance;
    }
}

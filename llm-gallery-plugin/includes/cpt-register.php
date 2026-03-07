<?php
/**
 * Register the llm_exhibit custom post type, its tag taxonomy, and meta boxes.
 *
 * @package LLM_Gallery
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

/**
 * Register the llm_exhibit CPT.
 */
function llm_gallery_register_cpt() {
    $labels = array(
        'name'                  => _x( 'LLM Exhibits', 'post type general name', 'llm-gallery' ),
        'singular_name'         => _x( 'LLM Exhibit', 'post type singular name', 'llm-gallery' ),
        'menu_name'             => _x( 'LLM Exhibits', 'admin menu', 'llm-gallery' ),
        'name_admin_bar'        => _x( 'LLM Exhibit', 'add new on admin bar', 'llm-gallery' ),
        'add_new'               => _x( 'Add New', 'exhibit', 'llm-gallery' ),
        'add_new_item'          => __( 'Add New Exhibit', 'llm-gallery' ),
        'new_item'              => __( 'New Exhibit', 'llm-gallery' ),
        'edit_item'             => __( 'Edit Exhibit', 'llm-gallery' ),
        'view_item'             => __( 'View Exhibit', 'llm-gallery' ),
        'all_items'             => __( 'All Exhibits', 'llm-gallery' ),
        'search_items'          => __( 'Search Exhibits', 'llm-gallery' ),
        'not_found'             => __( 'No exhibits found.', 'llm-gallery' ),
        'not_found_in_trash'    => __( 'No exhibits found in Trash.', 'llm-gallery' ),
    );

    $args = array(
        'labels'             => $labels,
        'public'             => true,
        'publicly_queryable' => true,
        'show_ui'            => true,
        'show_in_menu'       => true,
        'query_var'          => true,
        'rewrite'            => array( 'slug' => 'exhibits' ),
        'capability_type'    => 'post',
        'has_archive'        => true,
        'hierarchical'       => false,
        'menu_position'      => 5,
        'menu_icon'          => 'dashicons-analytics',
        'supports'           => array( 'title', 'editor', 'thumbnail', 'excerpt' ),
        'show_in_rest'       => true,
    );

    register_post_type( 'llm_exhibit', $args );
}
add_action( 'init', 'llm_gallery_register_cpt' );

/**
 * Register the exhibit_tag taxonomy for llm_exhibit.
 */
function llm_gallery_register_taxonomy() {
    $labels = array(
        'name'              => _x( 'Exhibit Tags', 'taxonomy general name', 'llm-gallery' ),
        'singular_name'     => _x( 'Exhibit Tag', 'taxonomy singular name', 'llm-gallery' ),
        'search_items'      => __( 'Search Exhibit Tags', 'llm-gallery' ),
        'all_items'         => __( 'All Exhibit Tags', 'llm-gallery' ),
        'edit_item'         => __( 'Edit Exhibit Tag', 'llm-gallery' ),
        'update_item'       => __( 'Update Exhibit Tag', 'llm-gallery' ),
        'add_new_item'      => __( 'Add New Exhibit Tag', 'llm-gallery' ),
        'new_item_name'     => __( 'New Exhibit Tag Name', 'llm-gallery' ),
        'menu_name'         => __( 'Exhibit Tags', 'llm-gallery' ),
    );

    $args = array(
        'hierarchical'      => false,
        'labels'            => $labels,
        'show_ui'           => true,
        'show_admin_column' => true,
        'query_var'         => true,
        'rewrite'           => array( 'slug' => 'exhibit-tag' ),
        'show_in_rest'      => true,
    );

    register_taxonomy( 'exhibit_tag', array( 'llm_exhibit' ), $args );
}
add_action( 'init', 'llm_gallery_register_taxonomy' );

/**
 * Add meta boxes for exhibit-specific fields.
 */
function llm_gallery_add_meta_boxes() {
    add_meta_box(
        'llm_exhibit_details',
        __( 'Exhibit Details', 'llm-gallery' ),
        'llm_gallery_render_meta_box',
        'llm_exhibit',
        'normal',
        'high'
    );
}
add_action( 'add_meta_boxes', 'llm_gallery_add_meta_boxes' );

/**
 * Render the exhibit details meta box.
 *
 * @param WP_Post $post The current post object.
 */
function llm_gallery_render_meta_box( $post ) {
    wp_nonce_field( 'llm_gallery_save_meta', 'llm_gallery_nonce' );

    $exhibit_id     = get_post_meta( $post->ID, '_llm_exhibit_id', true );
    $transcript_url = get_post_meta( $post->ID, '_llm_transcript_url', true );
    $failure_modes  = get_post_meta( $post->ID, '_llm_failure_modes', true );
    ?>
    <table class="form-table">
        <tr>
            <th scope="row">
                <label for="llm_exhibit_id"><?php esc_html_e( 'Exhibit ID', 'llm-gallery' ); ?></label>
            </th>
            <td>
                <input
                    type="text"
                    id="llm_exhibit_id"
                    name="llm_exhibit_id"
                    value="<?php echo esc_attr( $exhibit_id ); ?>"
                    class="regular-text"
                    placeholder="e.g. E009"
                />
            </td>
        </tr>
        <tr>
            <th scope="row">
                <label for="llm_transcript_url"><?php esc_html_e( 'Transcript URL', 'llm-gallery' ); ?></label>
            </th>
            <td>
                <input
                    type="url"
                    id="llm_transcript_url"
                    name="llm_transcript_url"
                    value="<?php echo esc_url( $transcript_url ); ?>"
                    class="large-text"
                />
                <p class="description"><?php esc_html_e( 'Link to the raw transcript file.', 'llm-gallery' ); ?></p>
            </td>
        </tr>
        <tr>
            <th scope="row">
                <label for="llm_failure_modes"><?php esc_html_e( 'Failure Modes', 'llm-gallery' ); ?></label>
            </th>
            <td>
                <textarea
                    id="llm_failure_modes"
                    name="llm_failure_modes"
                    rows="4"
                    class="large-text"
                ><?php echo esc_textarea( $failure_modes ); ?></textarea>
                <p class="description"><?php esc_html_e( 'Comma-separated list of failure modes observed in this exhibit.', 'llm-gallery' ); ?></p>
            </td>
        </tr>
    </table>
    <?php
}

/**
 * Save exhibit meta box data.
 *
 * @param int $post_id The current post ID.
 */
function llm_gallery_save_meta( $post_id ) {
    if ( ! isset( $_POST['llm_gallery_nonce'] ) ) {
        return;
    }
    if ( ! wp_verify_nonce( sanitize_key( $_POST['llm_gallery_nonce'] ), 'llm_gallery_save_meta' ) ) {
        return;
    }
    if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) {
        return;
    }
    if ( ! current_user_can( 'edit_post', $post_id ) ) {
        return;
    }

    if ( isset( $_POST['llm_exhibit_id'] ) ) {
        update_post_meta( $post_id, '_llm_exhibit_id', sanitize_text_field( wp_unslash( $_POST['llm_exhibit_id'] ) ) );
    }
    if ( isset( $_POST['llm_transcript_url'] ) ) {
        update_post_meta( $post_id, '_llm_transcript_url', esc_url_raw( wp_unslash( $_POST['llm_transcript_url'] ) ) );
    }
    if ( isset( $_POST['llm_failure_modes'] ) ) {
        update_post_meta( $post_id, '_llm_failure_modes', sanitize_textarea_field( wp_unslash( $_POST['llm_failure_modes'] ) ) );
    }
}
add_action( 'save_post_llm_exhibit', 'llm_gallery_save_meta' );

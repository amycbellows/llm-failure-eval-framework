<?php
/**
 * Tag cloud generation for LLM exhibits.
 *
 * Computes tag frequencies from the exhibit_tag taxonomy and returns
 * a weighted, clickable tag cloud.
 *
 * @package LLM_Gallery
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

/**
 * Retrieve tag term data for all exhibit_tag terms, sorted by count descending.
 *
 * @return WP_Term[]|WP_Error Array of WP_Term objects or WP_Error on failure.
 */
function llm_gallery_get_tag_terms() {
    return get_terms( array(
        'taxonomy'   => 'exhibit_tag',
        'orderby'    => 'count',
        'order'      => 'DESC',
        'hide_empty' => true,
    ) );
}

/**
 * Build a weighted tag cloud HTML string.
 *
 * Each tag link filters the exhibit archive to posts tagged with that term.
 * Font sizes range from 12px (min) to 26px (max) proportional to frequency.
 *
 * @param int $max_tags Maximum number of tags to display. 0 = no limit.
 * @return string HTML markup for the tag cloud.
 */
function llm_gallery_build_tag_cloud( $max_tags = 0 ) {
    $terms = llm_gallery_get_tag_terms();

    if ( is_wp_error( $terms ) || empty( $terms ) ) {
        return '<p class="llm-no-tags">' . esc_html__( 'No tags found.', 'llm-gallery' ) . '</p>';
    }

    if ( $max_tags > 0 ) {
        $terms = array_slice( $terms, 0, (int) $max_tags );
    }

    $counts = wp_list_pluck( $terms, 'count' );
    $min    = (int) min( $counts );
    $max    = (int) max( $counts );
    $range  = $max - $min;

    $font_min = 12;
    $font_max = 26;

    $output = '<div class="llm-tag-cloud">';
    foreach ( $terms as $term ) {
        $size = $font_min;
        if ( $range > 0 ) {
            $size = (int) round( $font_min + ( ( $term->count - $min ) / $range ) * ( $font_max - $font_min ) );
        }

        $url    = get_term_link( $term );
        $title  = sprintf(
            /* translators: %d: number of exhibits with this tag */
            _n( '1 exhibit', '%d exhibits', $term->count, 'llm-gallery' ),
            $term->count
        );

        $output .= sprintf(
            '<a href="%1$s" class="llm-tag" style="font-size:%2$dpx;" title="%3$s" data-tag-slug="%4$s">%5$s</a>',
            esc_url( $url ),
            $size,
            esc_attr( $title ),
            esc_attr( $term->slug ),
            esc_html( $term->name )
        );
    }
    $output .= '</div>';

    return $output;
}

/**
 * Auto-assign tags from the _llm_failure_modes meta field when a post is saved.
 *
 * This keeps the exhibit_tag taxonomy in sync with the comma-separated failure
 * modes stored in post meta, making tag generation automatic.
 *
 * @param int     $post_id Post ID.
 * @param WP_Post $post    Post object.
 */
function llm_gallery_sync_tags_from_meta( $post_id, $post ) {
    if ( $post->post_type !== 'llm_exhibit' ) {
        return;
    }
    if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) {
        return;
    }

    $failure_modes = get_post_meta( $post_id, '_llm_failure_modes', true );
    if ( empty( $failure_modes ) ) {
        return;
    }

    $tags = array_map( 'trim', explode( ',', $failure_modes ) );
    $tags = array_filter( $tags );

    if ( ! empty( $tags ) ) {
        wp_set_post_terms( $post_id, $tags, 'exhibit_tag', false );
    }
}
add_action( 'save_post', 'llm_gallery_sync_tags_from_meta', 20, 2 );

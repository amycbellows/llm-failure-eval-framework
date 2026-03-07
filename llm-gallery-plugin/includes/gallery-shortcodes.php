<?php
/**
 * Shortcodes for the LLM Behavior Gallery plugin.
 *
 * Available shortcodes:
 *   [llm_gallery]       – renders the exhibit gallery grid.
 *   [llm_tag_cloud]     – renders the weighted tag cloud.
 *
 * @package LLM_Gallery
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

/**
 * [llm_gallery] shortcode.
 *
 * Attributes:
 *   posts_per_page (int)  – number of exhibits to show (default: -1, all).
 *   tag            (string) – filter by exhibit_tag slug.
 *   columns        (int)  – number of grid columns (default: 3).
 *
 * @param array $atts Shortcode attributes.
 * @return string HTML output.
 */
function llm_gallery_shortcode( $atts ) {
    $atts = shortcode_atts(
        array(
            'posts_per_page' => 20,
            'tag'            => '',
            'columns'        => 3,
        ),
        $atts,
        'llm_gallery'
    );

    $query_args = array(
        'post_type'      => 'llm_exhibit',
        'post_status'    => 'publish',
        'posts_per_page' => (int) $atts['posts_per_page'],
        'orderby'        => 'title',
        'order'          => 'ASC',
    );

    if ( ! empty( $atts['tag'] ) ) {
        $query_args['tax_query'] = array(
            array(
                'taxonomy' => 'exhibit_tag',
                'field'    => 'slug',
                'terms'    => sanitize_text_field( $atts['tag'] ),
            ),
        );
    }

    $exhibits = new WP_Query( $query_args );

    ob_start();

    if ( $exhibits->have_posts() ) {
        $columns = max( 1, min( 6, (int) $atts['columns'] ) );
        echo '<div class="llm-gallery-grid llm-gallery-cols-' . esc_attr( $columns ) . '">';
        while ( $exhibits->have_posts() ) {
            $exhibits->the_post();
            $exhibit_id = get_post_meta( get_the_ID(), '_llm_exhibit_id', true );
            $terms      = get_the_terms( get_the_ID(), 'exhibit_tag' );
            ?>
            <article class="llm-exhibit-card">
                <?php if ( has_post_thumbnail() ) : ?>
                    <div class="llm-exhibit-thumbnail">
                        <a href="<?php the_permalink(); ?>">
                            <?php the_post_thumbnail( 'medium' ); ?>
                        </a>
                    </div>
                <?php endif; ?>
                <div class="llm-exhibit-card-body">
                    <?php if ( $exhibit_id ) : ?>
                        <span class="llm-exhibit-id"><?php echo esc_html( $exhibit_id ); ?></span>
                    <?php endif; ?>
                    <h3 class="llm-exhibit-title">
                        <a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
                    </h3>
                    <div class="llm-exhibit-excerpt">
                        <?php the_excerpt(); ?>
                    </div>
                    <?php if ( ! empty( $terms ) && ! is_wp_error( $terms ) ) : ?>
                        <div class="llm-exhibit-tags">
                            <?php foreach ( $terms as $term ) : ?>
                                <a
                                    href="<?php echo esc_url( get_term_link( $term ) ); ?>"
                                    class="llm-tag-pill"
                                    data-tag-slug="<?php echo esc_attr( $term->slug ); ?>"
                                ><?php echo esc_html( $term->name ); ?></a>
                            <?php endforeach; ?>
                        </div>
                    <?php endif; ?>
                    <a href="<?php the_permalink(); ?>" class="llm-read-more">
                        <?php esc_html_e( 'View Exhibit &rarr;', 'llm-gallery' ); ?>
                    </a>
                </div>
            </article>
            <?php
        }
        echo '</div>';
    } else {
        echo '<p class="llm-no-exhibits">' . esc_html__( 'No exhibits found.', 'llm-gallery' ) . '</p>';
    }

    wp_reset_postdata();

    return ob_get_clean();
}
add_shortcode( 'llm_gallery', 'llm_gallery_shortcode' );

/**
 * [llm_tag_cloud] shortcode.
 *
 * Attributes:
 *   max_tags (int) – maximum tags to show (default: 0, all).
 *
 * @param array $atts Shortcode attributes.
 * @return string HTML output.
 */
function llm_tag_cloud_shortcode( $atts ) {
    $atts = shortcode_atts(
        array(
            'max_tags' => 0,
        ),
        $atts,
        'llm_tag_cloud'
    );

    return llm_gallery_build_tag_cloud( (int) $atts['max_tags'] );
}
add_shortcode( 'llm_tag_cloud', 'llm_tag_cloud_shortcode' );

<?php
/**
 * Archive template for the llm_exhibit custom post type.
 *
 * Displays a responsive grid of exhibit cards with sidebar tag cloud.
 *
 * @package LLM_Gallery
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

get_header();
?>
<div class="llm-gallery-wrap">
    <header class="llm-archive-header">
        <h1 class="llm-archive-title">
            <?php esc_html_e( 'LLM Behavior Exhibit Gallery', 'llm-gallery' ); ?>
        </h1>
        <p class="llm-archive-description">
            <?php esc_html_e( 'A curated collection of documented LLM behavioral failure modes with transcripts, analysis, and classification.', 'llm-gallery' ); ?>
        </p>

        <?php
        // Active tag filter notice.
        $current_tag = get_queried_object();
        if ( $current_tag instanceof WP_Term && $current_tag->taxonomy === 'exhibit_tag' ) :
            $archive_url = get_post_type_archive_link( 'llm_exhibit' );
            ?>
            <div class="llm-active-filter">
                <span class="llm-filter-label">
                    <?php
                    echo wp_kses(
                        sprintf(
                            /* translators: %s: tag name wrapped in <strong> */
                            __( 'Filtering by tag: %s', 'llm-gallery' ),
                            '<strong>' . esc_html( $current_tag->name ) . '</strong>'
                        ),
                        array( 'strong' => array() )
                    );
                    ?>
                </span>
                <a href="<?php echo esc_url( $archive_url ); ?>" class="llm-clear-filter">
                    <?php esc_html_e( 'Clear filter', 'llm-gallery' ); ?>
                </a>
            </div>
        <?php endif; ?>
    </header>

    <div class="llm-gallery-layout">
        <main class="llm-gallery-main" id="main-content">
            <?php if ( have_posts() ) : ?>
                <div class="llm-gallery-grid llm-gallery-cols-3" id="llm-exhibit-grid">
                    <?php
                    while ( have_posts() ) :
                        the_post();
                        $exhibit_id = get_post_meta( get_the_ID(), '_llm_exhibit_id', true );
                        $terms      = get_the_terms( get_the_ID(), 'exhibit_tag' );
                    ?>
                        <article class="llm-exhibit-card" id="exhibit-<?php the_ID(); ?>">
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

                                <h2 class="llm-exhibit-title">
                                    <a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
                                </h2>

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
                    <?php endwhile; ?>
                </div>

                <div class="llm-pagination">
                    <?php
                    the_posts_pagination( array(
                        'mid_size'  => 2,
                        'prev_text' => __( '&laquo; Previous', 'llm-gallery' ),
                        'next_text' => __( 'Next &raquo;', 'llm-gallery' ),
                    ) );
                    ?>
                </div>

            <?php else : ?>
                <p class="llm-no-exhibits">
                    <?php esc_html_e( 'No exhibits found.', 'llm-gallery' ); ?>
                </p>
            <?php endif; ?>
        </main>

        <aside class="llm-gallery-sidebar">
            <div class="llm-sidebar-widget">
                <h2 class="llm-widget-title"><?php esc_html_e( 'Browse by Tag', 'llm-gallery' ); ?></h2>
                <?php echo llm_gallery_build_tag_cloud(); // phpcs:ignore WordPress.Security.EscapeOutput ?>
            </div>
        </aside>
    </div>
</div>
<?php
get_footer();

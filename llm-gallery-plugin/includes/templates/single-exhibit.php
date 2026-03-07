<?php
/**
 * Single exhibit detail template for the llm_exhibit custom post type.
 *
 * Displays full exhibit content including metadata, failure analysis,
 * tags, and transcript link.
 *
 * @package LLM_Gallery
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

get_header();

while ( have_posts() ) :
    the_post();

    $exhibit_id     = get_post_meta( get_the_ID(), '_llm_exhibit_id', true );
    $transcript_url = get_post_meta( get_the_ID(), '_llm_transcript_url', true );
    $failure_modes  = get_post_meta( get_the_ID(), '_llm_failure_modes', true );
    $terms          = get_the_terms( get_the_ID(), 'exhibit_tag' );
    $archive_url    = get_post_type_archive_link( 'llm_exhibit' );
?>
<div class="llm-single-wrap">
    <nav class="llm-breadcrumb" aria-label="<?php esc_attr_e( 'Breadcrumb', 'llm-gallery' ); ?>">
        <a href="<?php echo esc_url( home_url( '/' ) ); ?>"><?php esc_html_e( 'Home', 'llm-gallery' ); ?></a>
        <span class="llm-breadcrumb-sep" aria-hidden="true">&rsaquo;</span>
        <a href="<?php echo esc_url( $archive_url ); ?>"><?php esc_html_e( 'Exhibits', 'llm-gallery' ); ?></a>
        <span class="llm-breadcrumb-sep" aria-hidden="true">&rsaquo;</span>
        <span aria-current="page"><?php the_title(); ?></span>
    </nav>

    <article class="llm-single-exhibit" id="post-<?php the_ID(); ?>">
        <header class="llm-single-header">
            <?php if ( $exhibit_id ) : ?>
                <span class="llm-exhibit-id llm-exhibit-id--large"><?php echo esc_html( $exhibit_id ); ?></span>
            <?php endif; ?>

            <h1 class="llm-single-title"><?php the_title(); ?></h1>

            <?php if ( ! empty( $terms ) && ! is_wp_error( $terms ) ) : ?>
                <div class="llm-exhibit-tags llm-exhibit-tags--header">
                    <?php foreach ( $terms as $term ) : ?>
                        <a
                            href="<?php echo esc_url( get_term_link( $term ) ); ?>"
                            class="llm-tag-pill"
                            data-tag-slug="<?php echo esc_attr( $term->slug ); ?>"
                        ><?php echo esc_html( $term->name ); ?></a>
                    <?php endforeach; ?>
                </div>
            <?php endif; ?>
        </header>

        <?php if ( $transcript_url || $failure_modes ) : ?>
            <div class="llm-exhibit-meta-bar">
                <?php if ( $failure_modes ) : ?>
                    <div class="llm-meta-item">
                        <strong><?php esc_html_e( 'Failure Modes:', 'llm-gallery' ); ?></strong>
                        <span><?php echo esc_html( $failure_modes ); ?></span>
                    </div>
                <?php endif; ?>

                <?php if ( $transcript_url ) : ?>
                    <div class="llm-meta-item">
                        <a
                            href="<?php echo esc_url( $transcript_url ); ?>"
                            class="llm-btn llm-btn--transcript"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <?php esc_html_e( 'View Transcript &rarr;', 'llm-gallery' ); ?>
                        </a>
                    </div>
                <?php endif; ?>
            </div>
        <?php endif; ?>

        <div class="llm-single-content entry-content">
            <?php the_content(); ?>
        </div>

        <footer class="llm-single-footer">
            <?php if ( ! empty( $terms ) && ! is_wp_error( $terms ) ) : ?>
                <div class="llm-exhibit-tags">
                    <strong><?php esc_html_e( 'Tags:', 'llm-gallery' ); ?></strong>
                    <?php foreach ( $terms as $term ) : ?>
                        <a
                            href="<?php echo esc_url( get_term_link( $term ) ); ?>"
                            class="llm-tag-pill"
                            data-tag-slug="<?php echo esc_attr( $term->slug ); ?>"
                        ><?php echo esc_html( $term->name ); ?></a>
                    <?php endforeach; ?>
                </div>
            <?php endif; ?>

            <div class="llm-single-nav">
                <?php
                $prev = get_previous_post( false, '', 'exhibit_tag' );
                $next = get_next_post( false, '', 'exhibit_tag' );
                if ( $prev ) :
                    $prev_id = get_post_meta( $prev->ID, '_llm_exhibit_id', true );
                ?>
                    <a href="<?php echo esc_url( get_permalink( $prev ) ); ?>" class="llm-nav-prev">
                        &larr;
                        <?php echo $prev_id ? esc_html( $prev_id ) . ': ' : ''; ?>
                        <?php echo esc_html( get_the_title( $prev ) ); ?>
                    </a>
                <?php endif; ?>

                <?php if ( $next ) :
                    $next_id = get_post_meta( $next->ID, '_llm_exhibit_id', true );
                ?>
                    <a href="<?php echo esc_url( get_permalink( $next ) ); ?>" class="llm-nav-next">
                        <?php echo $next_id ? esc_html( $next_id ) . ': ' : ''; ?>
                        <?php echo esc_html( get_the_title( $next ) ); ?>
                        &rarr;
                    </a>
                <?php endif; ?>
            </div>

            <div class="llm-back-to-gallery">
                <a href="<?php echo esc_url( $archive_url ); ?>" class="llm-btn">
                    &larr; <?php esc_html_e( 'Back to Gallery', 'llm-gallery' ); ?>
                </a>
            </div>
        </footer>
    </article>

    <aside class="llm-single-sidebar">
        <div class="llm-sidebar-widget">
            <h2 class="llm-widget-title"><?php esc_html_e( 'Browse by Tag', 'llm-gallery' ); ?></h2>
            <?php echo llm_gallery_build_tag_cloud( 20 ); // phpcs:ignore WordPress.Security.EscapeOutput ?>
        </div>
    </aside>
</div>
<?php
endwhile;

get_footer();

/**
 * LLM Behavior Gallery – front-end interactivity.
 *
 * Features:
 *  1. Client-side tag filtering: clicking a tag pill or tag-cloud link
 *     highlights matching exhibit cards and dims non-matching ones.
 *  2. Active-tag highlight in tag cloud when visiting a term archive.
 */
( function () {
    'use strict';

    // ── Tag highlight on term archive ─────────────────────────────────────────

    /**
     * Reads the current page URL path and marks the matching tag cloud link active.
     * Matches when the term slug appears as a path segment
     * (e.g. /exhibit-tag/pronoun-misbinding/).
     */
    function markActiveTagFromURL() {
        var cloud = document.querySelector( '.llm-tag-cloud' );
        if ( ! cloud ) {
            return;
        }

        var links = cloud.querySelectorAll( '.llm-tag' );
        var currentPath = window.location.pathname;

        links.forEach( function ( link ) {
            var slug = link.getAttribute( 'data-tag-slug' );
            if ( slug && currentPath.indexOf( '/' + slug ) !== -1 ) {
                link.classList.add( 'active' );
            }
        } );
    }

    // ── Client-side filtering ─────────────────────────────────────────────────

    var activeSlug = null;

    /**
     * Filter the exhibit grid to show only cards with the given tag slug.
     * Pass null to clear the filter.
     *
     * @param {string|null} slug - Tag slug to filter by, or null to reset.
     */
    function filterByTag( slug ) {
        var cards = document.querySelectorAll( '.llm-exhibit-card' );
        if ( ! cards.length ) {
            return;
        }

        activeSlug = slug;

        cards.forEach( function ( card ) {
            var show = ! slug;
            if ( slug ) {
                var pills = card.querySelectorAll( '.llm-tag-pill[data-tag-slug]' );
                pills.forEach( function ( pill ) {
                    if ( pill.getAttribute( 'data-tag-slug' ) === slug ) {
                        show = true;
                    }
                } );
            }

            card.style.opacity = show ? '1' : '0.25';
            card.style.transform = show ? 'scale(1)' : 'scale(0.97)';
            if ( show ) {
                card.removeAttribute( 'aria-hidden' );
            } else {
                card.setAttribute( 'aria-hidden', 'true' );
            }
        } );

        // Update active state on tag pills and cloud links.
        document.querySelectorAll( '.llm-tag-pill, .llm-tag' ).forEach( function ( el ) {
            if ( el.getAttribute( 'data-tag-slug' ) === slug ) {
                el.classList.add( 'active' );
            } else {
                el.classList.remove( 'active' );
            }
        } );
    }

    /**
     * Intercept clicks on tag pills and cloud links to enable client-side
     * filtering instead of navigating to the term archive URL.
     * Only active when an exhibit grid is present on the page.
     *
     * @param {MouseEvent} event
     */
    function onTagClick( event ) {
        var grid = document.getElementById( 'llm-exhibit-grid' );
        if ( ! grid ) {
            // No grid on page — allow normal navigation.
            return;
        }

        var target = event.target.closest( '[data-tag-slug]' );
        if ( ! target ) {
            return;
        }

        event.preventDefault();

        var slug = target.getAttribute( 'data-tag-slug' );

        // Second click on the same tag clears the filter.
        filterByTag( activeSlug === slug ? null : slug );
    }

    // ── Initialise ────────────────────────────────────────────────────────────

    var initialized = false;

    function init() {
        if ( initialized ) {
            return;
        }
        initialized = true;

        markActiveTagFromURL();

        // Delegate tag clicks from the document.
        document.addEventListener( 'click', onTagClick );
    }

    if ( document.readyState === 'loading' ) {
        document.addEventListener( 'DOMContentLoaded', init );
    } else {
        init();
    }
} )();

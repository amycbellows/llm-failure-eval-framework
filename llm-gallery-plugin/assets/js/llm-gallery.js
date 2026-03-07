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

    // ── Helpers ───────────────────────────────────────────────────────────────

    /**
     * Returns the value of a query-string parameter.
     *
     * @param {string} name - Parameter name.
     * @returns {string|null}
     */
    function getQueryParam( name ) {
        var params = new URLSearchParams( window.location.search );
        return params.get( name );
    }

    // ── Tag highlight on term archive ─────────────────────────────────────────

    /**
     * Reads the current page URL and marks the matching tag cloud link active.
     * Works when the URL contains the term slug in its path (WordPress default)
     * or as a ?tag= query parameter.
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
            if ( ! slug ) {
                return;
            }
            // Match slug in URL path (e.g. /exhibit-tag/pronoun-misbinding/)
            if ( currentPath.indexOf( '/' + slug ) !== -1 ) {
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
            if ( ! slug ) {
                card.style.opacity = '1';
                card.style.transform = 'scale(1)';
                card.removeAttribute( 'aria-hidden' );
                return;
            }

            var pills = card.querySelectorAll( '.llm-tag-pill[data-tag-slug]' );
            var hasTag = false;
            pills.forEach( function ( pill ) {
                if ( pill.getAttribute( 'data-tag-slug' ) === slug ) {
                    hasTag = true;
                }
            } );

            if ( hasTag ) {
                card.style.opacity = '1';
                card.style.transform = 'scale(1)';
                card.removeAttribute( 'aria-hidden' );
            } else {
                card.style.opacity = '0.25';
                card.style.transform = 'scale(0.97)';
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

        if ( activeSlug === slug ) {
            // Second click on the same tag clears the filter.
            filterByTag( null );
        } else {
            filterByTag( slug );
        }
    }

    // ── Initialise ────────────────────────────────────────────────────────────

    function init() {
        markActiveTagFromURL();

        // Delegate tag clicks from the document.
        document.addEventListener( 'click', onTagClick );

        // Style transitions for smooth filtering.
        var style = document.createElement( 'style' );
        style.textContent = '.llm-exhibit-card { transition: opacity 0.25s ease, transform 0.25s ease; }';
        document.head.appendChild( style );
    }

    if ( document.readyState === 'loading' ) {
        document.addEventListener( 'DOMContentLoaded', init );
    } else {
        init();
    }
} )();

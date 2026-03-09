=== LLM Behavior Gallery ===
Contributors: amycbellows
Tags: llm, ai, gallery, exhibits, tag cloud
Requires at least: 6.0
Tested up to: 6.9.1
Requires PHP: 7.4
Stable tag: 1.0.0
License: GPLv2 or later
License URI: https://www.gnu.org/licenses/gpl-2.0.html

An interactive gallery of large language model (LLM) behavioral exhibits with
a dynamic tag cloud for navigation and discovery.

== Description ==

The LLM Behavior Gallery plugin presents a curated collection of documented
LLM failure modes as a browsable, filterable exhibit gallery.

**Features**

* **Exhibit Custom Post Type** – Stores each exhibit with a title, exhibit ID
  (e.g. E009), transcript URL, failure modes, and rich content.
* **Gallery Archive Page** – Responsive grid layout listing all published
  exhibits with title, excerpt, ID badge, and clickable tag pills.
* **Exhibit Detail View** – Full content display including failure analysis,
  meta-bar with transcript link, tag navigation, and prev/next exhibit links.
* **Dynamic Tag Cloud** – Weighted, clickable tag cloud generated from the
  `exhibit_tag` taxonomy. Font size reflects tag frequency.
* **Client-side Tag Filtering** – On the gallery page, clicking a tag filters
  cards without a page reload.
* **Shortcodes** – Embed the gallery or tag cloud anywhere on your site.
* **Widget** – Tag cloud sidebar widget.
* **High-contrast dark theme** – Red accent (#cc0000) on dark background
  (#111111); WCAG AA compliant contrast; minimum 12 px font sizes.
* **Accessible** – ARIA labels, keyboard navigable, semantic HTML.

**Shortcodes**

`[llm_gallery]`
Renders the exhibit gallery grid.

Attributes:
- `posts_per_page` – number of exhibits to show (default: -1, all)
- `tag`            – filter by exhibit_tag slug
- `columns`        – number of grid columns (default: 3)

`[llm_tag_cloud]`
Renders the weighted tag cloud.

Attributes:
- `max_tags` – maximum number of tags to show (default: 0, all)

== Installation ==

1. Upload the `llm-gallery-plugin` folder to `/wp-content/plugins/`.
2. Activate the plugin through the **Plugins** menu in WordPress.
3. Go to **Settings > Permalinks** and click **Save Changes** to flush rewrite
   rules so the `/exhibits/` archive URL works correctly.
4. Add exhibits via the **LLM Exhibits** menu in the WordPress admin.
5. Use `[llm_gallery]` or `[llm_tag_cloud]` shortcodes on any page or post.

== Frequently Asked Questions ==

= How do tags get assigned to exhibits? =

Tags are managed via the **Exhibit Tags** taxonomy. When you save an exhibit
with a comma-separated list of failure modes in the **Failure Modes** meta
field, the plugin automatically creates and assigns those terms as tags.
You can also assign tags manually via the Tags meta box.

= Can I use my own theme templates? =

Yes. Place `single-llm_exhibit.php` and `archive-llm_exhibit.php` in your
active theme folder to override the plugin's bundled templates.

= Where is the exhibit archive? =

By default at `/exhibits/`. You can change the slug by modifying the
`rewrite` argument in `cpt-register.php`.

== Changelog ==

= 1.0.0 =
* Initial release.

== Upgrade Notice ==

= 1.0.0 =
Initial release.

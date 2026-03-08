# LLM Behavior Gallery Plugin Specification

## Overview
The **LLM Behavior Gallery** plugin is designed to present a gallery of large language model (LLM) behavior exhibits. Using the existing exhibits (seed data in the repository's `exhibits` folder), the plugin will provide an interactive gallery with:
- A visual index of exhibits
- Detailed pages for each exhibit (including transcripts, failure analyses, and metadata)
- A dynamic tag cloud generated from exhibit transcripts to aid in navigation and discovery

The plugin targets WordPress version **6.9.1**.

## Plugin Features
1. **Exhibit Custom Post Type (CPT)**
   - Register a custom post type (e.g., `llm_exhibit`) to store the exhibit seed data.
   - Fields include:
     - Title (exhibit name)
     - Exhibit ID (e.g., “E009”, “E010”)
     - Content (exhibit details, transcripts, and metadata)
     - Transcript URL – link to raw transcript data
     - Tags – derived from exhibit content

2. **Gallery and Archive Page**
   - A gallery page that lists all exhibit posts in a responsive, visually appealing grid.
   - Each exhibit card includes the title, short description, exhibit ID, and a link to the detailed page.
 
3. **Exhibit Detail View**
   - A single exhibit view displaying full details including:
     - Exhibit scope, purpose, metadata, and failure analysis.
     - A link to view/download the transcript.
     - Associated tags for navigation.

4. **Tag Cloud**
   - Dynamically generate a tag cloud using tags extracted from the transcripts.
   - Tags are clickable; clicking a tag filters exhibits to only those that match.

5. **Shortcodes and Widgets**
   - Provide shortcodes to embed the gallery or tag cloud anywhere on the site.
   - Include a widget for the tag cloud.

## Technical Requirements
- **WordPress Compatibility:** Tested on WordPress 6.9.1.
- **PHP Minimum:** 7.4 (or later as required by WordPress 6.9.1).
- **Database:** Use standard WordPress custom post type tables.

## Recommended Plugin Dependencies
To enhance functionality and maintain robust code, the following dependencies are recommended:
- **Advanced Custom Fields (ACF):** For managing custom fields within the exhibit CPT.  
  *Recommended Version:* Latest stable release.
- **Custom Post Type UI:** To easily manage registration of custom post types and taxonomies (optional alternative to manual registration).
- **Shortcake (Shortcode UI):** To provide an interface for shortcode insertion in the editor.
- **WP REST API (Built into WordPress 6.9.1):** For future enhancement if a headless or dynamic data view is required.
- **Elementor (Optional):** For users who wish to design custom layouts for the gallery and single exhibit pages.
- **Yoast SEO:** For ensuring each exhibit page is SEO friendly.
- **WP Super Cache or W3 Total Cache (Optional):** For caching, if the gallery exhibits grow large and performance is a concern.

## Plugin Architecture
1. **File Structure:**
   ```
   llm-gallery-plugin/
   ├── includes/
   │   ├── cpt-register.php         # Registers LLM Exhibit CPT and taxonomy.
   │   ├── gallery-shortcodes.php   # Shortcodes for gallery and tag cloud.
   │   ├── tag-cloud.php            # Functions to extract and compute tag frequencies.
   │   └── templates/
   │       ├── archive-exhibit.php  # Template for the gallery archive.
   │       └── single-exhibit.php   # Template for exhibit detail view.
   ├── assets/
   │   ├── css/
   │   │   └── llm-gallery.css      # High contrast dark theme styles.
   │   └── js/
   │       └── llm-gallery.js       # Optional JavaScript for enhanced interactivity.
   ├── llm-gallery-plugin.php       # Main plugin file.
   └── readme.txt                   # Plugin description and instructions.
   ```

2. **Core Components:**
   - **Main Plugin File (llm-gallery-plugin.php):**  
     Sets up plugin headers, initialization hooks, and includes other functional files.
   - **CPT Registration (includes/cpt-register.php):**  
     Registers the `llm_exhibit` custom post type, custom taxonomy for tags, and meta-boxes for additional fields (exhibit ID, transcript URL, etc.).
   - **Shortcodes (includes/gallery-shortcodes.php):**  
     Implements `[llm_gallery]` and `[llm_tag_cloud]` shortcodes.
   - **Tag Cloud (includes/tag-cloud.php):**  
     Parses transcript text (or uses stored tags) to generate a weighted tag cloud.

3. **Templates:**
   - Override archive and single exhibit displays by using custom templates, that adhere to WordPress template hierarchy.

4. **User Interface:**
   - The gallery and exhibit details will follow a high contrast dark theme with a primary red accent.
   - CSS enforces a minimum text size of 12px and uses accessible color contrast ratios.

5. **Internationalization:**
   - Ensure plugin strings are translatable (use `__()` and `_e()`).

## Future Enhancements
- Integration with the WP REST API for a decoupled front-end.
- Advanced filtering and search functionalities.
- Import tool to batch import seed data from the existing exhibits repository.
- Analytics integration to track exhibit views and interactions.

## Conclusion
This specification provides a roadmap to develop a fully-featured WordPress plugin that showcases LLM behavioral exhibits as an interactive gallery. It leverages seed data from the existing repository and includes a dynamic tag cloud to enhance navigation while ensuring adherence to accessibility guidelines and best practices for WordPress plugin development.

/* global WebImporter */

/**
 * Parser for tabs-showcase block
 *
 * Source: https://wknd-trendsetters.site
 * Base Block: tabs
 *
 * Block Structure:
 * - Row 1-N: One tab per row, 2 columns [tab label | tab content]
 *
 * Source HTML Pattern:
 * - .w-tabs container with .w-tab-menu and .w-tab-content
 * - Tab buttons with .w-tab-link
 * - Tab panels with .w-tab-pane containing heading + image
 *
 * Generated: 2026-01-06
 */
export default function parse(element, { document }) {
  const cells = [];

  // Find tab links and panels
  const tabLinks = element.querySelectorAll('.w-tab-link');
  const tabPanels = element.querySelectorAll('.w-tab-pane');

  if (tabLinks.length > 0 && tabPanels.length > 0) {
    for (let i = 0; i < tabLinks.length && i < tabPanels.length; i++) {
      const tabLink = tabLinks[i];
      const tabPanel = tabPanels[i];

      // Get tab label
      const labelText = tabLink.textContent.trim();

      // Get tab content - heading and image
      const heading = tabPanel.querySelector('h3, .h2-heading, .h3-heading');
      const img = tabPanel.querySelector('img');

      const contentCol = [];

      // Add heading
      if (heading) {
        const h2 = document.createElement('h2');
        h2.textContent = heading.textContent.trim();
        contentCol.push(h2);
      }

      // Add image
      if (img) {
        contentCol.push(img.cloneNode(true));
      }

      cells.push([labelText, contentCol]);
    }
  }

  const block = WebImporter.Blocks.createBlock(document, { name: 'Tabs-Showcase', cells });
  element.replaceWith(block);
}

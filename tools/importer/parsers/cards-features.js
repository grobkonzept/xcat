/* global WebImporter */

/**
 * Parser for cards-features block
 *
 * Source: https://wknd-trendsetters.site
 * Base Block: cards
 *
 * Block Structure:
 * - Row 1-N: One card per row, single column with text content
 *
 * Source HTML Pattern:
 * - Grid of .flex-horizontal items
 * - Each item has icon div + paragraph text
 *
 * Generated: 2026-01-06
 */
export default function parse(element, { document }) {
  const cells = [];

  // Find feature items - look for flex-horizontal items with icon and text
  const featureItems = element.querySelectorAll('.flex-horizontal.flex-gap-xxs');

  if (featureItems.length > 0) {
    featureItems.forEach(item => {
      // Get the paragraph text (main content)
      const paragraph = item.querySelector('p');
      if (paragraph) {
        cells.push([paragraph.cloneNode(true)]);
      }
    });
  } else {
    // Fallback - get direct children divs
    const items = element.querySelectorAll(':scope > div');
    items.forEach(item => {
      const text = item.querySelector('p');
      if (text) {
        cells.push([text.cloneNode(true)]);
      }
    });
  }

  const block = WebImporter.Blocks.createBlock(document, { name: 'Cards-Features', cells });
  element.replaceWith(block);
}

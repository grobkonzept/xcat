/* global WebImporter */

/**
 * Parser for columns-layout block
 *
 * Source: https://wknd-trendsetters.site
 * Base Block: columns
 *
 * Block Structure:
 * - Row 1-N: Content rows with 2 columns each
 *
 * Source HTML Patterns:
 * - Hero images: .grid-layout with .utility-aspect-1x1 > img
 * - Articles header: .grid-layout with text + button
 * - CTA section: .grid-layout with heading + buttons
 *
 * Generated: 2026-01-06
 */
export default function parse(element, { document }) {
  const cells = [];

  // Check for image-only columns (hero section)
  const aspectDivs = element.querySelectorAll('.utility-aspect-1x1');
  if (aspectDivs.length > 0) {
    // Image columns - each aspect div contains an image
    const row = [];
    aspectDivs.forEach(div => {
      const img = div.querySelector('img');
      if (img) {
        row.push(img.cloneNode(true));
      }
    });
    if (row.length > 0) {
      cells.push(row);
    }
  } else {
    // Content columns - get direct child divs
    const columns = element.querySelectorAll(':scope > div');
    if (columns.length > 0) {
      const row = [];
      columns.forEach(col => {
        // Clone the column content
        const content = [];

        // Get headings
        const heading = col.querySelector('h2, h3, .h2-heading, .h3-heading');
        if (heading) content.push(heading.cloneNode(true));

        // Get eyebrow/tag text
        const eyebrow = col.querySelector('.eyebrow');
        if (eyebrow) content.push(eyebrow.cloneNode(true));

        // Get paragraphs
        const paragraphs = col.querySelectorAll('p, .subheading');
        paragraphs.forEach(p => content.push(p.cloneNode(true)));

        // Get buttons/links
        const buttons = col.querySelectorAll('a.button, .button-group a');
        buttons.forEach(btn => content.push(btn.cloneNode(true)));

        row.push(content.length > 0 ? content : col.cloneNode(true));
      });
      cells.push(row);
    } else {
      // Fallback - use grid items
      const gridItems = element.querySelectorAll('.w-node-');
      if (gridItems.length > 0) {
        const row = [];
        gridItems.forEach(item => {
          row.push(item.cloneNode(true));
        });
        cells.push(row);
      }
    }
  }

  const block = WebImporter.Blocks.createBlock(document, { name: 'Columns-Layout', cells });
  element.replaceWith(block);
}

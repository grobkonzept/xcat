/* global WebImporter */

/**
 * Parser for columns-gallery block
 *
 * Source: https://wknd-trendsetters.site/fashion-insights
 * Base Block: columns
 *
 * Block Structure:
 * - Row 1-N: Multiple columns per row [image | image | image]
 *
 * Source HTML Pattern:
 * - .grid-layout.desktop-3-column container
 * - Multiple .utility-aspect-1x1 divs containing images
 *
 * Generated: 2026-01-06
 */
export default function parse(element, { document }) {
  const cells = [];

  // Find all image containers
  const imageContainers = element.querySelectorAll('.utility-aspect-1x1');
  const images = [];

  imageContainers.forEach((container) => {
    const img = container.querySelector('img');
    if (img) {
      images.push(img.cloneNode(true));
    }
  });

  // Group into rows of 3
  const columnsPerRow = 3;
  for (let i = 0; i < images.length; i += columnsPerRow) {
    const row = [];
    for (let j = 0; j < columnsPerRow && i + j < images.length; j++) {
      row.push(images[i + j]);
    }
    cells.push(row);
  }

  const block = WebImporter.Blocks.createBlock(document, { name: 'Columns-Gallery', cells });
  element.replaceWith(block);
}

/* global WebImporter */

/**
 * Parser for columns-cta block
 *
 * Source: https://wknd-trendsetters.site/fashion-insights
 * Base Block: columns
 *
 * Block Structure:
 * - Row 1: 2 columns [background image | content (heading, paragraph, button)]
 *
 * Source HTML Pattern:
 * - .grid-layout.desktop-1-column container
 * - Background image with .cover-image
 * - .card-body with heading, paragraph, and button
 *
 * Generated: 2026-01-06
 */
export default function parse(element, { document }) {
  const cells = [];

  // Find background image
  const bgImg = element.querySelector('img.cover-image');

  // Find content elements
  const heading = element.querySelector('.card-body h2, .card-body .h1-heading');
  const paragraph = element.querySelector('.card-body p, .card-body .subheading');
  const buttonLink = element.querySelector('.card-body a.button, .card-body .button-group a');

  // Build content column
  const contentCol = [];

  if (heading) {
    const h2 = document.createElement('h2');
    h2.textContent = heading.textContent.trim();
    contentCol.push(h2);
  }

  if (paragraph) {
    const p = document.createElement('p');
    p.textContent = paragraph.textContent.trim();
    contentCol.push(p);
  }

  if (buttonLink) {
    const link = document.createElement('a');
    link.href = buttonLink.href;
    link.textContent = buttonLink.textContent.trim();
    const strong = document.createElement('strong');
    strong.appendChild(link);
    contentCol.push(strong);
  }

  // Create row: [image | content]
  const imageCol = bgImg ? bgImg.cloneNode(true) : '';
  cells.push([imageCol, contentCol]);

  const block = WebImporter.Blocks.createBlock(document, { name: 'Columns-Cta', cells });
  element.replaceWith(block);
}

/* global WebImporter */

/**
 * Parser for hero-blog block
 *
 * Source: https://wknd-trendsetters.site/fashion-insights
 * Base Block: hero
 *
 * Block Structure:
 * - Row 1: 2 columns [background image | content (heading)]
 *
 * Source HTML Pattern:
 * - Header with inverse-section class
 * - .ix-parallax-scale-out-hero containing background image
 * - H1 heading centered
 *
 * Generated: 2026-01-06
 */
export default function parse(element, { document }) {
  const cells = [];

  // Find background image
  const bgContainer = element.querySelector('.ix-parallax-scale-out-hero');
  const bgImg = bgContainer?.querySelector('img');

  // Find heading
  const heading = element.querySelector('h1');

  // Build row: [image | content]
  const imageCol = bgImg ? bgImg.cloneNode(true) : '';
  const contentCol = [];

  if (heading) {
    const h1 = document.createElement('h1');
    h1.textContent = heading.textContent.trim();
    contentCol.push(h1);
  }

  cells.push([imageCol, contentCol]);

  const block = WebImporter.Blocks.createBlock(document, { name: 'Hero-Blog', cells });
  element.replaceWith(block);
}

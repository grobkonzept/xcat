/* global WebImporter */

/**
 * Parser for cards-articles block
 *
 * Source: https://wknd-trendsetters.site
 * Base Block: cards
 *
 * Block Structure:
 * - Row 1-N: One card per row, 2 columns [image | content]
 *
 * Source HTML Pattern:
 * - Grid of <a> elements linking to articles
 * - Each article has: image, tag, read time, heading, description, Read link
 *
 * Generated: 2026-01-06
 */
export default function parse(element, { document }) {
  const cells = [];

  // Find article card links
  const articleLinks = element.querySelectorAll('a.utility-link-content-block');

  if (articleLinks.length > 0) {
    articleLinks.forEach(link => {
      // Get the image
      const img = link.querySelector('img.cover-image');

      // Get content elements
      const tag = link.querySelector('.tag');
      const readTime = link.querySelector('.paragraph-sm');
      const heading = link.querySelector('h3, .h4-heading');
      const description = link.querySelector('p:not(.paragraph-sm)');

      // Build content array for second column
      const contentCol = [];

      // Add tag and read time
      if (tag || readTime) {
        const tagText = tag ? tag.textContent.trim() : '';
        const timeText = readTime ? readTime.textContent.trim() : '';
        const metaDiv = document.createElement('p');
        metaDiv.textContent = `${tagText} · ${timeText}`;
        contentCol.push(metaDiv);
      }

      // Add heading
      if (heading) {
        const h3 = document.createElement('h3');
        h3.textContent = heading.textContent.trim();
        contentCol.push(h3);
      }

      // Add description
      if (description) {
        const p = document.createElement('p');
        p.textContent = description.textContent.trim();
        contentCol.push(p);
      }

      // Add read link
      const readLink = document.createElement('a');
      readLink.href = link.href;
      readLink.textContent = 'Read';
      contentCol.push(readLink);

      // Create row with image and content
      const imageCol = img ? img.cloneNode(true) : '';
      cells.push([imageCol, contentCol]);
    });
  }

  const block = WebImporter.Blocks.createBlock(document, { name: 'Cards-Articles', cells });
  element.replaceWith(block);
}

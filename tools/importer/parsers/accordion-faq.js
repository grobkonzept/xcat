/* global WebImporter */

/**
 * Parser for accordion-faq block
 *
 * Source: https://wknd-trendsetters.site
 * Base Block: accordion
 *
 * Block Structure:
 * - Row 1-N: One FAQ item per row, 2 columns [question | answer]
 *
 * Source HTML Pattern:
 * - .accordion containers with .w-dropdown structure
 * - Question in .w-dropdown-toggle
 * - Answer in .accordion-content .rich-text
 *
 * Generated: 2026-01-06
 */
export default function parse(element, { document }) {
  const cells = [];

  // Find accordion items
  const accordionItems = element.querySelectorAll('.accordion.w-dropdown');

  if (accordionItems.length > 0) {
    accordionItems.forEach(item => {
      // Get question from toggle
      const toggleDiv = item.querySelector('.w-dropdown-toggle');
      const questionText = toggleDiv ? toggleDiv.querySelector('.paragraph-lg') : null;
      const question = questionText ? questionText.textContent.trim() : '';

      // Get answer from dropdown content
      const contentDiv = item.querySelector('.accordion-content .rich-text p');
      const answer = contentDiv ? contentDiv.textContent.trim() : '';

      if (question && answer) {
        cells.push([question, answer]);
      }
    });
  } else {
    // Fallback - try direct children with accordion class
    const items = element.querySelectorAll('.accordion');
    items.forEach(item => {
      const question = item.querySelector('.paragraph-lg, [class*="question"]');
      const answer = item.querySelector('.rich-text p, [class*="answer"]');

      if (question && answer) {
        cells.push([question.textContent.trim(), answer.textContent.trim()]);
      }
    });
  }

  const block = WebImporter.Blocks.createBlock(document, { name: 'Accordion-Faq', cells });
  element.replaceWith(block);
}

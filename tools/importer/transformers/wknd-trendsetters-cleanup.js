/* global WebImporter */

/**
 * Transformer for WKND Trendsetters website cleanup
 * Purpose: Remove navigation, footer, and non-content elements
 * Applies to: wknd-trendsetters.site (all pages)
 * Generated: 2026-01-06
 *
 * SELECTORS EXTRACTED FROM:
 * - Captured DOM during migration workflow
 * - cleaned.html from page scraping
 */

const TransformHook = {
  beforeTransform: 'beforeTransform',
  afterTransform: 'afterTransform'
};

export default function transform(hookName, element, payload) {
  if (hookName === TransformHook.beforeTransform) {
    // Remove navigation elements
    // EXTRACTED: Found .nav.secondary-nav in captured DOM
    WebImporter.DOMUtils.remove(element, [
      '.nav.secondary-nav',
      '.nav-container',
      '.w-nav-overlay'
    ]);

    // Remove footer
    // EXTRACTED: Found footer.footer.inverse-footer in captured DOM
    WebImporter.DOMUtils.remove(element, [
      'footer.footer',
      '.footer.inverse-footer'
    ]);

    // Remove Webflow-specific elements
    // EXTRACTED: Found w-dropdown-list and w-nav-button in captured DOM
    WebImporter.DOMUtils.remove(element, [
      '.w-dropdown-list',
      '.w-nav-button',
      '.nav-mobile-menu-button'
    ]);
  }

  if (hookName === TransformHook.afterTransform) {
    // Remove remaining unwanted elements
    WebImporter.DOMUtils.remove(element, [
      'iframe',
      'link',
      'noscript',
      'source'
    ]);

    // Clean up tracking/interaction attributes
    const allElements = element.querySelectorAll('*');
    allElements.forEach(el => {
      el.removeAttribute('data-w-id');
      el.removeAttribute('data-wf-page');
      el.removeAttribute('data-wf-site');
    });
  }
}

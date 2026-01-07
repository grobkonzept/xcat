export default function decorate(block) {
  // Hero lookbook variant - full-height hero with background image, headline, and CTAs
  const rows = [...block.children];

  if (rows.length > 0) {
    const firstRow = rows[0];
    const cols = [...firstRow.children];

    // First column is background image
    if (cols.length >= 1) {
      const pic = cols[0].querySelector('picture');
      if (pic) {
        block.classList.add('hero-lookbook-has-bg');
        const bgWrapper = document.createElement('div');
        bgWrapper.className = 'hero-lookbook-bg';
        bgWrapper.append(pic);
        block.prepend(bgWrapper);

        // Add overlay
        const overlay = document.createElement('div');
        overlay.className = 'hero-lookbook-overlay';
        block.append(overlay);
      }
    }

    // Second column is content (headline + CTAs)
    if (cols.length >= 2) {
      const contentCol = cols[1];
      const contentWrapper = document.createElement('div');
      contentWrapper.className = 'hero-lookbook-content';
      contentWrapper.innerHTML = contentCol.innerHTML;
      block.append(contentWrapper);
    }

    // Remove original rows
    rows.forEach((row) => row.remove());
  }
}

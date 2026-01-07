export default function decorate(block) {
  // Hero blog variant - centered heading with optional background image
  const rows = [...block.children];

  if (rows.length > 0) {
    const firstRow = rows[0];
    const cols = [...firstRow.children];

    // Check for background image
    if (cols.length >= 1) {
      const pic = cols[0].querySelector('picture');
      if (pic) {
        block.classList.add('hero-blog-has-bg');
        const bgWrapper = document.createElement('div');
        bgWrapper.className = 'hero-blog-bg';
        bgWrapper.append(pic);
        block.prepend(bgWrapper);
      }
    }

    // Check for content
    if (cols.length >= 2 || (cols.length === 1 && !cols[0].querySelector('picture'))) {
      const contentCol = cols.length >= 2 ? cols[1] : cols[0];
      const contentWrapper = document.createElement('div');
      contentWrapper.className = 'hero-blog-content';
      contentWrapper.innerHTML = contentCol.innerHTML;
      block.append(contentWrapper);
    }

    // Remove original rows
    rows.forEach(row => row.remove());
  }
}

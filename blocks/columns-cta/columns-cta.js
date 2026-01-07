export default function decorate(block) {
  // CTA variant - background image with text overlay
  const rows = [...block.children];

  if (rows.length > 0) {
    const firstRow = rows[0];
    const cols = [...firstRow.children];

    // Process image column (background)
    if (cols.length >= 1) {
      const pic = cols[0].querySelector('picture');
      if (pic) {
        const bgWrapper = document.createElement('div');
        bgWrapper.className = 'columns-cta-bg';
        bgWrapper.append(pic);
        block.prepend(bgWrapper);
        cols[0].remove();
      }
    }

    // Process content column
    if (cols.length >= 2) {
      const contentCol = cols[1];
      contentCol.classList.add('columns-cta-content');
    } else if (cols.length === 1 && !cols[0].querySelector('picture')) {
      cols[0].classList.add('columns-cta-content');
    }

    // Clean up empty row
    if (firstRow.children.length === 0) {
      firstRow.remove();
    }
  }
}

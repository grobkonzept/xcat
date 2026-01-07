export default function decorate(block) {
  // Cards category variant - cards with background images and overlay text
  const ul = document.createElement('ul');
  ul.className = 'cards-category-list';

  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    li.className = 'cards-category-item';

    const cols = [...row.children];

    // First column is the background image
    if (cols.length >= 1) {
      const pic = cols[0].querySelector('picture');
      if (pic) {
        const bgWrapper = document.createElement('div');
        bgWrapper.className = 'cards-category-bg';
        bgWrapper.append(pic);
        li.append(bgWrapper);

        // Add overlay
        const overlay = document.createElement('div');
        overlay.className = 'cards-category-overlay';
        li.append(overlay);
      }
    }

    // Second column is the content (eyebrow + title)
    if (cols.length >= 2) {
      const contentWrapper = document.createElement('div');
      contentWrapper.className = 'cards-category-content';
      contentWrapper.innerHTML = cols[1].innerHTML;
      li.append(contentWrapper);
    }

    ul.append(li);
  });

  block.replaceChildren(ul);
}

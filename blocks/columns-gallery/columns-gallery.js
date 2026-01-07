export default function decorate(block) {
  // Gallery variant - displays images in a grid layout
  const rows = [...block.children];

  // Count columns from first row
  if (rows.length > 0) {
    const cols = [...rows[0].children];
    block.classList.add(`columns-gallery-${cols.length}-cols`);
  }

  // Process each cell as an image container
  [...block.children].forEach((row) => {
    row.classList.add('columns-gallery-row');
    [...row.children].forEach((col) => {
      col.classList.add('columns-gallery-item');
      const pic = col.querySelector('picture');
      if (pic) {
        col.classList.add('columns-gallery-img');
      }
    });
  });
}

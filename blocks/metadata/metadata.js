/**
 * Metadata block - processes page metadata from block content
 * The block content is used to set page metadata and then hidden
 */
export default function decorate(block) {
  // Extract metadata from block rows and set as page properties
  const rows = [...block.children];
  rows.forEach((row) => {
    const cols = [...row.children];
    if (cols.length >= 2) {
      const key = cols[0].textContent.trim().toLowerCase();
      const value = cols[1].textContent.trim();

      // Set document metadata
      if (key === 'title') {
        document.title = value;
      } else if (key === 'description') {
        let meta = document.querySelector('meta[name="description"]');
        if (!meta) {
          meta = document.createElement('meta');
          meta.name = 'description';
          document.head.appendChild(meta);
        }
        meta.content = value;
      }
    }
  });

  // Hide the metadata block from display
  block.closest('.metadata-wrapper')?.classList.add('hidden');
  block.style.display = 'none';
}

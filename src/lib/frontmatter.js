// Tiny frontmatter parser shared by the app (browser) and the RSS plugin (node).
// Supports `key: value` pairs; values may be wrapped in double quotes.
export function parseFrontmatter(raw) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  if (!match) return { data: {}, content: raw };

  const data = {};
  for (const line of match[1].split(/\r?\n/)) {
    const idx = line.indexOf(':');
    if (idx === -1) continue;
    const key = line.slice(0, idx).trim();
    let value = line.slice(idx + 1).trim();
    if (value.startsWith('"') && value.endsWith('"')) value = value.slice(1, -1);
    data[key] = value;
  }
  return { data, content: raw.slice(match[0].length) };
}

export function slugFromPath(path) {
  return path.split('/').pop().replace(/\.md$/, '');
}

export function formatDate(iso, style = 'long') {
  // Dates in frontmatter are YYYY-MM-DD; parse as local to avoid off-by-one.
  const [y, m, d] = iso.split('-').map(Number);
  const date = new Date(y, m - 1, d);
  if (style === 'short') {
    return date
      .toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
      .toUpperCase();
  }
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

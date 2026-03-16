// Parse YAML frontmatter from markdown string
function parseFrontmatter(raw) {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) return { data: {}, content: raw };

  const frontmatter = {};
  match[1].split('\n').forEach(line => {
    const idx = line.indexOf(':');
    if (idx === -1) return;
    const key = line.slice(0, idx).trim();
    const val = line.slice(idx + 1).trim().replace(/^["']|["']$/g, '');
    frontmatter[key] = val;
  });

  return { data: frontmatter, content: match[2].trim() };
}

// Import all markdown files at build time
const modules = import.meta.glob('./posts/*.md', { query: '?raw', import: 'default', eager: true });

const posts = Object.entries(modules).map(([path, raw]) => {
  const { data, content } = parseFrontmatter(raw);
  return {
    slug: data.slug || path.replace('./posts/', '').replace('.md', ''),
    title: data.title || 'Untitled',
    date: data.date || '',
    content,
  };
}).sort((a, b) => new Date(b.date) - new Date(a.date));

export function getAllPosts() {
  return posts;
}

export function getPostBySlug(slug) {
  return posts.find(p => p.slug === slug) || null;
}

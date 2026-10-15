import { marked } from 'marked';
import { parseFrontmatter, slugFromPath } from './lib/frontmatter';

// Every Markdown file in src/posts becomes a post. The filename is the URL slug.
const files = import.meta.glob('./posts/*.md', { query: '?raw', import: 'default', eager: true });

export const posts = Object.entries(files)
  .map(([path, raw]) => {
    const { data, content } = parseFrontmatter(raw);
    return {
      slug: slugFromPath(path),
      title: data.title,
      date: data.date,
      excerpt: data.excerpt || '',
      html: marked.parse(content),
    };
  })
  .sort((a, b) => (a.date < b.date ? 1 : -1));

export function getPost(slug) {
  return posts.find((p) => p.slug === slug);
}

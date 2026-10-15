import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { readdirSync, readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { marked } from 'marked';
import { parseFrontmatter, slugFromPath } from './src/lib/frontmatter.js';

const SITE_URL = 'https://andyblechman.com';
const SITE_TITLE = 'Andy Blechman';
const POSTS_DIR = join(dirname(fileURLToPath(import.meta.url)), 'src/posts');

const escapeXml = (s) =>
  s.replace(/[<>&'"]/g, (c) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', "'": '&apos;', '"': '&quot;' })[c]);

function loadPosts() {
  return readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith('.md'))
    .map((f) => {
      const { data, content } = parseFrontmatter(readFileSync(join(POSTS_DIR, f), 'utf8'));
      // Feed readers and emails need absolute URLs, so expand site-relative links.
      const html = marked.parse(content).replace(/(href|src)="\//g, `$1="${SITE_URL}/`);
      return { slug: slugFromPath(f), ...data, html };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

// Emits /rss.xml at build time so feed readers can follow new posts.
function rssPlugin() {
  return {
    name: 'rss',
    apply: 'build',
    generateBundle() {
      const posts = loadPosts();
      const items = posts
        .map(
          (p) => `    <item>
      <title>${escapeXml(p.title)}</title>
      <link>${SITE_URL}/blog/${p.slug}</link>
      <guid isPermaLink="true">${SITE_URL}/blog/${p.slug}</guid>
      <pubDate>${new Date(`${p.date}T12:00:00Z`).toUTCString()}</pubDate>
      ${p.excerpt ? `<description>${escapeXml(p.excerpt)}</description>` : ''}
      <content:encoded><![CDATA[${p.html}]]></content:encoded>
    </item>`,
        )
        .join('\n');

      const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>${SITE_TITLE}</title>
    <link>${SITE_URL}/blog</link>
    <description>Writing by Andy Blechman</description>
    <language>en-us</language>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml" />
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${items}
  </channel>
</rss>
`;
      this.emitFile({ type: 'asset', fileName: 'rss.xml', source: xml });
    },
  };
}

export default defineConfig({
  plugins: [react(), rssPlugin()],
});

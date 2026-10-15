# andyblechman.com

Personal site and blog. React + Vite + Tailwind, deployed on Vercel. No CMS: posts live in this repo.

## Writing a post

1. Add a Markdown file to `src/posts/`. The filename is the URL slug, e.g. `src/posts/sleep.md` → `/blog/sleep`.
2. Start it with frontmatter:

   ```md
   ---
   title: "Sleep"
   date: 2025-03-26
   excerpt: "One or two sentences shown on the posts page and in RSS."
   ---

   Body in Markdown. Raw HTML is allowed (used for YouTube embeds).
   ```

3. Commit and push to `main`. Vercel rebuilds the site and the RSS feed at `/rss.xml`.

The five newest posts appear under "Featured Writing" on the home page. The full list is at `/blog`.

## Local development

```sh
npm install
npm run dev      # http://localhost:5173
npm run build    # outputs dist/ including rss.xml
```

## Routes

- `/` home
- `/blog` all posts
- `/blog/:slug` a post
- `/rss.xml` feed

`vercel.json` redirects the old Ghost domain (`blog.andyblechman.com/<slug>`) to `/blog/<slug>`.

# Plan: Migrate from Ghost to Markdown-based Blog

## Architecture

Blog posts will be markdown files stored in `src/posts/`. Vite's `import.meta.glob` will dynamically discover them at build time. React Router (already installed) will handle routing between the home page and individual blog post pages. `react-markdown` will render the markdown content using the same Tailwind styling as the home page.

Each markdown file will have YAML frontmatter for metadata (title, date, slug).

---

## Steps

### Step 1: Add dependencies

- **Add** `react-markdown` — renders markdown as React components
- **Add** `gray-matter` — parses YAML frontmatter from markdown files
- **Remove** `@tryghost/content-api`

### Step 2: Create blog post markdown files

Create `src/posts/` directory with `.md` files migrated from the current hardcoded fallback posts. Each file uses frontmatter:

```md
---
title: "Post Title Here"
date: "2024-03-15"
slug: "post-slug-here"
---

Post content in markdown...
```

### Step 3: Create a posts loader utility

**New file:** `src/posts.js`

- Use `import.meta.glob` to import all `.md` files from `src/posts/`
- Parse frontmatter with `gray-matter`
- Export a function that returns posts sorted by date (newest first)
- Export a function that returns a single post by slug

### Step 4: Create a BlogPost page component

**New file:** `src/BlogPost.jsx`

- Reads the slug from the URL via `useParams()`
- Loads the matching post using the posts loader
- Renders title, date, and markdown body using `react-markdown`
- Uses the **same layout wrapper** as the home page (same `bg-[#f8f5f1]`, `max-w-[550px]`, `font-serif`, etc.)
- Includes the same sticky navbar

### Step 5: Create a Blog index page component

**New file:** `src/BlogIndex.jsx`

- Lists all posts with dates and titles (like the current "Featured Writing" but showing all posts)
- Same styling as home page
- Links to `/blog/:slug` for each post

### Step 6: Add routing to the app

**Edit:** `src/main.jsx`

- Wrap the app in `BrowserRouter`
- Add routes:
  - `/` → `App` (home page)
  - `/blog` → `BlogIndex` (all posts)
  - `/blog/:slug` → `BlogPost` (individual post)

### Step 7: Update App.jsx — remove Ghost, use local posts

**Edit:** `src/App.jsx`

- Remove `import api from './ghost'`
- Remove Ghost API `useEffect` (fetch + portal script injection)
- Remove `openSubscribeModal` function
- Remove `loading` state
- Import posts from the new posts loader
- Display the 5 most recent posts in "Featured Writing" as links to `/blog/:slug`
- Update "Read more posts →" link to `/blog`
- Update "Posts" nav link to `/blog`
- Replace the subscribe section (Ghost modal → simple mailto or remove)

### Step 8: Update Vercel config for SPA routing

**Edit:** `vercel.json`

- Remove Ghost rewrite rules
- Add SPA catch-all rewrite so `/blog/*` routes work:
  ```json
  { "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }] }
  ```

### Step 9: Delete Ghost files and dead code

- **Delete** `src/ghost.js`
- **Delete** `GhostSubscribeForm.jsx`

### Step 10: Build and verify

- Run `npm install`
- Run `npm run build`
- Run `npm run dev` and verify:
  - Home page loads with "Featured Writing" from local markdown
  - `/blog` shows all posts
  - `/blog/:slug` renders full post with same styling
  - No Ghost console errors
  - Navigation between pages works

---

## Files Summary

| Action | File |
|--------|------|
| Edit | `package.json` (add react-markdown, gray-matter; remove ghost) |
| Edit | `src/main.jsx` (add Router + routes) |
| Edit | `src/App.jsx` (remove Ghost, use local posts) |
| Edit | `vercel.json` (SPA routing) |
| Create | `src/posts/` directory with `.md` files |
| Create | `src/posts.js` (post loader utility) |
| Create | `src/BlogPost.jsx` (single post page) |
| Create | `src/BlogIndex.jsx` (all posts page) |
| Delete | `src/ghost.js` |
| Delete | `GhostSubscribeForm.jsx` |

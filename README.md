# arushbodla.vercel.app

Personal portfolio site. Next.js 15 App Router, TypeScript, Tailwind CSS. Terminal/hacker aesthetic with a three-tier CTF challenge system built in.

Live: **https://arushbodla.vercel.app**

---

## What's Here

Beyond a standard portfolio, the site has a layered challenge system hidden on the home page. Solving each tier unlocks a new section:

| Tier | Cipher | Unlocks |
|---|---|---|
| 1 | ROT13 | `/lab` — notes and writeups |
| 2 | Double Base64 | `/graveyard` — abandoned project post-mortems |
| 3 | XOR + hex encoding | `/flag` — completion certificate |

There are also easter eggs outside the main challenge path — check the page source and API routes.

---

## Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS 3 with custom terminal color tokens
- **Content:** MDX via `@next/mdx`, frontmatter via `gray-matter`
- **Email:** Nodemailer (Gmail SMTP)
- **Fonts:** Geist Mono (primary), Geist Sans
- **Deployment:** Vercel

---

## Local Development

```bash
npm install
npm run dev
```

Create `.env.local`:
```
EMAIL_USER=your@gmail.com
EMAIL_PASSWORD=your-app-password
RECIPIENT_EMAIL=inbox@example.com
```

Use a Gmail App Password, not your account password.

---

## Project Structure

```
src/
  app/               → Pages and API routes
  components/        → UI components organized by domain
    nav/             → Navbar
    ui/              → TerminalBox, FlagBadge, Footer
    home/            → Hero, About, Skills, ChallengeSection
    challenges/      → ChallengeBox, ChallengeGate
    projects/        → ProjectCard
    lab/             → PostList
    contact/         → Contact
  data/              → Static content (projects, skills, challenges, graveyard)
  lib/               → Crypto utilities, MDX post loader
  content/posts/     → MDX blog posts
public/              → Images and static assets
```

Full developer guide (component map, styling conventions, challenge system internals): [`.claude/CLAUDE.md`](.claude/CLAUDE.md)

---

## Adding Content

**New project** — add an entry to `src/data/projects.ts`

**New blog post** — create `src/content/posts/my-slug.mdx`:
```yaml
---
title: 'Title'
date: 'YYYY-MM-DD'
description: 'One sentence.'
published: true
---
```

**New graveyard entry** — add to `src/data/graveyard.ts`

---

## TODO

### Content placeholders
- [ ] Write real tagline in `src/components/home/Hero.tsx` (currently a placeholder)
- [ ] Write real bio in `src/components/home/About.tsx` (currently a placeholder)
- [ ] Fill in certificate text and MY_INSPIRATIONS section in `src/app/flag/page.tsx`
- [ ] Replace `src/content/posts/example-post.mdx` with a real first post — it has `published: true` with TODO content, so it is currently visible in `/lab`

### Cleanup
- [ ] Uninstall dead npm packages: `emailjs`, `emailjs-com`, `next-sitemap`
- [ ] Delete unused public assets: `file.svg`, `globe.svg`, `next.svg`, `vercel.svg`, `vite.svg`, `window.svg`, `ArushBodlaLogo.svg`, `ArushBodlaWithoutBackground-full.svg`, `Resume.pdf`
- [ ] Delete `src/components/Progressbar.tsx` (built, never imported anywhere)
- [ ] Delete `src/assets/react.svg` (default CNA artifact, never referenced)

### Features
- [ ] Add `robots.txt` — `/api/ping` hints at it, completing the easter egg trail
- [ ] Add `generateStaticParams` to `src/app/lab/[slug]/page.tsx` for static post generation at build time
- [ ] Audit MDX prose styling — `prose-invert` on post pages may need custom overrides to match the terminal theme (code blocks, headings, links)
- [ ] Set `example-post.mdx` to `published: false` until it has real content

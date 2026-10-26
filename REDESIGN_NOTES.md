# Jiashun Portfolio — Light-first redesign

This is the **complete original Astro website** with a new visual layer and redesigned Home, Projects, and About pages. All existing Markdown/MDX blog entries, blog routes, tags, archives, RSS, documentation, search, assets, and GitHub Pages deployment configuration are retained.

## Run it

Use **Bun** (recommended by the existing GitHub Actions workflow):

```bash
bun install
bun run dev
bun run build
```

Alternatively use `npm install` / `npm run dev` / `npm run build` (npm may generate its own lockfile). Open the local URL printed by Astro, typically `http://localhost:4321`.

## Publish on GitHub Pages

Push this project's contents to the `main` branch of `Jiashun-Hao/Jiashun-Hao.github.io` and enable GitHub Pages → **GitHub Actions** in repository settings. The existing `.github/workflows/deploy.yml` builds and deploys `dist/` on each push.

## What changed

- `src/pages/index.astro`: rebuilt hero, software-workspace illustration, project cards, personal story, latest writing, skills, and contact section.
- `src/pages/projects/index.astro`: rebuilt public project gallery; removed dead Coming soon sections and disabled Waline pageview loader.
- `src/pages/about/index.astro`: new biography, education, publications, and technology sections; removed the dead sponsorship link.
- `src/components/shell/`: new responsive, accessible header and footer.
- `src/components/home/ProjectShowcase.astro`: reusable project card with CSS/SVG visuals — **illustrative artwork, not screenshots of real apps**.
- `src/data/portfolio.ts`: edit public project titles, descriptions, links, education, research and skills in one place.
- `src/assets/styles/redesign.css`: lightweight responsive design, hover effects, entrance animations and reduced-motion support.
- `src/layouts/BaseLayout.astro`: global shell + IntersectionObserver reveal. Light is the default; dark remains user-selectable.
- `src/pages/rss.xml.ts`: only outputs an image tag when a post has an image, avoiding `undefined` RSS images.
- `src/site.config.ts`: corrected the avatar path and updated the description.

## Notes

- Only public projects that were **already in the uploaded website** appear on the project gallery. Do not disclose private employer/customer projects without permission.
- No extra animation packages or backend services were introduced.
- `#selected-work` supports the hero CTA, and the header/mobile menu works without external JS libraries.
- Check and update descriptions in `src/data/portfolio.ts` whenever your project details change.

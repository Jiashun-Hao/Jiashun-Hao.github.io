// astro.config.ts
import { rehypeHeadingIds } from '@astrojs/markdown-remark'
import AstroPureIntegration from 'astro-pure'
import { defineConfig } from 'astro/config'
import rehypeKatex from 'rehype-katex'
import remarkMath from 'remark-math'

// Local rehype & remark plugins
import rehypeAutolinkHeadings from './src/plugins/rehype-auto-link-headings.ts'
// Shiki
import {
  addCopyButton,
  addLanguage,
  addTitle,
  transformerNotationDiff,
  transformerNotationHighlight,
  updateStyle
} from './src/plugins/shiki-transformers.ts'
import config from './src/site.config.ts'


export default defineConfig({
  // Pages 域名（个人主页）
  site: 'https://jiashun-hao.github.io',
  trailingSlash: 'never',
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp'
    }
  },

  integrations: [
    AstroPureIntegration(config)
  ],

  prefetch: true,
  server: { host: true },

  markdown: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [
      [rehypeKatex, {}],
      rehypeHeadingIds,
      [
        rehypeAutolinkHeadings,
        {
          behavior: 'append',
          properties: { className: ['anchor'] },
          content: { type: 'text', value: '#' }
        }
      ]
    ],
    shikiConfig: {
      themes: { light: 'github-light', dark: 'github-dark' },
      transformers: [
        transformerNotationDiff(),
        transformerNotationHighlight(),
        updateStyle(),
        addTitle(),
        addLanguage(),
        addCopyButton(2000)
      ]
    }
  },

  experimental: { contentIntellisense: true },
  vite: { plugins: [] }
})

import { defineCollection, z } from 'astro:content'
import { glob } from 'astro/loaders'

function removeDupsAndLowerCase(array: string[]) {
  if (!array.length) return array
  const lowercaseItems = array.map((str) => str.toLowerCase())
  const distinctItems = new Set(lowercaseItems)
  return Array.from(distinctItems)
}

// 过滤掉 null/undefined，再去重转小写
function cleanTags(array: (string | null | undefined)[]) {
  const filtered = array.filter((t): t is string => typeof t === 'string' && t.length > 0)
  return removeDupsAndLowerCase(filtered)
}

const blog = defineCollection({
  loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
  schema: ({ image }) =>
    z.object({
      // title 放开长度限制，兼容 CSDN 长标题
      title: z.string(),
      // 改为可选，CSDN 文章无 description 字段
      description: z.string().max(160).optional().default(''),
      // 改为可选，兼容 CSDN 日期格式或缺失
      publishDate: z.coerce.date().optional().default(new Date('2000-01-01')),
      // Optional
      updatedDate: z.coerce.date().optional(),
      heroImage: z
        .object({
          src: image(),
          alt: z.string().optional(),
          inferSize: z.boolean().optional(),
          width: z.number().optional(),
          height: z.number().optional(),
          color: z.string().optional()
        })
        .optional(),
      // 允许 null 值，自动过滤掉
      tags: z
        .array(z.string().nullable().optional())
        .default([])
        .transform(cleanTags),
      language: z.string().optional(),
      draft: z.boolean().default(false),
      comment: z.boolean().default(true),
      // CSDN 原始链接（爬虫写入）
      source: z.string().optional(),
    })
})

const docs = defineCollection({
  loader: glob({ base: './src/content/docs', pattern: '**/*.{md,mdx}' }),
  schema: () =>
    z.object({
      title: z.string(),
      description: z.string().max(160).optional().default(''),
      publishDate: z.coerce.date().optional(),
      updatedDate: z.coerce.date().optional(),
      tags: z
        .array(z.string().nullable().optional())
        .default([])
        .transform(cleanTags),
      draft: z.boolean().default(false),
      order: z.number().default(999)
    })
})

export const collections = { blog, docs }

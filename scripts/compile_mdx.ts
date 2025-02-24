import { mkdirSync, readFileSync, writeFileSync } from 'fs'
import { join } from 'path'

import { bundleMDX } from 'mdx-bundler'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeKatex from 'rehype-katex'
import rehypePresetMinify from 'rehype-preset-minify'
import rehypeSlug from 'rehype-slug'
import remarkFootnotes from 'remark-footnotes'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'

import {
    remarkCodeTitles,
    remarkExtractFrontmatter,
    remarkImgToJsx,
    remarkTocHeadings,
} from '@/libs/remark'
import { getAllFirstLevelFolders } from '@libs/files'

const root = process.cwd()
const prefixPath = join(root, 'public', 'posts')
const allSlugs: string[] = getAllFirstLevelFolders(prefixPath)

const compileMDX = async (slug: string, lang: 'vi' | 'en') => {
    const folderToRetrieve = join(root, 'public', 'posts', slug)
    const folderToCompile = join(root, 'public', 'compiled_posts', slug)

    const sourcePath = join(folderToRetrieve, lang + '.md')
    const source = readFileSync(sourcePath, 'utf8')

    const headings = []
    const { code, frontmatter } = await bundleMDX({
        source,
        cwd: join(root, 'components'),
        mdxOptions: (options) => {
            options.remarkPlugins = [
                ...(options.remarkPlugins ?? []),
                remarkExtractFrontmatter,
                [remarkTocHeadings, { exportRef: headings }],
                remarkGfm,
                [remarkFootnotes, { inlineNotes: true }],
                remarkMath,
                remarkCodeTitles,
                remarkImgToJsx,
            ] as any
            options.rehypePlugins = [
                ...(options.rehypePlugins ?? []),
                rehypeSlug,
                rehypeAutolinkHeadings,
                rehypeKatex,
                rehypePresetMinify,
            ]
            return options
        },
        esbuildOptions: (options) => {
            options.loader = { ...options.loader, '.ts': 'tsx' }
            return options
        },
    })

    if (lang === 'vi') {
        headings.forEach((heading: any) => {
            if (heading.value === 'Footnotes') heading.value = 'Chỉ mục'
        })
    }

    const markdown = {
        ...frontmatter,
        code,
        headings,
        slug,
        thumbnail: '/posts/' + slug + '/thumbnail.png',
        date: new Date(frontmatter.date).toISOString(),
    }
    const buildPath = join(folderToCompile, lang + '.json')
    const build = JSON.stringify(markdown)
    mkdirSync(folderToCompile, { recursive: true })
    writeFileSync(buildPath, build)
}

const compileMDXs = async (lang: 'vi' | 'en') => {
    for (const slug of allSlugs) {
        await compileMDX(slug, lang)
    }
}

Promise.all([compileMDXs('vi')])

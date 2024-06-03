import fs from 'fs'
import path from 'path'

import matter from 'gray-matter'
import { bundleMDX } from 'mdx-bundler'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeKatex from 'rehype-katex'
import rehypePresetMinify from 'rehype-preset-minify'
import rehypeSlug from 'rehype-slug'
import remarkFootnotes from 'remark-footnotes'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'

import {
    getAllFirstLevelFolders,
    getCountAllFirstLevelFolders,
} from '@/libs/files'
import {
    remarkCodeTitles,
    remarkExtractfrontmatter,
    remarkImgToJsx,
    remarkTocHeadings,
} from '@/libs/remark'

const root = process.cwd()
const prefixPath = path.join(root, 'public', 'posts')

export const getPathFromSlug = (slug: string): string => {
    return path.join(root, 'public', 'posts', slug)
}

export const getAllSlugs = (): string[] => {
    return getAllFirstLevelFolders(prefixPath)
}

export const formatSlug = (slug: string): string => {
    return slug.replace(/\.(md)/, '')
}

export const getMarkdown = async (slug: string): Promise<Markdown> => {
    const mdPath = path.join(root, 'public', 'posts', slug, 'index.md')
    const source = fs.readFileSync(mdPath, 'utf8')

    // https://github.com/kentcdodds/mdx-bundler#nextjs-esbuild-enoent
    if (process.platform === 'win32') {
        process.env.ESBUILD_BINARY_PATH = path.join(
            root,
            'node_modules',
            'esbuild',
            'esbuild.exe'
        )
    } else {
        process.env.ESBUILD_BINARY_PATH = path.join(
            root,
            'node_modules',
            'esbuild',
            'bin',
            'esbuild'
        )
    }

    const headings = []
    const { code, frontmatter } = await bundleMDX({
        source,
        // mdx imports can be automatically source from the components directory
        cwd: path.join(root, 'components'),
        mdxOptions: (options) => {
            options.remarkPlugins = [
                ...(options.remarkPlugins ?? []),
                remarkExtractfrontmatter,
                [remarkTocHeadings, { exportRef: headings }],
                remarkGfm,
                remarkCodeTitles,
                [remarkFootnotes, { inlineNotes: true }],
                remarkMath,
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

    return {
        ...(frontmatter as Frontmatter),
        code,
        headings,
        slug,
        thumbnail: '/posts/' + slug + '/thumbnail.png',
        date: new Date(frontmatter.date).toISOString(),
    }
}

export const getAllFrontmatters = (): Frontmatter[] => {
    const slugs = getAllSlugs()
    const frontmatters: Frontmatter[] = []

    slugs.forEach((slug) => {
        const path = getPathFromSlug(slug)

        const source = fs.readFileSync(path + '/index.md', 'utf8')
        const { data: frontmatter } = matter(source)

        if (frontmatter.draft !== true) {
            frontmatters.push({
                ...frontmatter,
                slug,
                thumbnail: '/posts/' + slug + '/thumbnail.png',
                date: new Date(frontmatter.date).toISOString(),
            } as Frontmatter)
        }
    })

    return frontmatters.sort((a, b) => (a.date > b.date ? -1 : 1))
}

export const getMarkdownCounts = (): number => {
    return getCountAllFirstLevelFolders(prefixPath)
}

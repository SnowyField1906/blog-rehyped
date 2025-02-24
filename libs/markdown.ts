import { readFileSync } from 'fs'
import { join } from 'path'

import {
    getAllFirstLevelFolders,
    getCountAllFirstLevelFolders,
} from '@/libs/files'

const root = process.cwd()
const prefixPath = join(root, 'public', 'compiled_posts')

export const getMarkdown = (slug: string): Markdown => {
    const mdPath = join(prefixPath, slug, 'vi.json')
    const source = readFileSync(mdPath, 'utf8')

    // https://github.com/kentcdodds/mdx-bundler#nextjs-esbuild-enoent
    if (process.platform === 'win32') {
        process.env.ESBUILD_BINARY_PATH = join(
            root,
            'node_modules',
            'esbuild',
            'esbuild.exe'
        )
    } else {
        process.env.ESBUILD_BINARY_PATH = join(
            root,
            'node_modules',
            'esbuild',
            'bin',
            'esbuild'
        )
    }
    return JSON.parse(source) as Markdown
}

export const getAllFrontmatters = (): Frontmatter[] => {
    const slugs = getAllFirstLevelFolders(prefixPath)
    const frontmatters: Frontmatter[] = []
    slugs.forEach((slug) => {
        const { code, headings, ...frontmatter }: Markdown = getMarkdown(slug)
        frontmatters.push({
            ...frontmatter,
            slug,
            thumbnail: '/posts/' + slug + '/thumbnail.png',
            date: new Date(frontmatter.date).toISOString(),
        })
    })
    return frontmatters.sort((a, b) => (a.date > b.date ? -1 : 1))
}

export const getMarkdownCounts = (): number => {
    return getCountAllFirstLevelFolders(prefixPath)
}

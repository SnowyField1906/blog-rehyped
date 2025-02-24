import fs from 'fs'

import globby from 'globby'
import matter from 'gray-matter'
import { format, resolveConfig } from 'prettier'

import siteMetadata from '../data/siteMetadata.json'

const generateSitemap = async () => {
    const prettierConfig = await resolveConfig('./.prettierrc.json')

    const pages = await globby([
        'app/**/*.js',
        'app/**/*.ts',
        'app/**/*.tsx',
        '!app/**/_*.js',
        '!app/**/_*.ts',
        '!app/**/_*.tsx',
        '!app/**/api',
        'public/posts/**/*.mdx',
        'public/posts/**/*.md',
    ])

    const sitemap = `
        <?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
            ${pages
                .map((page) => {
                    // Exclude drafts and canonical URLs
                    if (page.search('.md') >= 1 && fs.existsSync(page)) {
                        const source = fs.readFileSync(page, 'utf8')
                        const fm = matter(source)
                        if (fm.data.draft) {
                            return
                        }
                        if (fm.data.canonicalUrl) {
                            return
                        }
                    }

                    let path = page
                        .replace('app/', '/')
                        .replace('public/', '/')
                        .replace('.js', '')
                        .replace('.tsx', '')
                        .replace('.mdx', '')
                        .replace('.md', '')
                        .replace('/feed.xml', '')

                    // HARD-CODED: remove "/page" và "/vi"
                    path = path.replace(/\/page$/, '').replace(/\/vi$/, '')

                    // Remove "404" and dynamic routes
                    if (
                        page.includes('app/404.') ||
                        page.includes('app/posts/[...slug].')
                    ) {
                        return
                    }

                    const route = path === '/index' ? '' : path
                    return `
                        <url>
                            <loc>${siteMetadata.siteUrl}${route}</loc>
                        </url>
                    `
                })
                .join('')}
        </urlset>
    `

    const formatted = await format(sitemap, {
        ...prettierConfig,
        parser: 'html',
    })
    fs.writeFileSync('public/sitemap.xml', formatted)
}

generateSitemap()

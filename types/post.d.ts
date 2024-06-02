type Frontmatter = {
    title: string
    description: string
    tags: string[]
    slug: string
    thumbnail: string
    date: string
}

type Markdown = Frontmatter & {
    code: string
    toc: string[]
}

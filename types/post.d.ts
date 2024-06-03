type Frontmatter = {
    title: string
    description: string
    tags: string[]
    slug: string
    thumbnail: string
    date: string
}

type Heading = {
    depth: number
    value: string
    url: string
}

type Markdown = Frontmatter & {
    code: string
    headings: Heading[]
}

import { Metadata } from 'next'

import MDXLayout from '@components/MDX/MDXLayout'
import siteMetadata from '@data/siteMetadata.json'
import { getMarkdown } from '@libs/markdown'

export const maxDuration = 60

export const generateMetadata = ({
	params,
}: {
	params: { slug: string }
}): Metadata => {
	const markdown: Markdown = getMarkdown(params.slug)
	return {
		metadataBase: new URL(siteMetadata.siteUrl),
		title: markdown.title + ' | ' + siteMetadata.headerTitle,
		description: markdown.description,
		openGraph: {
			images: [markdown.thumbnail],
		},
	}
}

const Post = async ({ params }: { params: { slug: string } }) => {
	const markdown: Markdown = getMarkdown(params.slug)
	return <MDXLayout markdown={markdown} />
}

export default Post

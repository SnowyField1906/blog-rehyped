import { Metadata } from 'next'

import Tag from '@components/Common/Tag'
import Title from '@components/Common/Title'
import PostPreview from '@components/Post/PostPreview'
import siteMetadata from '@data/siteMetadata.json'
import { getAllFrontmatters } from '@libs/markdown'

const metadata = siteMetadata.internalLinks.find(
	(link) => link.title === 'Posts'
)

export const generateMetadata = ({
	searchParams,
}: {
	searchParams?: { [key: string]: string | undefined }
}): Metadata => {
	const tag = searchParams?.tag
	const metadata = siteMetadata.internalLinks.find(
		(link) => link.title === 'Posts'
	)

	const dynamicTitle = tag
		? `Posts in ${tag} | ${siteMetadata.headerTitle}`
		: metadata!.title + ' | ' + siteMetadata.headerTitle

	const dynamicDescription = tag
		? `Tất cả bài viết liên quan đến tag "${tag}"`
		: metadata!.description

	return {
		metadataBase: new URL(siteMetadata.siteUrl),
		title: dynamicTitle,
		description: dynamicDescription,
		openGraph: {
			title: dynamicTitle,
			description: dynamicDescription,
			images: [siteMetadata.siteUrl + siteMetadata.siteBanner],
		},
	}
}

const Post = async ({
	searchParams,
}: {
	searchParams?: { [key: string]: string | undefined }
}) => {
	const _frontmatters: Frontmatter[] = getAllFrontmatters()
	const frontmatters: Frontmatter[] = _frontmatters.filter(
		(e) =>
			searchParams?.tag === undefined ||
			e.tags.includes(searchParams?.tag as string)
	)

	const _tags: string[] = _frontmatters.map((e) => e.tags).flat()
	const tags: [string, unknown][] = Object.entries(
		_tags.reduce((acc, tag) => {
			acc[tag] = (acc[tag] || 0) + 1
			return acc
		}, {})
	).sort((a: any, b: any) => b[1] - a[1])

	return (
		<>
			<Title
				primary={`${searchParams?.tag ? searchParams.tag : 'Posts'}`}
				secondary={metadata!.description}
				type={`${searchParams?.tag ? 'tag' : 'main'}`}
			/>
			<div className="flex flex-wrap justify-center gap-3 lg:gap-5">
				<Tag />
				{tags.map(([tag, count]) => (
					<Tag key={tag} name={tag} count={count as number} />
				))}
			</div>
			<div className="grid gap-6 lg:grid-cols-2">
				{frontmatters.map((frontmatter) => (
					<PostPreview key={frontmatter.slug} frontmatter={frontmatter} />
				))}
			</div>
		</>
	)
}

export default Post

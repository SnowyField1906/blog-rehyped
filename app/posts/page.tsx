import { Metadata } from 'next'

import Tag from '@components/Common/Tag'
import Title from '@components/Common/Title'
import PostPreview from '@components/Post/PostPreview'
import siteMetadata from '@data/siteMetadata.json'
import { getAllFrontmatters } from '@libs/markdown'

const metadata = siteMetadata.internalLinks.find(
	(link) => link.title === 'Posts'
)

export const generateMetadata = (): Metadata => {
	return {
		metadataBase: new URL(siteMetadata.siteUrl),
		title: metadata!.title + ' | ' + siteMetadata.headerTitle,
		description: metadata!.description,
		openGraph: {
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
			<Title primary={metadata!.title} secondary={metadata!.description} />
			<div className="flex flex-wrap justify-center gap-3 text-2xs lg:gap-5 lg:text-sm xl:text-base">
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

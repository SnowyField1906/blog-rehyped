'use client'

import { Anchor } from 'antd'
import { FaFacebook, FaLinkedin, FaTwitter } from 'react-icons/fa'
import ProgressBar from 'react-scroll-progress-bar'
import readingTime from 'reading-time'

import Link from '@components/Common/Link'
import Tag from '@components/Common/Tag'
import Title from '@components/Common/Title'
import PostReaction from '@components/Post/PostReaction'
import ViewCounter from '@components/Post/ViewCounter'
import ScrollTop from '@components/Utils/ScrollTop'
import siteMetadata from '@data/siteMetadata.json'

const PostLayout = ({
	children,
	markdown,
}: {
	children: JSX.Element
	markdown: Markdown
}) => {
	const time = readingTime(markdown.code)

	type AntHeading = {
		key: string
		href: string
		title: string
		children?: AntHeading[]
	}

	const parseHeadings = (headings: Heading[]): AntHeading[] => {
		const root: AntHeading[] = []
		const stack: { node: AntHeading; depth: number }[] = []

		headings.forEach((heading) => {
			if (heading.depth > 3) return

			const newNode: AntHeading = {
				key: heading.url,
				href: heading.url,
				title: heading.value,
				children: [],
			}

			while (
				stack.length > 0 &&
				stack[stack.length - 1].depth >= heading.depth
			) {
				stack.pop()
			}

			if (stack.length === 0) {
				root.push(newNode)
			} else {
				const parent = stack[stack.length - 1].node
				if (!parent.children) {
					parent.children = []
				}
				parent.children.push(newNode)
			}

			stack.push({ node: newNode, depth: heading.depth })
		})

		return root
	}

	return (
		<>
			<div className="fixed right-0 top-0 z-50 h-1 w-screen">
				<ProgressBar bgcolor="#1f1f1f" />
			</div>
			<ScrollTop />
			<header className="mx-auto flex flex-col gap-10 text-center">
				<div className="flex flex-wrap items-center justify-center gap-5 text-zinc-500">
					{markdown.tags.map((tag) => (
						<Tag key={tag} name={tag} />
					))}
				</div>
				<Title
					primary={markdown.title}
					secondary={markdown.description}
					type="article"
				/>
				<div className="flex flex-col items-center justify-center gap-3 text-zinc-500 lg:flex-row lg:gap-5">
					<span>
						{new Date(markdown.date).toLocaleDateString(siteMetadata.locale, {
							weekday: 'long',
							year: 'numeric',
							month: 'long',
							day: 'numeric',
						})}
					</span>
					<span className="hidden lg:block">-</span>
					<div className="flex gap-3 lg:gap-5">
						<span>{time.words} words</span>
						<span>-</span>
						<span>{time.text}</span>
						<span>-</span>
						<ViewCounter slug={markdown.slug} inc={true} />
					</div>
				</div>
			</header>
			<img
				alt={markdown.title}
				src={markdown.thumbnail}
				className="h-[180px] w-full object-cover lg:h-[400px]"
			/>
			<hr className="m-5 mx-auto w-1/3 border-zinc-700" />
			<div className="flex gap-4 lg:gap-8 xl:gap-12">
				<div className="overflow-y sticky top-20 hidden h-max flex-col lg:flex lg:w-1/3">
					<p className="mb-5 mt-2 text-lg text-zinc-900">Table of contents</p>
					<Anchor items={parseHeadings(markdown.headings)} />
					<p className="my-5 mt-12 text-lg text-zinc-900">Author(s)</p>
					<p className="text-zinc-500">
						Thuan Nguyen /{' '}
						<Link href={'https://github.com/snowyfield1906'}>
							@snowyfield1906
						</Link>
					</p>
					<div className="h-max overflow-hidden">
						<p className="my-5 mt-12 text-lg text-zinc-900">Share article</p>
						<div className="flex gap-5">
							<a
								href={`https://www.facebook.com/sharer/sharer.php?u=${siteMetadata.siteUrl}/posts/${markdown.slug}`}
								target="_blank"
								rel="noopener noreferrer"
								aria-label="Share on Facebook"
							>
								<FaFacebook className="text-2xl text-zinc-500 hover:text-zinc-900" />
							</a>
							<a
								href={`https://www.linkedin.com/shareArticle?mini=true&url=${siteMetadata.siteUrl}/posts/${markdown.slug}`}
								target="_blank"
								rel="noopener noreferrer"
								aria-label="Share on LinkedIn"
							>
								<FaLinkedin className="text-2xl text-zinc-500 hover:text-zinc-900" />
							</a>
							<a
								href={`https://twitter.com/intent/tweet?url=${siteMetadata.siteUrl}/posts/${markdown.slug}`}
								target="_blank"
								rel="noopener noreferrer"
								aria-label="Share on Twitter"
							>
								<FaTwitter className="text-2xl text-zinc-500 hover:text-zinc-900" />
							</a>
						</div>
					</div>
				</div>
				<article className="prose prose-mobile mx-auto w-full lg:prose">
					{children}
					<hr className="m-5 border-zinc-700" />
					<div className="flex w-full items-center justify-center gap-5 text-base lg:text-xl">
						<PostReaction />
					</div>
				</article>
				<div className="w-auto"></div>
			</div>
		</>
	)
}

export default PostLayout

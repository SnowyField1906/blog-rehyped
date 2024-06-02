'use client'

import ProgressBar from 'react-scroll-progress-bar'
import readingTime from 'reading-time'

import Heading from '@components/Common/Heading'
import Tag from '@components/Common/Tag'
import PostReaction from '@components/Post/PostReaction'
import ViewCounter from '@components/Post/ViewCounter'
import GroupShareButtons from '@components/Utils/GroupShareButtons'
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

	return (
		<>
			<ProgressBar bgcolor="#1f1f1f" />
			<main className="m-auto flex h-full w-11/12 flex-col place-items-center items-center gap-10 py-16 lg:w-3/4">
				<ScrollTop />
				<article className="mx-auto grid w-full gap-5 lg:gap-10">
					<header className="mx-auto w-11/12 text-center lg:w-3/4">
						<div className="flex items-center justify-center gap-5 text-zinc-500">
							{markdown.tags.map((tag) => (
								<Tag key={tag} name={tag} />
							))}
						</div>
						<Heading heading={markdown.title} />
						<div className="flex flex-col items-center justify-center gap-3 text-zinc-500 lg:flex-row lg:gap-5">
							<span>
								{new Date(markdown.date).toLocaleDateString(
									siteMetadata.locale,
									{
										weekday: 'long',
										year: 'numeric',
										month: 'long',
										day: 'numeric',
									}
								)}
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

					<div className="mx-auto w-11/12 text-center lg:w-3/4">
						<p className="font-decoration text-xl font-extralight leading-loose tracking-wide text-zinc-800 lg:text-2xl">
							{markdown.description}
						</p>
					</div>

					<hr className="m-5 mx-auto w-1/3 border-zinc-700" />
					<div className="flex">
						<div className="relative min-h-full w-auto">
							<GroupShareButtons title={markdown.title} slug={markdown.slug} />
						</div>
						<div className="prose prose-mobile mx-auto w-11/12 lg:prose lg:w-3/4">
							{children}
							<hr className="m-5 border-zinc-700" />
							<div className="flex w-full items-center justify-center gap-5 text-base lg:text-xl">
								<PostReaction />
							</div>
						</div>
						<div className="w-auto"></div>
					</div>
				</article>
			</main>
		</>
	)
}

export default PostLayout

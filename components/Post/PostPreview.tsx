import Link from 'next/link'

import ViewCounter from '@components/Post/ViewCounter'
import { formatDate } from '@libs/date'

const PostPreview = async ({ frontmatter }: { frontmatter: Frontmatter }) => {
	return (
		<div className="relative block text-zinc-800">
			<div className="relative h-[150px] w-full flex-shrink-0 overflow-hidden bg-zinc-900/50 lg:h-[250px]">
				<img
					className="absolute start-0 top-0 size-full object-cover"
					src={frontmatter.thumbnail}
					alt="Post Thumbnail"
				/>
			</div>
			<div className="my-2 grid">
				<div className="mb-3 flex gap-5 text-xs uppercase tracking-wider">
					{frontmatter.tags.map((tag) => (
						<Link
							className="minimal-link w-fit hover:text-black"
							key={tag}
							href={`/posts?tag=${tag}`}
						>
							{tag}
						</Link>
					))}
				</div>
				<Link
					className="font-decoration text-xl font-normal text-black hover:text-zinc-500 lg:text-3xl"
					href={`/posts/${frontmatter.slug}`}
				>
					{frontmatter.title}
				</Link>
				<p className="font-sans text-xs font-light text-zinc-800 lg:text-sm">
					{frontmatter.description}
				</p>

				<div className="mt-3 flex place-items-center items-center gap-2 text-xs font-light italic text-zinc-800 lg:text-sm">
					<p>Published {formatDate(frontmatter.date, true)}</p>
					<p>•</p>
					<ViewCounter slug={frontmatter.slug} inc={false} />
				</div>
			</div>
		</div>
	)
}

export default PostPreview

import { Metadata } from 'next'
import CountUp from 'react-countup'

import Button from '@components/Common/Button'
import Count from '@components/Utils/Count'
import siteMetadata from '@data/siteMetadata.json'
import { getMarkdownCounts } from '@libs/markdown'
import { count } from '@services/view'

const metadata = siteMetadata.internalLinks.find(
	(link) => link.title === 'Home'
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

const Home = async () => {
	const viewCount = await count()
	const markdownCount = getMarkdownCounts()

	const counts: { name: string; num: number }[] = [
		{
			name: 'Total posts',
			num: markdownCount,
		},
		{
			name: 'Total views',
			num: viewCount,
		},
	]

	return (
		<>
			<div className="flex items-center justify-between gap-5">
				<div className="flex flex-col">
					<div className="flex place-items-center items-center justify-between gap-2">
						<div className="flex flex-col">
							<p className="font-display text-3xl font-light lg:text-5xl xl:text-7xl">
								SnowyField
							</p>
							<p className="mt-2 flex h-full flex-col gap-0 font-sans text-2xs font-extralight lg:mt-5 lg:flex-row lg:gap-5 lg:text-base xl:text-lg">
								<span>SMART CONTRACT ENGINEER</span>
								<span className="w-min border-[0.5px] border-zinc-900"></span>
								<span>FULLSTACK DEVELOPER</span>
							</p>
						</div>
						<img
							src="/static/signature.png"
							className="block w-1/2 lg:hidden"
							alt="signature"
						/>
					</div>
					<hr className="my-10 h-min w-1/3 border border-zinc-900" />
					<p className="flex flex-col gap-5 font-display text-sm font-light lg:text-base xl:text-lg">
						Welcome to my space on the internet, where I share my thoughts,
						experiences and everything in between.
					</p>
				</div>
				<img
					src="/static/signature.png"
					className="hidden w-2/5 lg:block"
					alt="signature"
				/>
			</div>
			<div className="mt-5 flex w-full flex-col gap-5 font-display">
				<div className="flex w-full place-items-center items-center border-y border-zinc-900 py-5">
					{counts.map((count) => (
						<Count key={count.name} name={count.name} num={count.num} />
					))}
				</div>
				<div className="flex w-full justify-end">
					<Button
						variant="text"
						arrow="right"
						href="/posts"
						className="mx-0 font-display text-sm font-light lg:text-base xl:text-lg"
					>
						read my articles
					</Button>
				</div>
			</div>
			<div className="flex flex-col  gap-5 lg:gap-8 xl:gap-10">
				<p className="font-display text-2xl font-normal lg:text-3xl xl:text-4xl">
					About me
				</p>
				<p className="flex flex-col gap-3 font-display text-sm font-light text-zinc-700 lg:text-base xl:text-lg">
					<span>
						{`As a Fullstack Developer and Smart Contract Engineer, I'm passionate about Science, Mathematics, Researching and always looking to learn new things.`}
					</span>
					<span>
						{`I'm currently working on a few projects related to Blockchain and Cryptography for my organization ArismLab and some freelance projects in aboard.`}
					</span>
					<span>
						{`Besides I'm also pursuing a Bachelor's degree in Information Security at the University of Science - VNUHCM.`}
					</span>
				</p>
				<div className="flex w-full justify-end">
					<Button
						variant="text"
						arrow="right"
						href="/profile"
						className="mx-0 font-display text-sm font-light lg:text-base xl:text-lg"
					>
						view more about me
					</Button>
				</div>
			</div>
			<div className="flex flex-col gap-5 lg:gap-8 xl:gap-10">
				<p className="font-display text-2xl font-normal lg:text-3xl xl:text-4xl">
					About this site
				</p>
				<p className="flex flex-col gap-3 font-display text-sm font-light text-zinc-700 lg:text-base xl:text-lg">
					<span>This site functions as a blog/portfolio.</span>
					<span>
						Technology stack: Next.js (frontend and backend), MongoDB (database)
						and Tailwind CSS (styling).
					</span>
					<span>
						Fonts: Sarabun (sans-serif), Noto Serif JP (serif), Cormorant SC
						(heading) and Playfair Display (display).
					</span>
				</p>
				<div className="flex w-full justify-end">
					<Button
						variant="text"
						arrow="right"
						href={siteMetadata.siteRepo}
						className="mx-0 font-display text-sm font-light lg:text-base xl:text-lg"
					>
						check out the source code
					</Button>
				</div>
			</div>
		</>
	)
}

export default Home

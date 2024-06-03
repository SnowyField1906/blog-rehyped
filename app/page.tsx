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
					<p className="font-display text-7xl font-light">SnowyField</p>
					<p className="mt-5 flex h-full gap-5 font-sans text-lg font-extralight">
						<span>SMART CONTRACT ENGINEER</span>
						<span className="w-min border-[0.5px] border-zinc-900"></span>
						<span>FULLSTACK DEVELOPER</span>
					</p>
					<hr className="my-10 h-min w-1/3 border border-zinc-900" />
					<p className="flex flex-col gap-5 font-display text-xl font-light">
						Welcome to my space on the internet, where I share my thoughts,
						experiences and everything in between.
					</p>
				</div>
				<img src="/static/signature.png" className="w-2/5" alt="signature" />
			</div>
			<div className="mt-5 flex w-full flex-col gap-5 font-display text-5xl font-light">
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
						className="mx-0 font-display font-light"
					>
						read my articles
					</Button>
				</div>
			</div>
			<div className="flex flex-col gap-10">
				<p className=" font-display text-5xl font-normal">About Me</p>
				<p className="flex flex-col gap-3 font-display text-lg font-light">
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
						className="mx-0 font-display font-light"
					>
						view more about me
					</Button>
				</div>
			</div>
		</>
	)
}

export default Home

import { Metadata } from 'next'
import { Session } from 'next-auth'

import Button from '@components/Common/Button'
import siteMetadata from '@data/siteMetadata.json'
import { auth } from '@libs/auth'

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
	return (
		<main className="m-auto flex h-full w-11/12 flex-col place-items-center items-center gap-10 lg:w-3/4">
			<div className="flex items-center justify-between gap-5">
				<div className="flex flex-col">
					<p className="font-display text-7xl font-light">SnowyField</p>
					<p className="mt-5 flex h-full gap-5 font-sans text-lg font-extralight">
						<span>BLOCKCHAIN DEVELOPER</span>
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
			<p className="mb-5 mt-20 text-center font-display text-5xl font-light">
				About Me
			</p>
			<p className="flex flex-col gap-5 font-display text-xl font-light">
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
		</main>
	)
}

export default Home

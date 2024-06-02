import { Metadata } from 'next'
import React from 'react'

import Button from '@components/Common/Button'
import Heading from '@components/Common/Heading'
import siteMetadata from '@data/siteMetadata.json'

const metadata = siteMetadata.internalLinks.find(
	(link) => link.title === 'About'
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

const About = () => {
	return (
		<main className="m-auto flex h-full w-11/12 flex-col place-items-center items-center gap-10 py-16 lg:w-3/4">
			<Heading heading={metadata!.description} />
			<div className="flex flex-col justify-center gap-10 text-center">
				<p className="font-decoration text-2xl font-extralight text-zinc-700">
					{`I'm SnowyField. Reach out to me at `}
					<Button
						href="https://snowyfield.me"
						variant="text"
						arrow="right"
						className="font-decoration text-2xl font-extralight text-zinc-400 hover:text-zinc-700"
					>
						snowyfield.me
					</Button>
				</p>
			</div>
		</main>
	)
}

export default About

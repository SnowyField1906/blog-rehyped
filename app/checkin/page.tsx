import { Metadata } from 'next'
import { Session } from 'next-auth'
import React from 'react'

import Heading from '@components/Common/Heading'
import CheckInMessage from '@components/Utils/CheckInMessage'
import MessageInput from '@components/Utils/MessageInput'
import siteMetadata from '@data/siteMetadata.json'
import { auth } from '@libs/auth'
import { findAll } from '@services/checkin'

const metadata = siteMetadata.internalLinks.find(
	(link) => link.title === 'Checkin'
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

const About = async () => {
	const session: Session | null = await auth()
	const checkIns: CheckIn[] = await findAll()

	return (
		<main className="m-auto flex h-full w-11/12 flex-col place-items-center items-center gap-10 py-16 lg:w-3/4">
			<Heading heading={metadata!.description} />
			<MessageInput session={session} />
			<div className="flex flex-col justify-center gap-10 text-center">
				{checkIns.map((checkIn, index) => (
					<>
						<CheckInMessage
							key={index}
							email={session?.user?.email}
							checkIn={checkIn}
							reverse={index % 2 === 0}
						/>
						{index !== checkIns.length - 1 && (
							<div className="flex-col -space-y-5">
								<p className="text-4xl text-zinc-900">•</p>
								<div className="mx-auto h-28 w-min border border-zinc-900"></div>
								<p className="text-4xl text-zinc-900">•</p>
							</div>
						)}
					</>
				))}
			</div>
		</main>
	)
}

export default About

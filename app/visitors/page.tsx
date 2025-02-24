import { Metadata } from 'next'
import { Session } from 'next-auth'
import React from 'react'

import Title from '@components/Common/Title'
import MessageInput from '@components/Visitors/MessageInput'
import VisitorMessage from '@components/Visitors/VisitorMessage'
import siteMetadata from '@data/siteMetadata.json'
import { auth } from '@libs/auth'
import { findAll } from '@services/visitor'

export const maxDuration = 60

const metadata = siteMetadata.internalLinks.find(
	(link) => link.title === 'Visitors'
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

const Visitor = async () => {
	const session: Session | null = await auth()
	const visitors: Visitor[] = await findAll()

	return (
		<>
			<Title primary={metadata!.title} secondary={metadata!.description} />
			<MessageInput session={session} />
			<div className="flex flex-col justify-center gap-4 text-center">
				{visitors.map((visitor, index) => (
					<>
						<VisitorMessage
							key={index}
							email={session?.user?.email}
							visitor={visitor}
							reverse={index % 2 === 0}
						/>
						{index !== visitors.length - 1 && (
							<>
								<div className="hidden flex-col -space-y-4 lg:flex">
									<p className="text-2xl text-zinc-900">•</p>
									<div className="mx-auto h-20 w-min border border-zinc-900"></div>
									<p className="text-2xl text-zinc-900">•</p>
								</div>
								<hr className="mx-auto h-min w-1/2 border-[0.5px] border-zinc-500 lg:hidden" />
							</>
						)}
					</>
				))}
			</div>
		</>
	)
}

export default Visitor

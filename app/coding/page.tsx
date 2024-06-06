import { Metadata } from 'next'
import React from 'react'

import Title from '@components/Common/Title'
import CodingHistory from '@components/Github/CodingHistory'
import GithubProfile from '@components/Github/GithubProfile'
import PieStats from '@components/Github/PieStats'
import siteMetadata from '@data/siteMetadata.json'
import { getUser } from '@libs/github'
import { getInsights, getStats } from '@libs/wakatime'

const metadata = siteMetadata.internalLinks.find(
	(link) => link.title === 'Coding'
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

const Coding = async () => {
	const [
		user,
		insightsDays,
		insightsWeekdays,
		insightsOperatingSystems,
		insightsEditors,
	] = await Promise.all([
		getUser(),
		getInsights('days'),
		getInsights('weekdays'),
		getInsights('operating_systems'),
		getInsights('editors'),
	])

	return (
		<>
			<Title
				primary={metadata!.title}
				secondary={metadata!.description}
				type="activity"
			/>
			<div className="flex flex-col justify-center gap-14 text-center lg:gap-20">
				<GithubProfile user={user} />
				<PieStats
					weekdays={insightsWeekdays}
					operatingSystems={insightsOperatingSystems}
					editors={insightsEditors}
				/>
				<CodingHistory days={insightsDays} />
			</div>
		</>
	)
}

export default Coding

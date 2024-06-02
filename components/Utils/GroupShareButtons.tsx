'use client'

import siteMetadata from '@data/siteMetadata.json'

const GroupShareButtons = ({ title, slug }) => {
	const postUrl = `${siteMetadata.siteUrl}/posts/${slug}`

	return (
		<div className="group fixed bottom-5 left-1 mr-auto grid w-fit place-items-center gap-3 lg:bottom-10 lg:left-10">
			<p className="invisible select-none text-sm font-light text-zinc-700 group-hover:visible">
				SHARE VIA
			</p>
		</div>
	)
}

export default GroupShareButtons

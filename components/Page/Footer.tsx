import React from 'react'

import Newsletter from '@components/Utils/Newsletter'
import NowPlaying from '@components/Utils/NowPlaying'

const Footer = () => {
	return (
		<div className="w-full">
			<hr className="h-min border-[0.5px] border-zinc-900" />

			<footer className="grid w-full gap-3 p-8 lg:px-20">
				<div className="flex w-full justify-between font-display text-xl font-light">
					<p>Register for the newsletter</p>
					<p>{`Spotify streaming activity`}</p>
				</div>
				<div className="flex w-full justify-between">
					<Newsletter />
					<NowPlaying />
				</div>
				<p className="w-full text-center font-sans text-base font-extralight">{`${new Date().getFullYear()} © SnowyField. All rights reserved.`}</p>
			</footer>
		</div>
	)
}

export default Footer

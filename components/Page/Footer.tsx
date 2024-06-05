import React from 'react'

import NowPlaying from '@components/Spotify/NowPlaying'
import Newsletter from '@components/Utils/Newsletter'

const Footer = () => {
	return (
		<div className="w-full font-display text-base font-light lg:text-lg xl:text-xl">
			{/* <hr className="h-min border-[0.5px] border-zinc-900" /> */}

			<footer className="grid w-full gap-5 p-8 text-center lg:hidden lg:px-20">
				<div className="grid place-items-center items-center">
					<NowPlaying />
				</div>
				<div className="grid place-items-center items-center gap-1">
					<p>Register for the newsletter</p>
					<Newsletter />
				</div>
				{/* <p className="w-full font-sans text-xs font-extralight lg:text-sm xl:text-base">{`${new Date().getFullYear()} © SnowyField. All rights reserved.`}</p> */}
			</footer>

			<footer className="hidden w-full gap-3 p-8 lg:grid lg:px-20">
				<div className="flex w-full justify-between">
					<p>Register for the newsletter</p>
					<p>Spotify streaming activity</p>
				</div>
				<div className="flex w-full justify-between">
					<Newsletter />
					<NowPlaying />
				</div>
				{/* <p className="w-full text-center font-sans text-xs font-extralight lg:text-sm xl:text-base">{`${new Date().getFullYear()} © SnowyField. All rights reserved.`}</p> */}
			</footer>
		</div>
	)
}

export default Footer

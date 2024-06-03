import React from 'react'

import NowPlaying from '@components/Utils/NowPlaying'

const Footer = () => {
	return (
		<div>
			<hr className="h-min border-[0.5px] border-zinc-900" />
			<footer className="flex w-full place-items-center items-center justify-between gap-5 p-10 text-center">
				<div className="flex flex-col gap-5">
					<p className="font-display text-2xl font-light">
						Register for the newsletter
					</p>
					<div className="flex gap-2">
						<input
							type="email"
							placeholder="Enter your email"
							className="w-full border border-zinc-900 bg-zinc-100 p-2"
						/>
						<button className="transform border border-zinc-900 p-2 transition-colors duration-200 ease-in-out hover:bg-zinc-900 hover:text-white">
							subscribe
						</button>
					</div>
				</div>
				<p className="font-sans text-sm font-extralight">{`${new Date().getFullYear()} © SnowyField. All rights reserved.`}</p>
				<div className="flex flex-col justify-end gap-5">
					<p className="text-right font-display text-2xl font-light">
						SnowyField is streaming...
					</p>
					<div className="ml-auto">
						<NowPlaying />
					</div>
				</div>
			</footer>
		</div>
	)
}

export default Footer

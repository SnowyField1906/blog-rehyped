import React from 'react'

import Button from '@components/Common/Button'
import Count from '@components/Utils/Count'

const SpotifyProfile = ({ user }) => {
	const counts: { name: string; num: number }[] = [
		{
			name: 'Followers',
			num: user.followers.total,
		},
		{
			name: 'Followings',
			num: user.followings.total,
		},
		{
			name: 'Playlists',
			num: user.playlists.total,
		},
	]

	return (
		<div className="flex w-full flex-col justify-between gap-10 lg:flex-row">
			<div className="flex items-center gap-5">
				<img
					src={user.images[1].url}
					alt="Spotify Profile"
					className="h-20 w-20 lg:h-28 lg:w-28 xl:h-36 xl:w-36 "
				/>
				<div className="my-auto flex flex-col gap-0 lg:gap-2">
					<p className="text-left font-display text-3xl text-zinc-900 lg:text-4xl xl:text-5xl">
						{user.display_name}
					</p>
					<p className="text-left font-sans text-xs font-light text-zinc-900 lg:text-sm xl:text-base">
						Vietnam / Premium
					</p>
					<div className="mr-auto w-min place-self-start">
						<Button
							variant="text"
							arrow="right"
							href={user.external_urls.spotify}
							className="mx-0 mr-auto p-0 font-light text-zinc-500 hover:text-zinc-900"
						>
							Open in Spotify
						</Button>
					</div>
				</div>
			</div>
			<div className="flex w-full place-items-center items-center border-y border-zinc-900 py-3 lg:w-1/2 lg:py-4 xl:py-5">
				{counts.map((count) => (
					<Count key={count.name} name={count.name} num={count.num} />
				))}
			</div>
		</div>
	)
}

export default SpotifyProfile

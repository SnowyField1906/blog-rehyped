'use client'

import { useEffect, useState } from 'react'

import Button from '@components/Common/Button'
import cn from '@libs/class'
import { getTopArtists } from '@libs/spotify'

const TopArtists = ({ artists }) => {
	const [artistsState, setArtistsState] = useState(artists)

	useEffect(() => {
		;(async () => {
			for (const [range, artist] of Object.entries(artists)) {
				if ((artist as any)?.error) {
					const a = await getTopArtists(
						`${range}_term` as 'short_term' | 'medium_term' | 'long_term',
						5
					)
					setArtistsState((artistsState) => ({
						...artistsState,
						[range]: a,
					}))
				}
			}
		})()
	}, [])

	const ranges = [
		{ id: 'short', name: 'Last 4 weeks' },
		{ id: 'medium', name: 'Last 6 months' },
		{ id: 'long', name: 'Last 1 year' },
	]
	const [range, setRange] = useState('short')

	return (
		<div className="mx-auto flex w-full flex-col justify-center gap-10 xl:w-3/4 ">
			<p className="text-center font-display text-xl text-zinc-900 lg:text-2xl xl:text-3xl">
				Most listened artists
			</p>
			<div className="mx-auto flex place-items-center items-center gap-2">
				{ranges.map(({ id, name }) => (
					<Button
						key={id}
						size="base"
						variant={id === range ? 'primary' : 'secondary'}
						onClick={() => setRange(id)}
					>
						{name}
					</Button>
				))}
			</div>
			<div className="mx-auto flex w-full place-items-center items-center">
				{[4, 2, 0, 1, 3]
					.map((index) => artistsState[range]?.items[index])
					.map((artist, index) => (
						<a
							key={artist.id}
							className="mx-auto flex w-fit flex-col place-items-center items-center gap-2"
							href={artist.external_urls.spotify}
							target="_blank"
							rel="noopener noreferrer"
						>
							<img
								src={artist.images[2].url}
								alt={artist.name}
								className={cn(
									'h-8 w-8 rounded-full lg:h-14 lg:w-14 xl:h-24 xl:w-24',
									(index === 1 || index === 3) &&
										'h-14 w-14 lg:h-24 lg:w-24 xl:h-32 xl:w-32',
									index === 2 && 'h-24 w-24 lg:h-32 lg:w-32 xl:h-44 xl:w-44'
								)}
							/>
							<span
								className={cn(
									'text-center font-display text-2xs text-zinc-700 lg:text-xs xl:text-sm',
									(index === 1 || index === 3) &&
										'text-xs font-medium lg:text-sm xl:text-base',
									index === 2 && 'text-sm font-medium lg:text-base xl:text-lg'
								)}
							>
								{artist.name}
							</span>
						</a>
					))}
			</div>
		</div>
	)
}

export default TopArtists

'use client'

import { useEffect, useState } from 'react'

import Button from '@components/Common/Button'
import Track from '@components/Spotify/Track'
import { getTopTracks } from '@libs/spotify'

const TopTracks = ({ tracks }) => {
	const [tracksState, setTrackState] = useState(tracks)

	const ranges = [
		{ id: 'short', name: 'Last 4 weeks' },
		{ id: 'medium', name: 'Last 6 months' },
		{ id: 'long', name: 'Last 1 year' },
	]

	useEffect(() => {
		;(async () => {
			for (const range of ['short', 'medium', 'long']) {
				const t = await getTopTracks(
					`${range}_term` as 'short_term' | 'medium_term' | 'long_term',
					50
				)
				setTrackState((tracksState) => ({
					...tracksState,
					[range]: t,
				}))
			}
		})()
	}, [])

	const [range, setRange] = useState('short')
	const [limit, setLimit] = useState(10)

	return (
		<div className="mx-auto flex w-full flex-col justify-center gap-10 lg:w-3/4">
			<p className="text-center font-display text-xl text-zinc-900 lg:text-2xl xl:text-3xl">
				Most listened tracks
			</p>
			<div className="mx-auto flex place-items-center items-center gap-2 lg:gap-4">
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
			<div className="mx-auto mr-auto flex w-full flex-col justify-start gap-6 xl:w-2/3">
				{tracksState[range].items.slice(0, limit).map((track, index) => (
					<Track key={track.id} track={track} index={index} />
				))}
				{limit < tracksState[range].items.length ? (
					<Button
						className="mx-auto"
						variant="secondary"
						onClick={() => setLimit((prev) => prev + 10)}
					>
						Load more
					</Button>
				) : (
					<Button
						className="mx-auto"
						variant="primary"
						onClick={() => setLimit(10)}
					>
						Collapse all
					</Button>
				)}
			</div>
		</div>
	)
}

export default TopTracks

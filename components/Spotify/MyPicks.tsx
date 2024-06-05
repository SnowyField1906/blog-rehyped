'use client'

import { useEffect, useState } from 'react'

import Button from '@components/Common/Button'
import Track from '@components/Spotify/Track'
import siteMetadata from '@data/siteMetadata.json'
import { getPlaylist } from '@libs/spotify'

const MyPicks = ({ playlists }) => {
	const [playlistsState, setPlaylistsState] = useState(playlists)

	useEffect(() => {
		;(async () => {
			let i = 0
			for (const [type, playlist] of Object.entries(playlists)) {
				if ((playlist as any)?.error) {
					const p = await getPlaylist(siteMetadata.playlists[i].id)
					setPlaylistsState((playlistsState) => ({
						...playlistsState,
						[type]: p,
					}))
				}
				i++
			}
		})()
	}, [])

	const [type, setType] = useState('essentials')

	return (
		<div className="mx-auto flex w-full flex-col justify-center gap-10 lg:w-3/4">
			<p className="font-display text-xl text-zinc-900 lg:text-2xl xl:text-3xl">
				My music taste
			</p>
			<div className="mx-auto flex place-items-center items-center gap-2 lg:gap-4">
				{Object.entries(playlistsState).map(([t, playlist]) => (
					<Button
						key={t}
						size="base"
						variant={t === type ? 'primary' : 'secondary'}
						onClick={() => setType(t)}
					>
						{(playlist as any).name}
					</Button>
				))}
			</div>
			<div className="mx-auto mr-auto flex w-full flex-col justify-start gap-6 xl:w-2/3">
				<p>
					<span className="font-display text-xs text-zinc-900 lg:text-sm xl:text-base">
						{playlistsState[type]?.description}
					</span>
					<Button
						variant="text"
						size="base"
						arrow="right"
						className="mx-2 font-display"
						href={playlistsState[type]?.external_urls?.spotify}
					>
						Open in Spotify
					</Button>
				</p>
				{(playlistsState[type]?.tracks?.items ?? []).map(({ track }, index) => (
					<Track key={track.id} track={track} index={index} />
				))}
			</div>
		</div>
	)
}

export default MyPicks

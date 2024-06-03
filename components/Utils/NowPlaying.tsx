import React from 'react'
import { PiVinylRecordFill } from 'react-icons/pi'

import cn from '@libs/class'
import { getNowPlaying } from '@libs/spotify'

const NowPlaying = async () => {
	const song = await getNowPlaying()

	return (
		<a
			className="inline-flex w-full max-w-full flex-col place-items-center items-center gap-3 truncate text-lg sm:flex-row"
			href={song.is_playing ? song.item.external_urls.spotify : undefined}
			target="_blank"
			rel="noopener noreferrer"
		>
			<PiVinylRecordFill
				className={cn(
					'h-10 w-10 text-zinc-900',
					song.is_playing && 'animate-[spin_3s_linear_infinite]'
				)}
			/>
			<p className="capsize font-medium text-zinc-500">
				{song.is_playing ? song.item.name : 'Not Playing'}
			</p>
			<p className="capsize max-w-max truncate text-zinc-500">
				{song.is_playing
					? song?.item.artists.map((_artist) => _artist.name).join(', ')
					: 'Spotify'}
			</p>
		</a>
	)
}

export default NowPlaying

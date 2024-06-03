'use client'

import { useEffect, useState } from 'react'
import { PiVinylRecordFill } from 'react-icons/pi'

import cn from '@libs/class'
import { getNowPlaying } from '@libs/spotify'

const NowPlaying = () => {
	const [song, setSong] = useState<any | undefined>(undefined)

	const fetchNowPlaying = async () => {
		const song = await getNowPlaying()
		setSong(song)
	}

	useEffect(() => {
		fetchNowPlaying()
	}, [])

	useEffect(() => {
		if (!song) return

		const remainingTime: number = song!.item!.duration_ms - song!.progress_ms

		let timeoutId: NodeJS.Timeout | null = null
		if (remainingTime > 0) {
			timeoutId = setTimeout(() => {
				fetchNowPlaying()
			}, remainingTime)
		}

		return () => {
			if (timeoutId) clearTimeout(timeoutId)
		}
	}, [song])

	return (
		<a
			className="flex w-min place-items-center items-center gap-3 truncate font-sans text-sm lg:text-base xl:text-lg"
			href={song?.is_playing ? song.item.external_urls.spotify : undefined}
			target="_blank"
			rel="noopener noreferrer"
		>
			<PiVinylRecordFill
				className={cn(
					'h-8 w-8 text-zinc-900 lg:h-10 lg:w-10',
					song?.is_playing && 'animate-[spin_3s_linear_infinite]'
				)}
			/>
			<p
				className={cn(
					'truncate font-medium',
					song?.is_playing && 'text-zinc-900',
					!song?.is_playing && 'text-zinc-900'
				)}
			>
				{song?.is_playing ? song.item.name : 'Not Playing'}
			</p>
			{song?.is_playing && (
				<p className="truncate text-zinc-500">
					{song?.item.artists.map((_artist) => _artist.name).join(', ')}
				</p>
			)}
		</a>
	)
}

export default NowPlaying

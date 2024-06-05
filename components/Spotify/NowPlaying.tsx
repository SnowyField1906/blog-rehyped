'use client'

import { useEffect, useState } from 'react'
import { PiVinylRecordFill } from 'react-icons/pi'

import cn from '@libs/class'
import { getNowPlaying } from '@libs/spotify'

const NowPlaying = ({
	hideOnOff,
	text,
	pulse,
}: {
	hideOnOff?: boolean
	text?: boolean
	pulse?: boolean
}) => {
	const [song, setSong] = useState<any | undefined>(undefined)

	const fetchNowPlaying = async () => {
		try {
			const song = await getNowPlaying()
			setSong(song)
		} catch {
			setSong({ item: { duration_ms: 30_000, progress_ms: 0 } })
		}
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

	if (hideOnOff && !song?.is_playing) return null

	return (
		<div className={cn('flex items-center', pulse && 'animate-pulse')}>
			{text && (
				<p className=" mr-3 animate-pulse text-base lg:text-lg xl:text-xl">
					Streaming now
				</p>
			)}
			<a
				className="flex w-min place-items-center items-center gap-3 truncate text-sm lg:text-base xl:text-lg"
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
		</div>
	)
}

export default NowPlaying

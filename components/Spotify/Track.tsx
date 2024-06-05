import React from 'react'

const Track = ({ track, index }) => {
	return (
		<a
			key={track.id}
			className="flex w-fit place-items-center items-center gap-2 truncate lg:gap-4"
			target="_blank"
			rel="noopener noreferrer"
			href={track.external_urls.spotify}
		>
			<p className="w-10 text-xs font-light text-zinc-600 lg:text-sm xl:text-base">
				{index + 1}
			</p>
			<img
				src={track.album.images[2].url}
				alt={track.name}
				className="w-10 rounded-lg lg:w-14 xl:w-16"
			/>
			<div className="flex w-[80vw] flex-col overflow-hidden text-left lg:w-min">
				<p className="truncate font-display text-sm font-medium text-zinc-900 lg:text-base xl:text-lg">
					{track.name}
				</p>
				<p className="truncate text-xs font-light text-zinc-600 lg:text-sm xl:text-base">
					{track.artists.map((artist) => artist.name).join(', ')}
				</p>
			</div>
		</a>
	)
}

export default Track

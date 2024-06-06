import { Metadata } from 'next'
import React from 'react'

import Title from '@components/Common/Title'
import MyPicks from '@components/Spotify/MyPicks'
import NowPlaying from '@components/Spotify/NowPlaying'
import SpotifyProfile from '@components/Spotify/SpotifyProfile'
import TopArtists from '@components/Spotify/TopArtists'
import TopTracks from '@components/Spotify/TopTracks'
import siteMetadata from '@data/siteMetadata.json'
import {
	getAccessToken,
	getPlaylist,
	getTopArtists,
	getTopTracks,
	getUser,
} from '@libs/spotify'

const metadata = siteMetadata.internalLinks.find(
	(link) => link.title === 'Music'
)

export const generateMetadata = (): Metadata => {
	return {
		metadataBase: new URL(siteMetadata.siteUrl),
		title: metadata!.title + ' | ' + siteMetadata.headerTitle,
		description: metadata!.description,
		openGraph: {
			images: [siteMetadata.siteUrl + siteMetadata.siteBanner],
		},
	}
}

const Music = async () => {
	const token = await getAccessToken()

	const [
		user,
		topArtistsShort,
		topArtistsMedium,
		topArtistsLong,
		topTracksShort,
		topTracksMedium,
		topTracksLong,
		essentialsPlaylist,
		featuresPlaylist,
		freshPicksPlaylist,
	] = await Promise.all([
		getUser(token),
		getTopArtists('short_term', 5, token),
		getTopArtists('medium_term', 5, token),
		getTopArtists('long_term', 5, token),
		getTopTracks('short_term', 50, token),
		getTopTracks('medium_term', 50, token),
		getTopTracks('long_term', 50, token),
		getPlaylist(siteMetadata.playlists[0].id, token),
		getPlaylist(siteMetadata.playlists[1].id, token),
		getPlaylist(siteMetadata.playlists[2].id, token),
	])

	return (
		<>
			<Title
				primary={metadata!.title}
				secondary={metadata!.description}
				type="activity"
			/>
			<NowPlaying pulse hideOnOff text />
			<SpotifyProfile user={user} />
			<TopArtists
				artists={{
					short: topArtistsShort,
					medium: topArtistsMedium,
					long: topArtistsLong,
				}}
			/>
			<TopTracks
				tracks={{
					short: topTracksShort,
					medium: topTracksMedium,
					long: topTracksLong,
				}}
			/>
			<MyPicks
				playlists={{
					essentials: essentialsPlaylist,
					features: featuresPlaylist,
					freshPicks: freshPicksPlaylist,
				}}
			/>
		</>
	)
}

export default Music

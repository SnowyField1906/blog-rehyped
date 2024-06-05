import { serializeParams } from '@libs/api'

const basic = Buffer.from(
    `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
).toString('base64')

export const getAccessToken = async () => {
    const response = await fetch(
        `https://accounts.spotify.com/api/token?${serializeParams({
            grant_type: 'refresh_token',
            refresh_token: process.env.SPOTIFY_REFRESH_TOKEN,
        })}`,
        {
            method: 'POST',
            headers: {
                Authorization: `Basic ${basic}`,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        }
    )

    return response.json()
}

export const getNowPlaying = async () => {
    const { access_token } = await getAccessToken()

    const response = await fetch(
        'https://api.spotify.com/v1/me/player/currently-playing',
        {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        }
    )

    return response.json()
}

export const getTopTracks = async (
    time_range: 'short_term' | 'medium_term' | 'long_term',
    limit?: number,
    token?: any
) => {
    const { access_token } = token || (await getAccessToken())

    const response = await fetch(
        `https://api.spotify.com/v1/me/top/tracks?${serializeParams({ time_range, limit })}`,
        {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        }
    )

    return response.json()
}

export const getTopArtists = async (
    time_range: 'short_term' | 'medium_term' | 'long_term',
    limit?: number,
    token?: any
) => {
    const { access_token } = token || (await getAccessToken())

    const response = await fetch(
        `https://api.spotify.com/v1/me/top/artists?${serializeParams({ time_range, limit })}`,
        {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        }
    )

    return response.json()
}

export const getUserProfile = async (token?: any) => {
    const { access_token } = token || (await getAccessToken())

    const user = fetch('https://api.spotify.com/v1/me', {
        headers: {
            Authorization: `Bearer ${access_token}`,
        },
    })

    const followings = fetch(
        'https://api.spotify.com/v1/me/following?type=artist',
        {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        }
    )

    const playlists = fetch('https://api.spotify.com/v1/me/playlists', {
        headers: {
            Authorization: `Bearer ${access_token}`,
        },
    })

    const response = await Promise.all([user, followings, playlists]).then(
        (responses) => Promise.all(responses.map((response) => response.json()))
    )

    return {
        ...response[0],
        followings: response[1].artists,
        playlists: response[2],
    }
}

export const getPlaylist = async (id: string, token?: any) => {
    const { access_token } = token || (await getAccessToken())

    const response = await fetch(`https://api.spotify.com/v1/playlists/${id}`, {
        headers: {
            Authorization: `Bearer ${access_token}`,
        },
    })

    return response.json()
}

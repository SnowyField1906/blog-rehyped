import querystring from 'querystring'

const basic = Buffer.from(
    `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
).toString('base64')

const NOW_PLAYING_API = `https://api.spotify.com/v1/me/player/currently-playing`
const TOKEN_API = `https://accounts.spotify.com/api/token`
const TOP_TRACKS_API = `https://api.spotify.com/v1/me/top/tracks`

const getAccessToken = async () => {
    const response = await fetch(TOKEN_API, {
        method: 'POST',
        headers: {
            Authorization: `Basic ${basic}`,
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: querystring.stringify({
            grant_type: 'refresh_token',
            refresh_token: process.env.SPOTIFY_REFRESH_TOKEN,
        }),
    })

    return response.json()
}

export const getNowPlaying = async () => {
    const { access_token } = await getAccessToken()

    const response = await fetch(NOW_PLAYING_API, {
        headers: {
            Authorization: `Bearer ${access_token}`,
        },
    })

    return response.json()
}

export const getTopTracks = async (time_range, limit) => {
    const { access_token } = await getAccessToken()

    const response = await fetch(
        `${TOP_TRACKS_API}?${querystring.stringify({ time_range, limit })}`,
        {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        }
    )

    return response.json()
}

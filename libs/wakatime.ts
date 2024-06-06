const basic = Buffer.from(`${process.env.WAKATIME_API_KEY}`).toString('base64')

export const getStats = async (
    range: 'last_30_days' | 'last_6_months' | 'last_year' | 'all_time'
) => {
    const response = await fetch(
        `https://wakatime.com/api/v1/users/current/stats/${range}`,
        {
            headers: {
                Authorization: `Basic ${basic}`,
            },
        }
    )

    return response.json().then((res) => res.data)
}

export const getInsights = async (
    type: 'days' | 'weekdays' | 'operating_systems' | 'editors'
) => {
    const response = await fetch(
        `https://wakatime.com/api/v1/users/current/insights/${type}`,
        {
            headers: {
                Authorization: `Basic ${basic}`,
            },
        }
    )

    return response.json().then((res) => res.data[type])
}

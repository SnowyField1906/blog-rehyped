const username = 'SnowyField1906'

const basic = Buffer.from(`${username}:${process.env.GITHUB_TOKEN}`).toString(
    'base64'
)

export const getUser = async () => {
    const user = fetch(`https://api.github.com/users/${username}`, {
        next: {
            revalidate: 3600,
        },
        headers: {
            Authorization: `Basic ${basic}`,
        },
    })

    const repos = fetch(`https://api.github.com/user/repos?per_page=100`, {
        headers: {
            Authorization: `Basic ${basic}`,
        },
    })

    const response = await Promise.all([user, repos]).then((responses) =>
        Promise.all(responses.map((response) => response.json()))
    )

    return { ...response[0], repos: response[1].length }
}

export const getAllCommits = async () => {
    const response = await fetch(
        `https://api.github.com/users/${username}/received_events?per_page=100?page=3`,
        {
            next: {
                revalidate: 3600,
            },
            headers: {
                Authorization: `Basic ${basic}`,
            },
        }
    )

    const filteredCommits = await response
        .json()
        .then((res) =>
            res.filter(
                (event) =>
                    event.type === 'PushEvent' &&
                    event.repo.name !== 'SnowyField1906/SnowyField1906'
            )
        )

    return filteredCommits
}

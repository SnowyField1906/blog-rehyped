import { format } from 'timeago.js'

import siteMetadata from '@data/siteMetadata.json'

export const formatDate = (date, ago = false) => {
    let now

    if (ago) {
        now = format(date, siteMetadata.locale)
    } else {
        now = new Date(date).toLocaleDateString(siteMetadata.locale, {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        })
    }

    return now
}

export const convertDate = (date: string) => {
    const d = new Date(date)
    const year = d.getFullYear()
    const month = `${d.getMonth() + 1}`.padStart(2, '0')
    const day = `${d.getDate()}`.padStart(2, '0')

    return `${year}-${month}-${day}`
}

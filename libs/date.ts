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

export const formatDateTime = (date) => {
    return new Date(date).toLocaleString(siteMetadata.locale, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
    })
}

export const formatTime = (
    duration,
    hours = true,
    minutes = false,
    seconds = false
) => {
    let h = Math.floor(duration / 3600)
    let m = Math.floor((duration % 3600) / 60)
    let s = Math.floor(duration % 60)

    h = h < 10 ? 0 + h : h
    m = m < 10 ? 0 + m : m
    s = s < 10 ? 0 + s : s

    const string = `${hours ? h + ' hours' : ''} ${minutes ? m + ' minutes' : ''} ${seconds ? s + ' seconds' : ''}`

    return string.trim()
}

export const parseMonth = (timestamp) => {
    console.log(timestamp)
    const date = new Date(timestamp)

    return new Date(date).toLocaleString(siteMetadata.locale, {
        month: 'long',
    })
}

export const getDateFromDayOrder = (dayOrder) => {
    const date = new Date()
    const year = date.getFullYear()
    const days =
        365 - (year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0) ? 1 : 0)

    date.setDate(date.getDate() + dayOrder - days)

    return date
}

export const convertDate = (date: string) => {
    const d = new Date(date)
    const year = d.getFullYear()
    const month = `${d.getMonth() + 1}`.padStart(2, '0')
    const day = `${d.getDate()}`.padStart(2, '0')

    return `${year}-${month}-${day}`
}

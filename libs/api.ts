import { getSession } from 'next-auth/react'

import siteMetadata from '@data/siteMetadata.json'

const TOKEN_INFO_GOOGLE_API = 'https://www.googleapis.com/oauth2/v3/tokeninfo'
const TOKEN_GOOGLE_API = 'https://oauth2.googleapis.com/token'
const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? siteMetadata.siteUrl

const Fetcher = async (...args: Parameters<typeof fetch>) => {
    const res = await fetch(...args)
    return res.json()
}
export default Fetcher

export const serializeParams = (params: any): string => {
    const searchParams = new URLSearchParams()

    for (const key in params) {
        searchParams.append(key, params[key])
    }

    return searchParams.toString()
}

export const deserializeParams = (
    searchParams: URLSearchParams
): Record<string, string> => {
    const params: Record<string, string> = {}
    const entries: [string, string][] = Array.from(searchParams.entries())

    for (const [key, value] of entries) {
        params[key] = value
    }

    return params
}

export const verify = async (
    auth: string | null,
    email: string
): Promise<boolean> => {
    const res = await fetch(
        TOKEN_INFO_GOOGLE_API + '?id_token=' + auth!.replace('Bearer ', ''),
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        }
    )

    const deserialized = await res.json()

    return deserialized.email === email
}

export const deriveIdToken = async (): Promise<string> => {
    const token: any = await getSession().then((res: any) => res!.token)

    if (token && Date.now() < token.expires_at * 1000) {
        return token.id_token
    } else {
        const params = {
            client_id: process.env.GOOGLE_CLIENT_ID,
            client_secret: process.env.GOOGLE_CLIENT_SECRET,
            grant_type: 'refresh_token',
            refresh_token: token.refresh_token,
        }
        const newToken = await fetch(
            `${TOKEN_GOOGLE_API}?${serializeParams(params)}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        )
        const deserialized = await newToken.json()
        return deserialized.id_token
    }
}

export const GET = async (
    path: string,
    params?: any,
    auth: boolean = false
) => {
    let res

    if (auth) {
        const id_token = await deriveIdToken()

        res = await fetch(`${BASE_URL}${path}?${serializeParams(params)}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + id_token,
            },
            next: { revalidate: 0 },
        })
    } else {
        res = await fetch(`${BASE_URL}${path}?${serializeParams(params)}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            next: { revalidate: 0 },
        })
    }

    try {
        const deserialized = await res.json()
        return deserialized
    } catch {
        return null
    }
}

export const POST = async (
    path: string,
    params?: any,
    auth: boolean = false
) => {
    let res

    if (auth) {
        const id_token = await deriveIdToken()

        res = await fetch(`${BASE_URL}${path}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + id_token,
            },
            body: JSON.stringify(params),
        })
    } else {
        res = await fetch(`${BASE_URL}${path}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(params),
        })
    }

    try {
        const deserialized = await res.json()
        return deserialized
    } catch {
        return null
    }
}

export const PUT = async (
    path: string,
    params?: any,
    auth: boolean = false
) => {
    let res

    if (auth) {
        const id_token = await deriveIdToken()

        res = await fetch(`${BASE_URL}${path}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + id_token,
            },
            body: JSON.stringify(params),
        })
    } else {
        res = await fetch(`${BASE_URL}${path}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(params),
        })
    }

    try {
        const deserialized = await res.json()
        return deserialized
    } catch {
        return null
    }
}

export const DELETE = async (
    path: string,
    params?: any,
    auth: boolean = false
) => {
    let res

    if (auth) {
        const id_token = await deriveIdToken()

        res = await fetch(`${BASE_URL}${path}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + id_token,
            },
            body: JSON.stringify(params),
        })
    } else {
        res = await fetch(`${BASE_URL}${path}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(params),
        })
    }

    try {
        const deserialized = await res.json()
        return deserialized
    } catch {
        return null
    }
}

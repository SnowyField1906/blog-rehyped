import { NextRequest, NextResponse } from 'next/server'

import { deserializeParams } from '@libs/api'
import * as service from '@services/view'

export const maxDuration = 300

export const GET = async (req: NextRequest) => {
    const { slug } = deserializeParams(req.nextUrl.searchParams)

    if (slug) {
        const res = await service.find(slug)
        return NextResponse.json(res)
    } else {
        const res = await service.count()
        return NextResponse.json(res)
    }
}

export const POST = async (req: NextRequest) => {
    const { slug } = await req.json()

    const res = await service.increase(slug)

    if (!res) {
        return NextResponse.error()
    }

    return NextResponse.json(res)
}

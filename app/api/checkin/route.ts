import { NextRequest, NextResponse } from 'next/server'

import * as service from '@services/checkin'

export const GET = async () => {
    const res = await service.findAll()

    return NextResponse.json(res)
}

export const POST = async (req: NextRequest) => {
    const body = await req.json()

    const res = await service.add(body, req.headers.get('Authorization')!)

    if (!res) {
        return NextResponse.error()
    }

    return NextResponse.json(res)
}

export const PUT = async (req: NextRequest) => {
    const body = await req.json()

    const res = await service.edit(body, req.headers.get('Authorization')!)

    if (!res) {
        return NextResponse.error()
    }

    return NextResponse.json(res)
}

export const DELETE = async (req: NextRequest) => {
    const body = await req.json()

    const res = await service.remove(body, req.headers.get('Authorization')!)

    if (!res) {
        return NextResponse.error()
    }

    return NextResponse.json({ success: true })
}

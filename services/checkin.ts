import { verify } from '@libs/api'
import { connectDB } from '@libs/mongodb'
import CheckIn, { ICheckIn } from '@schemas/checkin'

export const findAll = async (): Promise<CheckIn[]> => {
    await connectDB()

    const checkIns: ICheckIn[] = await CheckIn.find().sort({ createdAt: -1 })
    return checkIns.map((checkIn) => checkIn.toObject())
}

export const add = async (
    checkIn: CheckIn,
    authorization: string
): Promise<boolean> => {
    const verified = await verify(authorization, checkIn.email)
    if (!verified) return false

    await connectDB()

    const checkInDb: ICheckIn = await CheckIn.create(checkIn)
    return !!checkInDb
}

export const edit = async (
    checkIn: CheckIn,
    authorization: string
): Promise<boolean> => {
    const verified = await verify(authorization, checkIn.email)
    if (!verified) return false

    await connectDB()

    const { content, ...rest } = checkIn

    const checkInDb: ICheckIn | null = await CheckIn.findOneAndUpdate(
        rest,
        checkIn,
        { new: true }
    )
    return !!checkInDb
}

export const remove = async (
    checkIn: CheckIn,
    authorization: string
): Promise<boolean> => {
    const verified = await verify(authorization, checkIn.email)
    if (!verified) return false

    await connectDB()

    const checkInDb: ICheckIn | null = await CheckIn.findOneAndDelete(checkIn)
    return !!checkInDb
}

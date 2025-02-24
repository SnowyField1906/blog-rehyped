import { verify } from '@libs/api'
import { connectDB } from '@libs/mongodb'
import Visitor, { IVisitor } from '@schemas/visitor'

export const findAll = async (): Promise<Visitor[]> => {
    await connectDB()

    const visitorDbs: IVisitor[] = await Visitor.find().sort({ createdAt: -1 })

    const visitors = visitorDbs.map((visitor) => {
        const { _id, ...rest } = visitor.toObject()
        return { ...rest }
    })
    return visitors
}

export const add = async (
    visitor: Visitor,
    authorization: string
): Promise<boolean> => {
    const verified = await verify(authorization, visitor.email)
    if (!verified) return false

    await connectDB()

    const visitorDb: IVisitor = await Visitor.create(visitor)
    return !!visitorDb
}

export const edit = async (
    visitor: Visitor,
    authorization: string
): Promise<boolean> => {
    const verified = await verify(authorization, visitor.email)
    if (!verified) return false

    await connectDB()

    const { content, ...rest } = visitor

    const visitorDb: IVisitor | null = await Visitor.findOneAndUpdate(
        rest,
        visitor,
        { new: true }
    )
    return !!visitorDb
}

export const remove = async (
    visitor: Visitor,
    authorization: string
): Promise<boolean> => {
    const verified = await verify(authorization, visitor.email)
    if (!verified) return false

    await connectDB()

    const visitorDb: IVisitor | null = await Visitor.findOneAndDelete(visitor)
    return !!visitorDb
}

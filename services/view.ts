import { connectDB } from '@libs/mongodb'
import View, { IView } from '@schemas/view'

export const find = async (slug: string): Promise<number | null> => {
    await connectDB()
    const viewDb: IView | null = await View.findOne({ slug })

    return viewDb?.count ?? null
}

export const increase = async (slug: string): Promise<number | null> => {
    await connectDB()
    const viewDb: IView | null = await View.findOneAndUpdate(
        { slug },
        { $inc: { count: 1 } },
        { new: true, upsert: true }
    )

    return viewDb?.count ?? null
}

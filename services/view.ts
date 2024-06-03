import { connectDB } from '@libs/mongodb'
import View, { IView } from '@schemas/view'

export const find = async (slug: string): Promise<number | null> => {
    await connectDB()
    const viewDb: IView | null = await View.findOne({ slug })

    return viewDb?.count ?? null
}

export const count = async (): Promise<number> => {
    await connectDB()
    const viewDb: IView[] = await View.find()

    return viewDb.reduce((acc, curr) => acc + curr.count, 0)
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

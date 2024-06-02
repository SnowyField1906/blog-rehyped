import { Document, Schema, model, models } from 'mongoose'

export interface IView extends Document, View {}

const ViewSchema = new Schema<IView>(
    {
        slug: { type: String, required: true },
        count: { type: Number, required: true, default: 0 },
    },
    { timestamps: true }
)

const View = models.View || model<IView>('View', ViewSchema)

export default View

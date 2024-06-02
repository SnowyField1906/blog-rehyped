import { Document, Schema, model, models } from 'mongoose'

export interface ICheckIn extends Document, CheckIn {}

const CheckInSchema = new Schema<ICheckIn>(
    {
        email: { type: String, required: true },
        name: { type: String, required: true },
        content: { type: String, required: true },
        createdAt: { type: String, required: true },
        updatedAt: { type: String, required: true },
    },
    { timestamps: true }
)

const CheckIn = models.CheckIn || model<ICheckIn>('CheckIn', CheckInSchema)

export default CheckIn

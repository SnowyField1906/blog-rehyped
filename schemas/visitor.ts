import { Document, Schema, model, models } from 'mongoose'

export interface IVisitor extends Document, Visitor {}

const VisitorSchema = new Schema<IVisitor>(
    {
        email: { type: String, required: true },
        name: { type: String, required: true },
        content: { type: String, required: true },
        createdAt: { type: String, required: true },
        updatedAt: { type: String, required: true },
    },
    { timestamps: true }
)

const Visitor = models.Visitor || model<IVisitor>('Visitor', VisitorSchema)

export default Visitor

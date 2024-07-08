import { Schema, model, Document } from 'mongoose';

interface IProject extends Document {
    title: string;
    description: string;
    client: Schema.Types.ObjectId;
    tags: string[];
}

const projectSchema = new Schema<IProject>({
    title: { type: String, required: true },
    description: { type: String, required: true },
    client: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    tags: { type: [String], required: true }
});

const Project = model<IProject>('Project', projectSchema);

export default Project;

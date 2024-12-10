import mongoose, { Schema, Document } from 'mongoose';

export interface ITask extends Document {
  userId: mongoose.Types.ObjectId; 
  title: string;
  description: string;
  dueDate: Date;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

const taskSchema = new Schema<ITask>(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    dueDate: { type: Date, required: true },
    status: { type: String, enum: ['pending', 'in-progress', 'completed'], default: 'pending' },
  },
  { timestamps: true }
);

export const Task = mongoose.model<ITask>('Task', taskSchema);

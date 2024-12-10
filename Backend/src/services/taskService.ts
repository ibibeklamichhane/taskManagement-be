import { Task, ITask } from '../models/taskModel';
import mongoose from 'mongoose';

export const createTask = async (taskData: Partial<ITask>): Promise<ITask> => {
  const task = new Task(taskData);
  return await task.save();
};

export const getUserTasks = async (userId: mongoose.Types.ObjectId): Promise<ITask[]> => {
  return await Task.find({ userId });
};


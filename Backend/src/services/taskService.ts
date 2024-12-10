import { Task, ITask } from '../models/taskModel';
import mongoose from 'mongoose';

export const createTask = async (taskData: Partial<ITask>): Promise<ITask> => {
  const task = new Task(taskData);
  return await task.save();
};

export const getUserTasks = async (userId: mongoose.Types.ObjectId): Promise<ITask[]> => {
  return await Task.find({ userId });
};

export const getTaskById = async (taskId: string, userId: mongoose.Types.ObjectId): Promise<ITask | null> => {
    return await Task.findOne({ _id: taskId, userId });
  };
  
  export const updateTask = async (taskId: string, userId: mongoose.Types.ObjectId, updates: Partial<ITask>): Promise<ITask | null> => {
    return await Task.findOneAndUpdate({ _id: taskId, userId }, updates, { new: true });
  };
  
  export const deleteTask = async (taskId: string, userId: mongoose.Types.ObjectId): Promise<ITask | null> => {
    return await Task.findOneAndDelete({ _id: taskId, userId });
  };
  
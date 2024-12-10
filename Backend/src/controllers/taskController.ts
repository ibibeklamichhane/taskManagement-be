import { Request, Response } from 'express';
import { createTask, getUserTasks } from '../services/taskService';
import mongoose from 'mongoose';

export const createTaskController = async (req: Request, res: Response): Promise<void> => {
    try {
      if (!req.user || !req.user.id) {
        res.status(401).json({ message: 'User not authenticated' });
        return;
      }
  
      const userId = req.user.id;
      const task = await createTask({ ...req.body, userId });
      res.status(201).json(task);
    } catch (error) {
      res.status(500).json({ message: 'Error creating task', error });
    }
  };

export const getUserTasksController = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.user || !req.user.id) {
        res.status(401).json({ message: 'User not authenticated' });
        return;
      }
      const userId = new mongoose.Types.ObjectId(req.user.id); 
      const tasks = await getUserTasks(userId);
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tasks', error });
  }
};




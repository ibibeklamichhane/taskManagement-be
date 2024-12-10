import { Request, Response } from 'express';
import { createTask, getUserTasks, getTaskById, updateTask, deleteTask } from '../services/taskService';
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

export const getTaskByIdController = async (req: Request, res: Response): Promise<void> => {
    try {
      if (!req.user || !req.user.id) {
          res.status(401).json({ message: 'User not authenticated' });
          return; // Explicitly return to ensure the function resolves to void
        }
        const userId = new mongoose.Types.ObjectId(req.user.id); // Convert string to ObjectId
        const taskId = req.params.id;
      const task = await getTaskById(taskId, userId);
      res.status(200).json(task);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching task', error });
    }
  };
  
  export const updateTaskController = async (req: Request, res: Response): Promise<void> => {
    try {
      if (!req.user || !req.user.id) {
          res.status(401).json({ message: 'User not authenticated' });
          return; // Explicitly return to ensure the function resolves to void
        }
        const userId = new mongoose.Types.ObjectId(req.user.id); // Convert string to ObjectId
        const taskId = req.params.id;
      const updatedTask = await updateTask(taskId, userId, req.body);
      res.status(200).json(updatedTask);
    } catch (error) {
      res.status(500).json({ message: 'Error updating task', error });
    }
  };
  
  export const deleteTaskController = async (req: Request, res: Response): Promise<void> => {
    try {
      if (!req.user || !req.user.id) {
          res.status(401).json({ message: 'User not authenticated' });
          return; // Explicitly return to ensure the function resolves to void
        }
        const userId = new mongoose.Types.ObjectId(req.user.id); // Convert string to ObjectId
        const taskId = req.params.id;
      const deletedTask = await deleteTask(taskId, userId);
      res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting task', error });
    }
  };
  


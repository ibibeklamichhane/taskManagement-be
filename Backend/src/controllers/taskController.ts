import { Request, Response } from 'express';
import { createTask, getUserTasks, getTaskById, updateTask, deleteTask } from '../services/taskService';
import mongoose from 'mongoose';
import { paginate, countTotal } from '../utils/pagination'; 
import { Task } from '../models/taskModel'; 

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
      const tasks = await paginate(req, Task);
      
      const totalCount = await countTotal(Task);

      res.status(200).json({
        tasks,
        pagination: {
          totalCount,
          currentPage: parseInt(req.query.page as string, 10) || 1,
          pageSize: parseInt(req.query.limit as string, 10) || 10,
        }
      });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tasks', error });
  }
};

export const getTaskByIdController = async (req: Request, res: Response): Promise<void> => {
    try {
      if (!req.user || !req.user.id) {
          res.status(401).json({ message: 'User not authenticated' });
          return; 
        }
        const userId = new mongoose.Types.ObjectId(req.user.id);
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
          return; 
        }
        const userId = new mongoose.Types.ObjectId(req.user.id); 
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
          return;
        }
        const userId = new mongoose.Types.ObjectId(req.user.id);
        const taskId = req.params.id;
      const deletedTask = await deleteTask(taskId, userId);
      res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting task', error });
    }
  };
  


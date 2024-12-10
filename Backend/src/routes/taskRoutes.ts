import express from 'express';
import {
  createTaskController,
  getUserTasksController,
  getTaskByIdController,
  updateTaskController,
  deleteTaskController,
} from '../controllers/taskController';
import { validatePayload } from '../middlewares/authMiddleware';
import { createTaskSchema } from '../validators/taskValidator';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = express.Router();

router.use(authMiddleware);

router.post('/', validatePayload(createTaskSchema), createTaskController);
router.get('/', getUserTasksController);

router.get('/:id', getTaskByIdController);
router.put('/:id', validatePayload(createTaskSchema), updateTaskController);
router.delete('/:id', deleteTaskController);


export default router;

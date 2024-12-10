import express from 'express';
import {
  createTaskController,
  getUserTasksController,
} from '../controllers/taskController';
import { validatePayload } from '../middlewares/authMiddleware';
import { createTaskSchema } from '../validators/taskValidator';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = express.Router();

router.use(authMiddleware);

router.post('/', validatePayload(createTaskSchema), createTaskController);
router.get('/', getUserTasksController);


export default router;

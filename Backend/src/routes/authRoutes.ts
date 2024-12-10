import express from 'express';
import { signUp, login } from '../controllers/authController';
import { validatePayload } from '../middlewares/authMiddleware';
import { signUpSchema, loginSchema } from '../validators/authValidator';

const router = express.Router();

router.post('/signup', validatePayload(signUpSchema), signUp);
router.post('/login', validatePayload(loginSchema), login);

export default router;

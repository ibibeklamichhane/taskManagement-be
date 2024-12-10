import { Request, Response } from 'express';
import { createUser, findUserByEmail, verifyPassword } from '../services/authService';
import { generateToken } from '../utils/jwtHelper';

export const signUp = async (req: Request, res: Response): Promise<void> => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      res.status(400).json({ message: 'Email already registered' });
      return;
    }

    const newUser = await createUser(name, email, password);
    const token = generateToken(newUser.id);
    res.status(201).json({ user: newUser, token });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
export const login = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;
  
    try {
      const user = await findUserByEmail(email);
      if (!user) {
        res.status(401).json({ message: 'Invalid email or password' });
        return;
      }
  
      const isPasswordValid = await verifyPassword(password, user.password);
      if (!isPasswordValid) {
        res.status(401).json({ message: 'Invalid email or password' });
        return;
      }
  
      const token = generateToken(user.id);
      res.status(200).json({ user, token });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  };
  
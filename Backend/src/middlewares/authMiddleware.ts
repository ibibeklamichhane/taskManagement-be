import { Request, Response, NextFunction } from 'express';
import { ObjectSchema } from 'joi';
import jwt from 'jsonwebtoken';

export const validatePayload = (schema: ObjectSchema) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await schema.validateAsync(req.body);
      next();
    } catch (error) {
      res.status(400).json({ message:'something went wrong', error: error});
    }
  };
};

export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      res.status(401).json({ message: 'Authorization required' });
      return; 
    }
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string };
      req.user = decoded;
      next(); 
    } catch (error) {
      res.status(401).json({ message: 'Invalid token' });
      return; 
    }
  };
  
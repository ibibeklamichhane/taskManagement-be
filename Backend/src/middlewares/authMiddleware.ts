import { Request, Response, NextFunction } from 'express';
import { ObjectSchema } from 'joi';

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

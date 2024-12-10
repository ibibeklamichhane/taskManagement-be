import Joi from 'joi';

export const createTaskSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  dueDate: Joi.date().required(),
  status: Joi.string().valid('pending', 'in-progress', 'completed').default('pending'),
});

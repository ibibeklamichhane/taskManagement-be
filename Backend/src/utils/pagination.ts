import { Request } from 'express';

export const paginate = (req: Request, model: any) => {
  const { page = 1, limit = 10, search = '' } = req.query;

  const pageNumber = parseInt(page as string, 10) || 1;
  const pageSize = parseInt(limit as string, 10) || 10;
  const searchQuery = search ? { title: { $regex: search, $options: 'i' } } : {}; 

  const skip = (pageNumber - 1) * pageSize;

  return model.find({ ...searchQuery })
    .skip(skip)
    .limit(pageSize)
    .exec();
};

export const countTotal = async (model: any, search = '') => {
  const searchQuery = search ? { title: { $regex: search, $options: 'i' } } : {}; 
  return model.countDocuments({ ...searchQuery }).exec();
};

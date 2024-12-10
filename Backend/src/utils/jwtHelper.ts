import jwt from 'jsonwebtoken';


const SECRET = process.env.JWT_SECRET || 'mysecretkey';

export const generateToken = (userId: string) => {
  return jwt.sign({ id: userId }, SECRET, { expiresIn: process.env.JWT_EXPIRATION || '1h' });
};
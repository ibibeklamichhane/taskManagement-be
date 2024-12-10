import bcrypt from "bcrypt";
import { User } from "../models/userModel";

export const createUser = async (
  name: string,
  email: string,
  password: string
) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  return User.create({ name, email, password: hashedPassword });
};

export const findUserByEmail = async (email: string) => {
  return User.findOne({ email });
};

export const verifyPassword = async (
  password: string,
  hashedPassword: string
) => {
  return bcrypt.compare(password, hashedPassword);
};

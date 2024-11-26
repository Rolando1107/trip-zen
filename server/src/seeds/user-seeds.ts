import { User } from '../models/user.js';
import dotenv from 'dotenv';
dotenv.config();

export const seedUsers = async () => {
  await User.bulkCreate([
    { username: 'steph', password: 'password' },
    { username: 'mike', password: 'password' },
  ], { individualHooks: true });
};
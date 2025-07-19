import { Env } from '../types/Env';
import 'dotenv/config';

export const env: Env = {
  PORT: Number(process.env.PORT || 8081),
  MONGO_CNN: process.env.MONGO_CNN || '',
  SECRETKEYJWT: process.env.SECRETKEYJWT || ''
};


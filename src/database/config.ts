import mongoose from 'mongoose';
import { env } from '../config/env';

export const dbConnection = async () => {
  try {
    await mongoose.connect(env.MONGO_CNN);
    console.log('!!!!!!!!!!Base de datos online!!!!!!!!!');
    
  } catch (error) {
    console.log(error);
    throw new Error('Error al iniciar la base de datos');
  }
};

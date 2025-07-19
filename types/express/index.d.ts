import 'express';
import { IUsuario } from '../../src/modules/user/user.models';
import { Document } from 'mongoose';
import { Types } from 'mongoose';
import { IUCategories } from '../../src/modules/categories/categories.models';

declare module 'express-serve-static-core' {
  interface Request {
    uid?: string;
    usuario: Document<any, any, IUsuario> & IUsuario;
    categoria: Document<any, any, IUCategories> & IUCategories;
  }
}

declare global {
  namespace Express {
    interface Request {
      usuario?: {
        _id: Types.ObjectId;
        nombre?: string;
      };
      categoria: {
        _id: Types.ObjectId;
        nombre?: string;
      };
    }
  }
}
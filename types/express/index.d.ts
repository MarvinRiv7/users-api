import 'express';
import { IUsuario } from '../../src/modules/user/user.models';
import { Document } from 'mongoose';

declare module 'express-serve-static-core' {
  interface Request {
    uid?: string;
    usuario: Document<any, any, IUsuarioo> & IUsuario;
  }
}

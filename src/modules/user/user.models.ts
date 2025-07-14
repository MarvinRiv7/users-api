import { Document, model, Schema } from 'mongoose';

export interface IUsuario extends Document {
  nombre: string;
  edad: number;
  correo: string;
  password: string;
  img?: string;
  rol: 'ADMIN_ROLE' | 'USER_ROLE';
  estado: boolean;
  google: boolean;
}

const UsuarioSChema = new Schema<IUsuario>({
  nombre: {
    type: String,
    required: [true, 'El nombre es obligatorio'],
  },
  edad: {
    type: Number,
    required: [true, 'La edad es obligatoria'],
  },
  correo: {
    type: String,
    required: [true, 'El correo es obligatorio'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'La contraseña es obligatoria'],
  },
  img: {
    type: String,
  },
  rol: {
    type: String,
    required: true,
    enum: ['ADMIN_ROLE', 'USER_ROLE', 'VENTAS_ROLE'],
  },
  estado: {
    type: Boolean,
    default: true,
  },
  google: {
    type: Boolean,
    default: false,
  },
});

UsuarioSChema.methods.toJSON = function() {
  const {__v, password, ...usuario} = this.toObject();
  return usuario;
}

export const Usuario = model<IUsuario>('Usuario', UsuarioSChema);

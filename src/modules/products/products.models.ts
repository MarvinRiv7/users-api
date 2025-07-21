import { model, Schema, Document, Types } from 'mongoose';

export interface IUProducts extends Document {
  nombre: string;
  estado: boolean;
  usuario: Types.ObjectId;
  categoria: Types.ObjectId;
  precio: number;
  descripcion: string;
  disponible: boolean,
  img: string
}

const ProductsSchema = new Schema<IUProducts>({
  nombre: {
    type: String,
    unique: true,
    required: [true, 'El nombre es obligatorio'],
  },
  estado: {
    type: Boolean,
    default: true,
    required: true,
  },
  precio: {
    type: Number,
    default: 0,
  },
  usuario: {
    type: Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true,
  },
  categoria: {
    type: Schema.Types.ObjectId,
    ref: 'Categorie',
    required: true
  },
  descripcion: {
    type: String
  },
  disponible: {
    type: Boolean,
    default: true
  },
  img: {type: String}
});

ProductsSchema.methods.toJSON = function () {
  const { __v, estado, ...data } = this.toObject();
  return data;
};

export const Products = model<IUProducts>('Product', ProductsSchema);

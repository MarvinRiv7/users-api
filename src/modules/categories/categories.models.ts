import { model, Schema, Document, Types } from 'mongoose';

export interface IUCategories extends Document {
  nombre: string;
  estado: boolean;
  usuario: Types.ObjectId;
}

const CategoriesSchema = new Schema<IUCategories>({
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
  usuario: {
    type: Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true,
  },
});

CategoriesSchema.methods.toJSON = function() {
  const {__v, estado, ...categorie} = this.toObject()
  return categorie
}

export const Categories = model<IUCategories>('Categorie', CategoriesSchema);

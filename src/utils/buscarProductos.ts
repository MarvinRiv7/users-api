import { isValidObjectId } from 'mongoose';
import { Products } from '../modules/products/products.models';
import { Response } from 'express';

export const buscarProductos = async (termino: string = '', res: Response) => {
  const esMongoId = isValidObjectId(termino);
  if (esMongoId) {
    const productos = await Products.findById(termino).populate(
      'categoria',
      'nombre',
    );
    return res.json({
      results: productos ? [productos] : [],
    });
  }

  const regex = RegExp(termino, 'i');
  const productos = await Products.find({
    $or: [{ nombre: regex, estado: true }],
  }).populate('categoria', 'nombre');
  res.json({
    results: productos,
  });
};

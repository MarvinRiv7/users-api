import { isValidObjectId } from "mongoose";
import { Categories } from "../modules/categories/categories.models";
import { Response } from "express";

export const buscarCategorias = async (termino: string = '', res: Response) => {
  const esMongoId = isValidObjectId(termino);
  if (esMongoId) {
    const categoria = await Categories.findById(termino);
    return res.json({
      results: categoria ? [categoria] : [],
    });
  }
  const regex = RegExp(termino, 'i');
  const categorias = await Categories.find({
    $or: [{ nombre: regex, estado: true }],
  });
  res.json({
    results: categorias,
  });
};
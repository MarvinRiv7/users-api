import { isValidObjectId } from "mongoose";
import { Usuario } from "../modules/user/user.models";
import { Response } from "express";


export const buscarUsuarios = async (termino: string = '', res: Response) => {
  const esMongoID = isValidObjectId(termino); //True
  if (esMongoID) {
    const usuario = await Usuario.findById(termino);
    return res.json({
      results: usuario ? [usuario] : [],
    });
  }

  const regex = new RegExp(termino, 'i');

  const usuarios = await Usuario.find({
    $or: [{ nombre: regex }, { correo: regex }],
    $and: [{ estado: true }],
  });
  res.json({
    results: usuarios,
  });
};
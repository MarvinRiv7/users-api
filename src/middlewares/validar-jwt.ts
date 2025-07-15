import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { Usuario } from '../modules/user/user.models';

interface MyUidPayload {
  uid: string;
}

export const validarJwT = async (req: Request, res: any, next: any) => {
  const token = req.header('x-token');
  if (!token) {
    return res.status(401).json({
      msg: 'No hay token en la petición',
    });
  }

  try {
    const { uid } = jwt.verify(
      token,
      process.env.SECRETKEYJWT ?? 'SECRETKEYJWT',
    ) as MyUidPayload;

    const usuario = await Usuario.findById(uid);
    //VERIFICAR SI EXISTE EN LA BASE DE DATOS
    if (!usuario) {
      return res.status(401).json({
        msg: 'Token no valido - usuario no existe en DB',
      });
    }
    //VERIFICAR el estado
    if (!usuario?.estado) {
      return res
        .status(401)
        .json({ msg: 'Token no valido - Usuario con estado en false' });
    }
    req.usuario = usuario;

    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({
      msg: 'Token no válido',
    });
  }
};

import { Request, Response } from 'express';
import { Usuario } from './user.models';
import { hashPasword } from '../../utils/bcryptjs';
import { resolveNaptr } from 'dns/promises';

export const usuariosGet = async (req: Request, res: Response) => {
  // const params = req.query;
  const { limite = 5, desde = 0 } = req.query;
  const query = { estado: true };

  const [total, usuarios] = await Promise.all([
    Usuario.countDocuments(query),
    Usuario.find(query).skip(Number(desde)).limit(Number(limite)),
  ]);

  res.json({
    total,
    usuarios
  });
};

export const usuariosPost = async (req: Request, res: Response) => {
  try {
    const { nombre, correo, password, edad, rol } = req.body;
    const usuario = new Usuario({ nombre, correo, password, edad, rol });
    //Encriptar la contraseña
    usuario.password = hashPasword(password);
    //Guardar en DB
    await usuario.save();
    res.status(201).json({
      ok: true,
      usuario,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
    });
  }
};

export const usuariosPut = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { _id, password, google, ...resto } = req.body;
  //TODO validar contra base de datos
  if (password) {
    resto.password = hashPasword(password);
  }
  const usuario = await Usuario.findByIdAndUpdate(id, resto);

  res.json({
    ok: true,
    usuario,
  });
};

export const usuariosPatch = (req: Request, res: Response) => {
  res.json({
    ok: true,
    msg: 'patch Api - controlador',
  });
};

export const usuariosDelete = async (req: Request, res: Response) => {

  const {id} = req.params

  //Borrar fisicamente al usuario
  // const usuario = await Usuario.findByIdAndDelete(id)

  //Borrar cambiando el estado
  const usuario = await Usuario.findByIdAndUpdate(id, {estado: false})

  res.json({
    ok: true,
    usuario
  });
};

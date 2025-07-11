import { Request, Response } from 'express';
import { Usuario } from './user.models';
import { validationResult } from 'express-validator';
import { hashPasword } from '../../utils/bcryptjs';

export const usuariosGet = (req: Request, res: Response) => {
  const params = req.query;

  res.json({
    ok: true,
    msg: 'get Api - controlador',
  });
};

export const usuariosPost = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({
      ok: false,
      errors,
    });
  }
  try {
    const { nombre, correo, password, edad, rol } = req.body;
    const usuario = new Usuario({ nombre, correo, password, edad, rol });
    //verificar si el correo existe
    const existeEmail = await Usuario.findOne({ correo });
    if (existeEmail) {
      res.status(400).json({
        ok: false,
        msg: 'El correo ya está registrado',
      });
    }
    //Encriptar la contraseña
    usuario.password = hashPasword(password);
    //Guardar en DB
    await usuario.save();
    res.status(201).json({
      ok: true,
      msg: 'post Api - controlador',
      usuario,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
    });
  }
};

export const usuariosPut = (req: Request, res: Response) => {
  const { id } = req.params;

  res.status(400).json({
    ok: true,
    msg: 'put Api - controlador',
    id,
  });
};

export const usuariosPatch = (req: Request, res: Response) => {
  res.json({
    ok: true,
    msg: 'patch Api - controlador',
  });
};

export const usuariosDelete = (req: Request, res: Response) => {
  res.json({
    ok: true,
    msg: 'delete Api - controlador',
  });
};

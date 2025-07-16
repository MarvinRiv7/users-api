import { Request, Response, NextFunction } from 'express';
import { Usuario } from '../user/user.models';
import { comparePassword } from '../../utils/bcryptjs';
import { generarJWT } from '../../helpers/generarJWT';
import googleVerify from '../../helpers/google-verify';

export const login = async (req: Request, res: Response) => {
  const { correo, password } = req.body;

  try {
    const usuario = await Usuario.findOne({ correo });
    if (!usuario) {
      return res.status(400).json({
        msg: 'Usuario/Password no son correctos - correo',
      });
    }

    if (!usuario.estado) {
      return res.status(400).json({
        msg: 'Usuario/Password no son correctos - estado',
      });
    }

    const isValidPassword = await comparePassword(password, usuario.password);
    if (!isValidPassword) {
      return res.status(400).json({
        msg: 'Usuario/Password no son correctos - password',
      });
    }

    const token = await generarJWT(usuario.id);

    res.json({ usuario, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Hable con el administrador' });
  }
};

export const googleSignIn = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { id_token } = req.body;

  try {
    const { correo, img, nombre } = await googleVerify(id_token);

    let usuario = await Usuario.findOne({ correo });

    if (!usuario) {
      const data = {
        nombre,
        correo,
        password: ':p',
        img,
        google: true,
        rol: 'USER_ROLE',
        edad: 24,
      };
      usuario = new Usuario(data);
      await usuario.save();
    }

    if (!usuario.estado) {
      return res.status(401).json({
        msg: 'Hable con el administrador, usuario bloqueado',
      });
    }

    const token = await generarJWT(usuario.id);

    res.json({
      msg: 'OKKKKK',
      usuario,
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      ok: false,
      msg: 'El token no se pudo verificar',
    });
  }
};

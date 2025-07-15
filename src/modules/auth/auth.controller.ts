import { Request, Response } from 'express';
import { Usuario } from '../user/user.models';
import { comparePassword } from '../../utils/bcryptjs';
import { generarJWT } from '../../utils/generarJWT';

export const login = async (req: any, res: any) => {
  const { correo, password } = req.body;

  try {
    //Verificar si el email existe
    const usuario = await Usuario.findOne({ correo });
    if (!usuario) {
      return res.status(400).json({
        msg: 'Usuario/Password no son correctos - correo',
      });
    }
    //SI el usuario esta activo
    if (!usuario.estado) {
      return res.status(400).json({
        msg: 'Usuario/Password no son correctos - estado',
      });
    }
    //VERIFICAR la contra
    const isValidPassword = comparePassword(password, usuario.password);
    if(!isValidPassword) {
       return res.status(400).json({
        msg: 'Usuario/Password no son correctos - password',
      });
    }
    //GENERAR JWT
    const token = await generarJWT(usuario.id)

    res.json({
      msg: 'Login endpoint',
      usuario,
      token
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: 'Hable con el administrador',
    });
  }
};

import { Router } from 'express';
import { validarCampos } from '../../middlewares/validar-campos';
import { login } from './auth.controller';
import { check } from 'express-validator';

const router = Router();

router.post(
  '/login',
  [
    check('correo', 'El correo es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    validarCampos,
  ],
  login,
);

export default router;

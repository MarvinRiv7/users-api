import { Router } from 'express';
import {
  usuariosDelete,
  usuariosGet,
  usuariosPatch,
  usuariosPost,
  usuariosPut,
} from './user.controller';
import { check } from 'express-validator';
import { validarCampos } from '../../middlewares/validar-campos';
import { Role } from './role.models';

const router = Router();
router.get('/', usuariosGet);
router.put('/:id', usuariosPut);
router.post(
  '/',
  [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('correo', 'El correo es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').isLength({ min: 6 }),
    // check('rol', 'No es un rol valido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('edad', 'La edad es obligatoria').isInt({ min: 0 }),
    check('rol').custom(async (rol = '') => {
      const existeRol = await Role.findOne({ rol });
      if (!existeRol) {
        throw new Error(`El rol ${rol} no está registrado en la base de datos`);
      }
    }),
    validarCampos,
  ],
  usuariosPost,
);
router.delete('/:id', usuariosDelete);
router.patch('/:id', usuariosPatch);

export default router;

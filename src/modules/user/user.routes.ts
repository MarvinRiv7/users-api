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
import {
  emailExiste,
  esRoleValido,
  existeUsuarioPorId,
} from '../../helpers/db-validators';
import { validarJwT } from '../../middlewares/validar-jwt';
import { esAdminRole, tieneRole } from '../../middlewares/validar-roles';

const router = Router();
router.get('/', usuariosGet);
router.put(
  '/:id',
  [
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    check('correo', 'El correo es obligatorio').isEmail(),
    check('rol').custom(esRoleValido),
    validarCampos,
  ],
  usuariosPut,
);
router.post(
  '/',
  [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('correo', 'El correo es obligatorio').isEmail(),
    check('correo').custom(emailExiste),
    check('password', 'La contraseña es obligatoria').isLength({ min: 6 }),
    // check('rol', 'No es un rol valido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('edad', 'La edad es obligatoria').isInt({ min: 0 }),
    check('rol').custom(esRoleValido),
    validarCampos,
  ],
  usuariosPost,
);
router.delete(
  '/:id',
  [
    validarJwT,
    // esAdminRole,
    tieneRole('ADMIN_ROLE', 'VENTAS_ROLE'),
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
  ],
  validarCampos,
  usuariosDelete,
);
router.patch('/:id', usuariosPatch);

export default router;

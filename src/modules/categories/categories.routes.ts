import { Request, Response, Router } from 'express';
import { validarCampos } from '../../middlewares/validar-campos';
import { check } from 'express-validator';
import { validarJwT } from '../../middlewares/validar-jwt';
import {
  CrearCategoria,
  ObtenerCategorias,
  ObtenerCategoria,
  actualizarCategoria,
  borrarCategoria,
} from './categories.controller';
import { existeCategoriaPorID } from '../../helpers/db-validators';
import { esAdminRole } from '../../middlewares/validar-roles';

const router = Router();

// api/categories
//OBTENER todas las categories - publico
router.get('/', ObtenerCategorias);

//OBTENER categories por id - publico
router.get(
  '/:id',
  [
    check('id').custom(existeCategoriaPorID),
    check('id', 'No es un id valido').isMongoId(),
    validarCampos,
  ],
  ObtenerCategoria,
);

//Crear categoria - privado - cualquier persona con un token valido
router.post(
  '/',
  [
    validarJwT,
    check('nombre', 'EL nombres es obligatorio').not().isEmpty(),
    validarCampos,
  ],
  CrearCategoria,
);

//Actualizar categoria - privado - cualquier persona con un token valido
router.put(
  '/:id',
  [
    validarJwT,
    check('nombre', 'EL nombres es obligatorio').not().isEmpty(),
    check('id').custom(existeCategoriaPorID),
    validarCampos,
  ],
  actualizarCategoria,
);

//Borrar una categoria - Admin
router.delete(
  '/:id',
  [
    validarJwT,
    esAdminRole,
    check('id', 'No es un id valido').isMongoId(),
    validarCampos,
    check('id').custom(existeCategoriaPorID),
  ],
  borrarCategoria,
);

export default router;

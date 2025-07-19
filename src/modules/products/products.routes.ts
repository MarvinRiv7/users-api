import { Router } from 'express';
import {
  actualizarProducto,
  borrarProducto,
  crearProducto,
  ObtenerProducto,
  ObtenerProductos,
} from './products.controller';
import { validarJwT } from '../../middlewares/validar-jwt';
import { validarCampos } from '../../middlewares/validar-campos';
import { check } from 'express-validator';
import {
  existeCategoriaPorID,
  existeProductoPorID,
} from '../../helpers/db-validators';
import { esAdminRole } from '../../middlewares/validar-roles';

const router = Router();

router.get('/', ObtenerProductos);

router.get(
  '/:id',
  [
    check('id').custom(existeProductoPorID),
    check('id', 'No es un id valido').isMongoId(),
    validarCampos,
  ],
  ObtenerProducto,
);

router.post(
  '/',
  [
    validarJwT,
    check('nombre', 'EL nombres es obligatorio').not().isEmpty(),
    check('categoria', 'La categoria no es un id de Mongo').isMongoId(),
    check('categoria').custom(existeCategoriaPorID),
    validarCampos,
  ],
  crearProducto,
);

router.put(
  '/:id',
  [
    validarJwT,
    check('nombre', 'EL nombres es obligatorio').not().isEmpty(),
    check('id').custom(existeProductoPorID),
    validarCampos,
  ],
  actualizarProducto,
);

router.delete(
  '/:id',
  [
    validarJwT,
    esAdminRole,
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(existeProductoPorID),
    validarCampos,
  ],
  borrarProducto,
);

export default router;

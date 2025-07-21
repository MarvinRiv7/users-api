import { Router } from 'express';
import {
  cargarArchivos,
  actualizarImagen,
  mostrarImagen,
  actualizarImagenCloudinary,
} from './uploads.controller';
import { check } from 'express-validator';
import { validarCampos } from '../../middlewares/validar-campos';
import { coleccionesPermitidas } from '../../helpers';

const router = Router();

router.post('/', cargarArchivos);
router.put(
  '/:coleccion/:id',
  [
    check('id', 'El id debe de ser de mongo').isMongoId(),
    check('coleccion').custom((c) =>
      coleccionesPermitidas(c, ['usuarios', 'productos']),
    ),
    validarCampos,
  ],
  actualizarImagenCloudinary,
);
router.get(
  '/:coleccion/:id',
  [
    check('id', 'El id debe de ser de mongo').isMongoId(),
    check('coleccion').custom((c) =>
      coleccionesPermitidas(c, ['usuarios', 'productos']),
    ),
    validarCampos,
  ],
  mostrarImagen,
);

export default router;

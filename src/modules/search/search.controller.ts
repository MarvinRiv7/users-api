import { Request, Response } from 'express';
import { Params } from './search.interface';
import { isValidObjectId } from 'mongoose';
import { Usuario } from '../user/user.models';
import { Categories } from '../categories/categories.models';
import { Products } from '../products/products.models';
import { buscarUsuarios } from '../../utils/buscarUsuarios';
import { buscarCategorias } from '../../utils/buscarCategorias';
import { buscarProductos } from '../../utils/buscarProductos';

const coleccionesPermitidas = ['usuarios', 'categorias', 'productos', 'roles'];

export const buscar = (req: Request<Params>, res: Response) => {
  const { coleccion, termino } = req.params;
  if (!coleccionesPermitidas.includes(coleccion)) {
    return res.status(400).json({
      msg: `Las colecciones permitidas som: ${coleccionesPermitidas}`,
    });
  }
  switch (coleccion) {
    case 'usuarios':
      buscarUsuarios(termino, res);
      break;
    case 'categorias':
      buscarCategorias(termino, res);
      break;
    case 'productos':
      buscarProductos(termino, res)
      break;

    default:
      res.status(500).json({
        msg: 'Se me olvido hacer esta busqueda',
      });
  }
};

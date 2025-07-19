import { Request, Response } from 'express';
import { Products } from './products.models';
import { Types } from 'mongoose';

interface CategoriaQuery {
  limite?: string;
  desde?: string;
}

export const ObtenerProductos = async (
  req: Request<{}, {}, CategoriaQuery>,
  res: Response,
) => {
  const { limite = 5, desde = 0 } = req.query;
  const query = { estado: true };

  const [total, productos] = await Promise.all([
    Products.countDocuments(query),
    Products.find(query)
      .populate('usuario', 'nombre')
      .populate('categoria', 'nombre')
      .skip(Number(desde))
      .limit(Number(limite)),
  ]);
  res.json({
    total,
    productos,
  });
};

export const ObtenerProducto = async (req: Request, res: Response) => {
  const { id } = req.params;

  const producto = await Products.findById(id)
    .populate('usuario', 'nombre')
    .populate('categoria', 'nombre');

  res.json({
    producto,
  });
};

interface ProductoBody {
  nombre: string;
  categoria: Types.ObjectId;
  precio?: number;
  descripcion?: string;
  estado: boolean;
  usuario: Types.ObjectId;
}

export const crearProducto = async (
  req: Request<{}, {}, ProductoBody>,
  res: Response,
) => {
  const { estado, usuario, ...body } = req.body;

  try {
    const { nombre } = body;
    const nombreUpper = nombre.toUpperCase();

    const productDB = await Products.findOne({ nombre: nombreUpper });

    if (productDB) {
      return res.status(400).json({
        msg: `El producto ${productDB.nombre} ya existe`,
      });
    }

    const data = {
      ...body,
      nombre: nombreUpper,
      usuario: req.usuario._id,
    };

    const product = new Products(data);
    await product.save();

    return res.status(201).json({
      product,
    });
  } catch (error: unknown) {
    console.error(error);
    return res.status(500).json({
      msg: 'Hable con el administrador',
    });
  }
};

export const actualizarProducto = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { estado, usuario, categoria, ...data } = req.body;

  data.nombre = data.nombre.toUpperCase();
  data.usuario = req.usuario._id;
  const producto = await Products.findByIdAndUpdate(id, data, { new: true });

  return res.json(producto);
};

export const borrarProducto = async (req: Request, res: Response) => {

  const {id} = req.params;
  const borrarProducto = await Products.findByIdAndUpdate(id, {estado: false}, {new: true})

  res.status(200).json({
    borrarProducto
  })
}

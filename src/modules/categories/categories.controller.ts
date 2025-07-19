import { Request, Response } from 'express';
import { Categories} from './categories.models';

interface CategoriaBody {
  nombre: string;
}

interface CategoriaQuery {
  limite?: string;
  desde?: string;
}


export const ObtenerCategorias = async (req: Request<{} , {} , CategoriaQuery>, res: Response) => {
  const { limite = 5, desde = 0 } = req.query;
  const query = { estado: true };

  const [total, categorias] = await Promise.all([
    Categories.countDocuments(query),
    Categories.find(query)
      .populate('usuario', 'nombre')
      .skip(Number(desde))
      .limit(Number(limite)),
  ]);
  res.json({
    total,
    categorias,
  });
};

export const ObtenerCategoria = async (req: Request, res: Response) => {
  const { id } = req.params;

  const categoria = await Categories.findById(id).populate('usuario');
  res.json({
    categoria,
  });
};

export const CrearCategoria = async (req: Request<{}, {}, CategoriaBody>, res: Response) => {
  const nombre = req.body.nombre.toUpperCase()

  try {
    const categoriaDB = await Categories.findOne({ nombre });

    if (categoriaDB) {
      return res.status(400).json({
        msg: `La categoria ${categoriaDB.nombre}, ya existe`,
      });
    }
    //Generar la data a guardar
    const data = {
      nombre,
      usuario: req.usuario._id,
    };

    const categoria = new Categories(data);

    //Guardar en DB
    await categoria.save();
    res.status(201).json({
      categoria,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: 'Hable con el administrador',
    });
  }
};

export const actualizarCategoria = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { estado, usuario, ...data } = req.body;

  data.nombre = data.nombre.toUpperCase();
  data.usuario = req.usuario._id;

  const categoria = await Categories.findByIdAndUpdate(id, data, { new: true });

  return res.json(categoria);
};

export const borrarCategoria = async (req: Request, res: Response) => {

  const {id} = req.params
  const borrarCategoria = await Categories.findByIdAndUpdate(id,{estado: false}, {new: true})

  return res.status(200).json({
    borrarCategoria
  })
}
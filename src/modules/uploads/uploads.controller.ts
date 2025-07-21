import { Request, Response } from 'express';
import { subirArchivo } from '../../helpers';
import { UploadedFile } from 'express-fileupload';
import { Usuario } from '../user/user.models';
import { Products } from '../products/products.models';
import path from 'path';
import fs from 'fs';
import { v2 as cloudinary } from 'cloudinary';
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export const cargarArchivos = async (req: Request, res: Response) => {
  const archivo = req.files!.archivo;
  if (!archivo || Array.isArray(archivo)) {
    return res.status(400).json({ msg: 'Error al procesar el archivo.' });
  }

  //SUBIR archivos y asignar el tipo de archivo y la carpeta de destino
  // const nombre = await subirArchivo(archivo, ['jpg'], 'photos');
  const nombre = await subirArchivo(archivo, undefined, 'imgs');
  res.json({
    nombre,
  });
};

export const actualizarImagen = async (req: Request, res: Response) => {
  const { id, coleccion } = req.params;

  let modelo;

  switch (coleccion) {
    case 'usuarios':
      modelo = await Usuario.findById(id);
      if (!modelo) {
        return res.status(400).json({
          msg: `No existe un usuario con el id ${id}`,
        });
      }
      break;
    case 'productos':
      modelo = await Products.findById(id);
      if (!modelo) {
        return res.status(400).json({
          msg: `No existe un producto con el id ${id}`,
        });
      }
      break;

    default:
      return res.status(500).json({
        msg: 'Se me olvido validar esto',
      });
  }

  //Limpiar imagenes previas
  if (modelo.img) {
    //hay que borrar la imagen
    const pathImage = path.join(
      __dirname,
      '../../../uploads',
      coleccion,
      modelo.img,
    );
    if (fs.existsSync(pathImage)) {
      fs.unlinkSync(pathImage);
    }
  }

  const archivo = req.files!.archivo;
  if (!archivo || Array.isArray(archivo)) {
    return res.status(400).json({ msg: 'Error al procesar el archivo.' });
  }
  const nombre = await subirArchivo(archivo, undefined, coleccion);
  modelo.img = nombre;
  await modelo.save();

  res.json({ modelo });
};

export const mostrarImagen = async (req: Request, res: Response) => {
  const { id, coleccion } = req.params;

  let modelo;

  switch (coleccion) {
    case 'usuarios':
      modelo = await Usuario.findById(id);
      if (!modelo) {
        return res.status(400).json({
          msg: `No existe un usuario con el id ${id}`,
        });
      }
      break;
    case 'productos':
      modelo = await Products.findById(id);
      if (!modelo) {
        return res.status(400).json({
          msg: `No existe un producto con el id ${id}`,
        });
      }
      break;

    default:
      return res.status(500).json({
        msg: 'Se me olvido validar esto',
      });
  }

  //Limpiar imagenes previas
  if (modelo.img) {
    //hay que borrar la imagen
    const pathImage = path.join(
      __dirname,
      '../../../uploads',
      coleccion,
      modelo.img,
    );
    if (fs.existsSync(pathImage)) {
      return res.sendFile(pathImage);
    }
  }

  const pathImage = path.join(__dirname, '../../../assets/unnamed.jpg');

  res.sendFile(pathImage);
};

export const actualizarImagenCloudinary = async (
  req: Request,
  res: Response,
) => {
  const { id, coleccion } = req.params;

  let modelo;

  switch (coleccion) {
    case 'usuarios':
      modelo = await Usuario.findById(id);
      if (!modelo) {
        return res.status(400).json({
          msg: `No existe un usuario con el id ${id}`,
        });
      }
      break;
    case 'productos':
      modelo = await Products.findById(id);
      if (!modelo) {
        return res.status(400).json({
          msg: `No existe un producto con el id ${id}`,
        });
      }
      break;

    default:
      return res.status(500).json({
        msg: 'Se me olvido validar esto',
      });
  }

  if(modelo.img) {
    const nombreArr = modelo.img.split('/')
    const nombre = nombreArr[nombreArr.length - 1]
    const [public_id] = nombre.split('.')
    cloudinary.uploader.destroy(public_id)
  }

  const archivo = req.files?.archivo as UploadedFile;

  if (!archivo || Array.isArray(archivo) || !archivo.tempFilePath) {
    return res.status(400).json({ msg: 'Error al procesar el archivo.' });
  }

  try {
    const { secure_url } = await cloudinary.uploader.upload(
      archivo.tempFilePath,
    );
    modelo.img = secure_url;
    await modelo.save();
    return res.json(modelo);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: 'Error al subir imagen a Cloudinary.' });
  }
};

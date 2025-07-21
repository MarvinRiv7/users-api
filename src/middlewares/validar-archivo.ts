import { NextFunction, Request, Response } from 'express';

export const validarArchivoSubir = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
    return res.status(400).json({ msg: 'No se subió ningún archivo.' });
  }
  const archivo = req.files.archivo;

  if (Array.isArray(archivo)) {
    return res
      .status(400)
      .json({ msg: 'Solo se permite un archivo a la vez.' });
  }
  next();
};

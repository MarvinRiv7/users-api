import { Request, Response } from 'express';
import { UploadedFile } from 'express-fileupload';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

export const subirArchivo = (
  files: UploadedFile,
  extensionesValidas: string[] = ['png', 'jpg', 'jpeg', 'gif'],
  carpeta: string = '',
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const archivoSubido = files;

    const archivo = archivoSubido as UploadedFile;
    const nombreCortado = archivo.name.split('.');
    const extension = nombreCortado[nombreCortado.length - 1];

    //Validar extension

    if (!extensionesValidas.includes(extension)) {
      return reject(
        `La extemsion ${extension} no es permitida, ${extensionesValidas}`,
      );
    }

    const nombreTem = uuidv4() + '.' + extension;

    const uploadDir = path.join(__dirname, '../../uploads', carpeta);

    const uploadPath = path.join(uploadDir, nombreTem);

    archivo.mv(uploadPath, (err) => {
      if (err) {
        return reject(err);
      }
      resolve(nombreTem);
    });
  });
};

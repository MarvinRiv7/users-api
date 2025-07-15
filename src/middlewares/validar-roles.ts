import { NextFunction, Request, Response } from 'express';

export const esAdminRole = (req: Request, res: any, next: NextFunction) => {
  if (!req.usuario) {
    return res.status(500).json({
      msg: 'Se quiere verificar el rol sin verificar el token primero',
    });
  }
  const { rol, nombre } = req.usuario;
  if (rol !== 'ADMIN_ROLE') {
    return res.status(401).json({
      msg: `${nombre} no es administrador - No puede hacer esto`,
    });
  }
  next();
};

export const tieneRole = (...roles: string[]) => {
  return (req: Request, res: any, next: NextFunction) => {
    if (!req.usuario) {
      return res.status(500).json({
        msg: 'Se quiere verificar el rol sin verificar el token primero',
      });
    }
    if(!roles.includes(req.usuario.rol)) {
      return res.status(401).json({
        msg: `El servicio requiere uno de estos roles ${roles}`
      })
    }
    next();
  };
};

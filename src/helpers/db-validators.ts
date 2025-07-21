import { Categories } from '../modules/categories/categories.models';
import { Products } from '../modules/products/products.models';
import { Role } from '../modules/user/role.models';
import { Usuario } from '../modules/user/user.models';

export const esRoleValido = async (rol: string) => {
  const existeRol = await Role.findOne({ rol });
  if (!existeRol) {
    throw new Error(`El rol ${rol} no está registrado en la base de datos`);
  }
};

export const emailExiste = async (correo: string) => {
  // Verificar si el correo existe
  const existeEmail = await Usuario.findOne({ correo });
  if (existeEmail) {
    throw new Error(`El correo: '${correo}', ya está registrado`);
  }
};

export const existeUsuarioPorId = async (id: string) => {
  // Verificar si el correo existe
  const existeUsuario = await Usuario.findById(id);
  if (!existeUsuario) {
    throw new Error(`El id: '${id}', no existe`);
  }
};

export const existeCategoriaPorID = async (id: string) => {
  const existeCategoria = await Categories.findById(id);
  if (!existeCategoria) {
    throw new Error(`El id: ${id} no existe`);
  }
};

export const existeProductoPorID = async (id: string) => {
  const existeProducto = await Products.findById(id);
  if (!existeProducto) {
    throw new Error(`El id: ${id} no existe`);
  }
};

export const coleccionesPermitidas = (coleccion: string = '', colecciones: string[]) => {

  const incluida = colecciones.includes(coleccion)
  if(!incluida) {
    throw new Error(`La coleccion ${coleccion} no es permitida, ${colecciones}`)
  }
  return true

}


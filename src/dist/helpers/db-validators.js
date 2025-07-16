"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.existeUsuarioPorId = exports.emailExiste = exports.esRoleValido = void 0;
const role_models_1 = require("../modules/user/role.models");
const user_models_1 = require("../modules/user/user.models");
const esRoleValido = (rol) => __awaiter(void 0, void 0, void 0, function* () {
    const existeRol = yield role_models_1.Role.findOne({ rol });
    if (!existeRol) {
        throw new Error(`El rol ${rol} no está registrado en la base de datos`);
    }
});
exports.esRoleValido = esRoleValido;
const emailExiste = (correo) => __awaiter(void 0, void 0, void 0, function* () {
    // Verificar si el correo existe
    const existeEmail = yield user_models_1.Usuario.findOne({ correo });
    if (existeEmail) {
        throw new Error(`El correo: '${correo}', ya está registrado`);
    }
});
exports.emailExiste = emailExiste;
const existeUsuarioPorId = (id) => __awaiter(void 0, void 0, void 0, function* () {
    // Verificar si el correo existe
    const existeUsuario = yield user_models_1.Usuario.findById(id);
    if (!existeUsuario) {
        throw new Error(`El id: '${id}', no existe`);
    }
});
exports.existeUsuarioPorId = existeUsuarioPorId;
//# sourceMappingURL=db-validators.js.map
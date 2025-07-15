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
exports.login = void 0;
const user_models_1 = require("../user/user.models");
const bcryptjs_1 = require("../../utils/bcryptjs");
const generarJWT_1 = require("../../utils/generarJWT");
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { correo, password } = req.body;
    try {
        //Verificar si el email existe
        const usuario = yield user_models_1.Usuario.findOne({ correo });
        if (!usuario) {
            return res.status(400).json({
                msg: 'Usuario/Password no son correctos - correo',
            });
        }
        //SI el usuario esta activo
        if (!usuario.estado) {
            return res.status(400).json({
                msg: 'Usuario/Password no son correctos - estado',
            });
        }
        //VERIFICAR la contra
        const isValidPassword = (0, bcryptjs_1.comparePassword)(password, usuario.password);
        if (!isValidPassword) {
            return res.status(400).json({
                msg: 'Usuario/Password no son correctos - password',
            });
        }
        //GENERAR JWT
        const token = yield (0, generarJWT_1.generarJWT)(usuario.id);
        res.json({
            msg: 'Login endpoint',
            usuario,
            token
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador',
        });
    }
});
exports.login = login;
//# sourceMappingURL=auth.controller.js.map
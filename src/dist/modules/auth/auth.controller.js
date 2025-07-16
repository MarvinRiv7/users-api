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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.googleSignIn = exports.login = void 0;
const user_models_1 = require("../user/user.models");
const bcryptjs_1 = require("../../utils/bcryptjs");
const generarJWT_1 = require("../../helpers/generarJWT");
const google_verify_1 = __importDefault(require("../../helpers/google-verify"));
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { correo, password } = req.body;
    try {
        const usuario = yield user_models_1.Usuario.findOne({ correo });
        if (!usuario) {
            return res.status(400).json({
                msg: 'Usuario/Password no son correctos - correo',
            });
        }
        if (!usuario.estado) {
            return res.status(400).json({
                msg: 'Usuario/Password no son correctos - estado',
            });
        }
        const isValidPassword = yield (0, bcryptjs_1.comparePassword)(password, usuario.password);
        if (!isValidPassword) {
            return res.status(400).json({
                msg: 'Usuario/Password no son correctos - password',
            });
        }
        const token = yield (0, generarJWT_1.generarJWT)(usuario.id);
        res.json({ usuario, token });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Hable con el administrador' });
    }
});
exports.login = login;
const googleSignIn = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_token } = req.body;
    try {
        const { correo, img, nombre } = yield (0, google_verify_1.default)(id_token);
        let usuario = yield user_models_1.Usuario.findOne({ correo });
        if (!usuario) {
            const data = {
                nombre,
                correo,
                password: ':p',
                img,
                google: true,
                rol: 'USER_ROLE',
                edad: 24,
            };
            usuario = new user_models_1.Usuario(data);
            yield usuario.save();
        }
        if (!usuario.estado) {
            return res.status(401).json({
                msg: 'Hable con el administrador, usuario bloqueado',
            });
        }
        const token = yield (0, generarJWT_1.generarJWT)(usuario.id);
        res.json({
            msg: 'OKKKKK',
            usuario,
            token,
        });
    }
    catch (error) {
        console.error(error);
        res.status(400).json({
            ok: false,
            msg: 'El token no se pudo verificar',
        });
    }
});
exports.googleSignIn = googleSignIn;
//# sourceMappingURL=auth.controller.js.map
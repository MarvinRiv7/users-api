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
exports.validarJwT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_models_1 = require("../modules/user/user.models");
const validarJwT = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const token = req.header('x-token');
    if (!token) {
        return res.status(401).json({
            msg: 'No hay token en la petición',
        });
    }
    try {
        const { uid } = jsonwebtoken_1.default.verify(token, (_a = process.env.SECRETKEYJWT) !== null && _a !== void 0 ? _a : 'SECRETKEYJWT');
        const usuario = yield user_models_1.Usuario.findById(uid);
        //VERIFICAR SI EXISTE EN LA BASE DE DATOS
        if (!usuario) {
            return res.status(401).json({
                msg: 'Token no valido - usuario no existe en DB',
            });
        }
        //VERIFICAR el estado
        if (!(usuario === null || usuario === void 0 ? void 0 : usuario.estado)) {
            return res
                .status(401)
                .json({ msg: 'Token no valido - Usuario con estado en false' });
        }
        req.usuario = usuario;
        next();
    }
    catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Token no válido',
        });
    }
});
exports.validarJwT = validarJwT;
//# sourceMappingURL=validar-jwt.js.map
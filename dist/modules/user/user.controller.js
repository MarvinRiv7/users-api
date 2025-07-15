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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usuariosDelete = exports.usuariosPatch = exports.usuariosPut = exports.usuariosPost = exports.usuariosGet = void 0;
const user_models_1 = require("./user.models");
const bcryptjs_1 = require("../../utils/bcryptjs");
const usuariosGet = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // const params = req.query;
    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };
    const [total, usuarios] = yield Promise.all([
        user_models_1.Usuario.countDocuments(query),
        user_models_1.Usuario.find(query).skip(Number(desde)).limit(Number(limite)),
    ]);
    res.json({
        total,
        usuarios,
    });
});
exports.usuariosGet = usuariosGet;
const usuariosPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { nombre, correo, password, edad, rol } = req.body;
        const usuario = new user_models_1.Usuario({ nombre, correo, password, edad, rol });
        //Encriptar la contraseña
        usuario.password = (0, bcryptjs_1.hashPasword)(password);
        //Guardar en DB
        yield usuario.save();
        res.status(201).json({
            ok: true,
            usuario,
        });
    }
    catch (error) {
        res.status(500).json({
            ok: false,
        });
    }
});
exports.usuariosPost = usuariosPost;
const usuariosPut = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const _a = req.body, { _id, password, google } = _a, resto = __rest(_a, ["_id", "password", "google"]);
    //TODO validar contra base de datos
    if (password) {
        resto.password = (0, bcryptjs_1.hashPasword)(password);
    }
    const usuario = yield user_models_1.Usuario.findByIdAndUpdate(id, resto);
    res.json({
        ok: true,
        usuario,
    });
});
exports.usuariosPut = usuariosPut;
const usuariosPatch = (req, res) => {
    res.json({
        ok: true,
        msg: 'patch Api - controlador',
    });
};
exports.usuariosPatch = usuariosPatch;
const usuariosDelete = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    // Eliminar lógicamente al usuario
    const usuario = yield user_models_1.Usuario.findByIdAndUpdate(id, { estado: false });
    res.json({
        ok: true,
        usuario,
    });
});
exports.usuariosDelete = usuariosDelete;
//# sourceMappingURL=user.controller.js.map
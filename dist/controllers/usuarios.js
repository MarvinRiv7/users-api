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
exports.usuariosDelete = exports.usuariosPatch = exports.usuariosPut = exports.usuariosPost = exports.usuariosGet = void 0;
const usuario_1 = require("../models/usuario");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const express_validator_1 = require("express-validator");
const usuariosGet = (req, res) => {
    const params = req.query;
    res.json({
        ok: true,
        msg: "get Api - controlador",
    });
};
exports.usuariosGet = usuariosGet;
const usuariosPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            ok: false,
            errors,
        });
    }
    const { nombre, correo, password, edad, rol } = req.body;
    const usuario = new usuario_1.Usuario({ nombre, correo, password, edad, rol });
    //verificar si el correo existe
    const existeEmail = yield usuario_1.Usuario.findOne({ correo });
    if (existeEmail) {
        return res.status(400).json({
            ok: false,
            msg: "El correo ya está registrado"
        });
    }
    //Encriptar la contraseña
    const salt = bcryptjs_1.default.genSaltSync();
    usuario.password = bcryptjs_1.default.hashSync(password, salt);
    //Guardar en DB
    yield usuario.save();
    res.status(201).json({
        ok: true,
        msg: "post Api - controlador",
        usuario
    });
});
exports.usuariosPost = usuariosPost;
const usuariosPut = (req, res) => {
    const { id } = req.params;
    res.status(400).json({
        ok: true,
        msg: "put Api - controlador",
        id,
    });
};
exports.usuariosPut = usuariosPut;
const usuariosPatch = (req, res) => {
    res.json({
        ok: true,
        msg: "patch Api - controlador",
    });
};
exports.usuariosPatch = usuariosPatch;
const usuariosDelete = (req, res) => {
    res.json({
        ok: true,
        msg: "delete Api - controlador",
    });
};
exports.usuariosDelete = usuariosDelete;
//# sourceMappingURL=usuarios.js.map
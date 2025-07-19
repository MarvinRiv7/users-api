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
exports.CrearCategoria = exports.ObtenerCategoriasPorId = exports.ObtenerCategorias = void 0;
const categories_models_1 = require("./categories.models");
const ObtenerCategorias = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };
    const [total, categorias] = yield Promise.all([
        categories_models_1.Categories.countDocuments(query),
        categories_models_1.Categories.find(query)
            .populate('usuario')
            .skip(Number(desde))
            .limit(Number(limite)),
    ]);
    res.json({
        total,
        categorias,
    });
});
exports.ObtenerCategorias = ObtenerCategorias;
const ObtenerCategoriasPorId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const categoria = yield categories_models_1.Categories.findById(id).populate('usuario');
    res.json({
        categoria,
    });
});
exports.ObtenerCategoriasPorId = ObtenerCategoriasPorId;
const CrearCategoria = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const nombre = req.body.nombre.toUpperCase();
    try {
        const categoriaDB = yield categories_models_1.Categories.findOne({ nombre });
        if (categoriaDB) {
            return res.status(400).json({
                msg: `La categoria ${categoriaDB.nombre}, ya existe`,
            });
        }
        //Generar la data a guardar
        const data = {
            nombre,
            usuario: req.usuario._id,
        };
        const categoria = new categories_models_1.Categories(data);
        //Guardar en DB
        yield categoria.save();
        res.status(201).json({
            categoria,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            msg: 'Hable con el administrador',
        });
    }
});
exports.CrearCategoria = CrearCategoria;
//# sourceMappingURL=categories.controller.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validar_campos_1 = require("../../middlewares/validar-campos");
const express_validator_1 = require("express-validator");
const validar_jwt_1 = require("../../middlewares/validar-jwt");
const categories_controller_1 = require("./categories.controller");
const db_validators_1 = require("../../helpers/db-validators");
const router = (0, express_1.Router)();
// api/categories
//OBTENER todas las categories - publico
router.get('/', categories_controller_1.ObtenerCategorias);
//OBTENER categories por id - publico
router.get('/:id', [
    (0, express_validator_1.check)('id').custom(db_validators_1.existeCategoriaPorID),
    validar_campos_1.validarCampos
], categories_controller_1.ObtenerCategoriasPorId);
//Crear categoria - privado - cualquier persona con un token valido
router.post('/', [
    validar_jwt_1.validarJwT,
    (0, express_validator_1.check)('nombre', 'EL nombres es obligatorio').not().isEmpty(),
    validar_campos_1.validarCampos,
], categories_controller_1.CrearCategoria);
//Actualizar categoria - privado - cualquier persona con un token valido
router.put('/:id', (req, res) => {
    res.json('put');
});
//Borrar una categoria - Admin
router.delete('/:id', (req, res) => {
    res.json('delete');
});
exports.default = router;
//# sourceMappingURL=categories.routes.js.map
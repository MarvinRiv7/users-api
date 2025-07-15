"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validar_campos_1 = require("../../middlewares/validar-campos");
const auth_controller_1 = require("./auth.controller");
const express_validator_1 = require("express-validator");
const router = (0, express_1.Router)();
router.post('/login', [
    (0, express_validator_1.check)('correo', 'El correo es obligatorio').isEmail(),
    (0, express_validator_1.check)('password', 'La contraseña es obligatoria').not().isEmpty(),
    validar_campos_1.validarCampos,
], auth_controller_1.login);
exports.default = router;
//# sourceMappingURL=auth.routes.js.map
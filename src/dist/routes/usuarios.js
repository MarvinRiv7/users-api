"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usuarios_1 = require("../controllers/usuarios");
const express_validator_1 = require("express-validator");
const router = (0, express_1.Router)();
router.get("/", usuarios_1.usuariosGet);
router.put("/:id", usuarios_1.usuariosPut);
router.post("/", [
    (0, express_validator_1.check)("nombre", "El nombre es obligatorio").not().isEmpty(),
    (0, express_validator_1.check)("edad", "La edad es obligatoria").isInt(),
    (0, express_validator_1.check)("correo", "El correo no es válido").isEmail(),
], usuarios_1.usuariosPost);
router.delete("/:id", usuarios_1.usuariosDelete);
router.patch("/:id", usuarios_1.usuariosPatch);
exports.default = router;
//# sourceMappingURL=usuarios.js.map
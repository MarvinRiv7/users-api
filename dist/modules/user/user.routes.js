"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("./user.controller");
const express_validator_1 = require("express-validator");
const validar_campos_1 = require("../../middlewares/validar-campos");
const db_validators_1 = require("../../utils/db-validators");
const validar_jwt_1 = require("../../middlewares/validar-jwt");
const validar_roles_1 = require("../../middlewares/validar-roles");
const router = (0, express_1.Router)();
router.get('/', user_controller_1.usuariosGet);
router.put('/:id', [
    (0, express_validator_1.check)('id', 'No es un id valido').isMongoId(),
    (0, express_validator_1.check)('id').custom(db_validators_1.existeUsuarioPorId),
    (0, express_validator_1.check)('correo', 'El correo es obligatorio').isEmail(),
    (0, express_validator_1.check)('rol').custom(db_validators_1.esRoleValido),
    validar_campos_1.validarCampos,
], user_controller_1.usuariosPut);
router.post('/', [
    (0, express_validator_1.check)('nombre', 'El nombre es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('correo', 'El correo es obligatorio').isEmail(),
    (0, express_validator_1.check)('correo').custom(db_validators_1.emailExiste),
    (0, express_validator_1.check)('password', 'La contraseña es obligatoria').isLength({ min: 6 }),
    // check('rol', 'No es un rol valido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    (0, express_validator_1.check)('edad', 'La edad es obligatoria').isInt({ min: 0 }),
    (0, express_validator_1.check)('rol').custom(db_validators_1.esRoleValido),
    validar_campos_1.validarCampos,
], user_controller_1.usuariosPost);
router.delete('/:id', [
    validar_jwt_1.validarJwT,
    // esAdminRole,
    (0, validar_roles_1.tieneRole)('ADMIN_ROLE', 'VENTAS_ROLE'),
    (0, express_validator_1.check)('id', 'No es un id valido').isMongoId(),
    (0, express_validator_1.check)('id').custom(db_validators_1.existeUsuarioPorId),
], validar_campos_1.validarCampos, user_controller_1.usuariosDelete);
router.patch('/:id', user_controller_1.usuariosPatch);
exports.default = router;
//# sourceMappingURL=user.routes.js.map
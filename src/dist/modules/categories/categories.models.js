"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Categories = void 0;
const mongoose_1 = require("mongoose");
const CategoriesSchema = new mongoose_1.Schema({
    nombre: {
        type: String,
        unique: true,
        required: [true, 'El nombre es obligatorio'],
    },
    estado: {
        type: Boolean,
        default: true,
        required: true,
    },
    usuario: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true,
    },
});
exports.Categories = (0, mongoose_1.model)('Categorie', CategoriesSchema);
//# sourceMappingURL=categories.models.js.map
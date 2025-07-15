"use strict";
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
require("dotenv/config");
exports.env = {
    PORT: (_a = Number(process.env.PORT)) !== null && _a !== void 0 ? _a : 8081,
    MONGO_CNN: (_b = process.env.MONGO_CNN) !== null && _b !== void 0 ? _b : '',
    SECRETKEYJWT: (_c = process.env.SECRETKEYJWT) !== null && _c !== void 0 ? _c : 'Hola_Mundo_0721'
};
//# sourceMappingURL=env.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
require("dotenv/config");
exports.env = {
    PORT: Number(process.env.PORT || 8081),
    MONGO_CNN: process.env.MONGO_CNN || '',
    SECRETKEYJWT: process.env.SECRETKEYJWT || 'Hola_Mundo_0721'
};
//# sourceMappingURL=env.js.map
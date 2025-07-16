"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generarJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generarJWT = (uid = '') => {
    return new Promise((resolve, reject) => {
        var _a;
        const payload = { uid };
        jsonwebtoken_1.default.sign(payload, (_a = process.env.SECRETKEYJWT) !== null && _a !== void 0 ? _a : '', {
            expiresIn: '24h',
        }, (err, token) => {
            if (err) {
                console.log(err);
                reject('No se pudo generar el JWT');
            }
            else {
                resolve(token !== null && token !== void 0 ? token : ' ');
            }
        });
    });
};
exports.generarJWT = generarJWT;
//# sourceMappingURL=generarJWT.js.map
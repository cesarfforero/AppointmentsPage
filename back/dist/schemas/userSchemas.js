"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginSchema = exports.registerSchema = void 0;
const zod_1 = require("zod");
exports.registerSchema = zod_1.z.object({
    nombre: zod_1.z.string().min(2),
    apellido: zod_1.z.string().min(2),
    email: zod_1.z.string().email(),
    birthday: zod_1.z.coerce.date().optional().nullable(),
    nDni: zod_1.z.number().int().positive(),
    username: zod_1.z.string().min(4),
    password: zod_1.z.string().min(8),
});
exports.loginSchema = zod_1.z.object({
    username: zod_1.z.string().min(4),
    password: zod_1.z.string().min(8),
});
//# sourceMappingURL=userSchemas.js.map
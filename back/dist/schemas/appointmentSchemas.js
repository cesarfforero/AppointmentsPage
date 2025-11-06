"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cancelSchema = exports.scheduleSchema = void 0;
const zod_1 = require("zod");
exports.scheduleSchema = zod_1.z.object({
    userId: zod_1.z.string().uuid(),
    startsAt: zod_1.z.coerce.date(),
    endsAt: zod_1.z.coerce.date(),
});
exports.cancelSchema = zod_1.z.object({
    id: zod_1.z.string().uuid(),
});
//# sourceMappingURL=appointmentSchemas.js.map
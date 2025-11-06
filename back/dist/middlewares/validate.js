"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
const validate = (schema, where = "body") => (req, res, next) => {
    const parsed = schema.safeParse(req[where]);
    if (!parsed.success) {
        return res.status(422).json({ error: "ValidationError", details: parsed.error.flatten() });
    }
    req[where] = parsed.data;
    next();
};
exports.validate = validate;
//# sourceMappingURL=validate.js.map
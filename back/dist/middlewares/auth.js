"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAuth = requireAuth;
const jwt_1 = require("../utils/jwt");
function requireAuth(req, res, next) {
    const auth = req.headers.authorization;
    if (!auth?.startsWith("Bearer "))
        return res.status(401).json({ error: "Unauthorized" });
    const token = auth.slice(7);
    try {
        const payload = (0, jwt_1.verifyAccessToken)(token);
        req.auth = payload;
        next();
    }
    catch {
        return res.status(401).json({ error: "Unauthorized" });
    }
}
//# sourceMappingURL=auth.js.map
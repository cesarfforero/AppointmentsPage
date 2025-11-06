"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpError = void 0;
exports.errorHandler = errorHandler;
class HttpError extends Error {
    constructor(status, message) {
        super(message);
        this.status = status;
    }
}
exports.HttpError = HttpError;
function errorHandler(err, _req, res, _next) {
    const status = err.status ?? 500;
    const payload = {
        error: err.name ?? "Error",
        message: err.message ?? "Internal Server Error",
    };
    if (process.env.NODE_ENV !== "production" && err.stack)
        payload.stack = err.stack;
    res.status(status).json(payload);
}
//# sourceMappingURL=error.js.map
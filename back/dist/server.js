"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const logger_1 = require("./utils/logger");
const routers_1 = require("./routes/routers");
const envs_1 = require("./config/envs");
const error_1 = require("./middlewares/error");
exports.app = (0, express_1.default)();
exports.app.use((0, helmet_1.default)());
exports.app.use((0, cors_1.default)({ origin: true, credentials: true }));
exports.app.use(express_1.default.json());
exports.app.use((0, express_rate_limit_1.default)({
    windowMs: envs_1.env.RATE_LIMIT_WINDOW_MS,
    max: envs_1.env.RATE_LIMIT_MAX,
    standardHeaders: true,
    legacyHeaders: false,
}));
exports.app.use(logger_1.httpLogger);
exports.app.get("/health", (_req, res) => res.json({ ok: true }));
exports.app.use(routers_1.appRouter);
exports.app.use(error_1.errorHandler);
//# sourceMappingURL=server.js.map
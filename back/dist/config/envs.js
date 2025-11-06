"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
require("dotenv/config");
const num = (v, d) => Number(v ?? d);
const bool = (v, d) => (v ?? `${d}`) === "true";
exports.env = {
    NODE_ENV: process.env.NODE_ENV ?? "development",
    PORT: num(process.env.PORT, 3000),
    DB_HOST: process.env.DB_HOST ?? "127.0.0.1",
    DB_PORT: num(process.env.DB_PORT, 5432),
    DB_USERNAME: process.env.DB_USERNAME ?? "postgres",
    DB_PASSWORD: process.env.DB_PASSWORD ?? "postgres",
    DB_DATABASE: process.env.DB_DATABASE ?? "pm3",
    DB_SYNCHRONIZE: bool(process.env.DB_SYNCHRONIZE, false),
    DB_DROP: bool(process.env.DB_DROP, false),
    JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET ?? "change_me",
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET ?? "change_me",
    JWT_ACCESS_TTL: process.env.JWT_ACCESS_TTL ?? "15m",
    JWT_REFRESH_TTL: process.env.JWT_REFRESH_TTL ?? "7d",
    RATE_LIMIT_WINDOW_MS: num(process.env.RATE_LIMIT_WINDOW_MS, 60000),
    RATE_LIMIT_MAX: num(process.env.RATE_LIMIT_MAX, 100),
};
//# sourceMappingURL=envs.js.map
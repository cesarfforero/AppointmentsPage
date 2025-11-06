"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signAccessToken = signAccessToken;
exports.verifyAccessToken = verifyAccessToken;
exports.signRefreshToken = signRefreshToken;
exports.verifyRefreshToken = verifyRefreshToken;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const envs_1 = require("../config/envs");
function signAccessToken(payload) {
    return jsonwebtoken_1.default.sign(payload, envs_1.env.JWT_ACCESS_SECRET, { expiresIn: envs_1.env.JWT_ACCESS_TTL });
}
function verifyAccessToken(token) {
    return jsonwebtoken_1.default.verify(token, envs_1.env.JWT_ACCESS_SECRET);
}
function signRefreshToken(payload) {
    return jsonwebtoken_1.default.sign(payload, envs_1.env.JWT_REFRESH_SECRET, { expiresIn: envs_1.env.JWT_REFRESH_TTL });
}
function verifyRefreshToken(token) {
    return jsonwebtoken_1.default.verify(token, envs_1.env.JWT_REFRESH_SECRET);
}
//# sourceMappingURL=jwt.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCredential = createCredential;
exports.verifyCredential = verifyCredential;
const argon2_1 = __importDefault(require("argon2"));
const data_source_1 = require("../config/data-source");
const Credential_1 = require("../entities/Credential");
const credRepo = () => data_source_1.AppDataSource.getRepository(Credential_1.Credential);
async function createCredential(username, plainPassword) {
    const hashed = await argon2_1.default.hash(plainPassword, { type: argon2_1.default.argon2id });
    const cred = credRepo().create({ username, password: hashed });
    return credRepo().save(cred);
}
async function verifyCredential(username, plainPassword) {
    const cred = await credRepo().findOne({ where: { username } });
    if (!cred)
        return null;
    const ok = await argon2_1.default.verify(cred.password, plainPassword);
    return ok ? cred : null;
}
//# sourceMappingURL=credentialService.js.map
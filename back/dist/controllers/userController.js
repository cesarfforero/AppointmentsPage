"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsersCtrl = getUsersCtrl;
exports.getUserByIdCtrl = getUserByIdCtrl;
exports.registerCtrl = registerCtrl;
exports.loginCtrl = loginCtrl;
const userService_1 = require("../service/userService");
const credentialService_1 = require("../service/credentialService");
const jwt_1 = require("../utils/jwt");
async function getUsersCtrl(_req, res) {
    const users = await (0, userService_1.listUsers)();
    res.json(users);
}
async function getUserByIdCtrl(req, res) {
    const { id } = req.params;
    const user = await (0, userService_1.getUserById)(id);
    if (!user)
        return res.status(404).json({ error: "NotFound" });
    res.json(user);
}
async function registerCtrl(req, res) {
    const payload = await (0, userService_1.registerUser)(req.body);
    res.status(201).json(payload);
}
async function loginCtrl(req, res) {
    const { username, password } = req.body;
    const cred = await (0, credentialService_1.verifyCredential)(username, password);
    if (!cred)
        return res.status(401).json({ error: "InvalidCredentials" });
    const access = (0, jwt_1.signAccessToken)({ sub: cred.id, username: cred.username });
    const refresh = (0, jwt_1.signRefreshToken)({ sub: cred.id, tokenId: crypto.randomUUID() });
    res.json({ accessToken: access, refreshToken: refresh });
}
//# sourceMappingURL=userController.js.map
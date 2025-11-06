"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listUsers = listUsers;
exports.getUserById = getUserById;
exports.registerUser = registerUser;
const data_source_1 = require("../config/data-source");
const User_1 = require("../entities/User");
const credentialService_1 = require("./credentialService");
const userRepo = () => data_source_1.AppDataSource.getRepository(User_1.User);
async function listUsers() {
    return userRepo().find({ order: { createdAt: "DESC" } });
}
async function getUserById(id) {
    return userRepo().findOne({ where: { id } });
}
async function registerUser(args) {
    return data_source_1.AppDataSource.transaction(async (trx) => {
        const fullName = `${args.nombre} ${args.apellido}`.trim();
        const credential = await (0, credentialService_1.createCredential)(args.username, args.password);
        const user = trx.getRepository(User_1.User).create({
            name: fullName,
            email: args.email,
            birthdate: args.birthday ?? null,
            nDni: args.nDni,
            credential,
        });
        const saved = await trx.getRepository(User_1.User).save(user);
        return {
            id: saved.id,
            name: saved.name,
            email: saved.email,
            birthdate: saved.birthdate,
            nDni: saved.nDni,
            credential: { username: credential.username },
            createdAt: saved.createdAt,
        };
    });
}
//# sourceMappingURL=userService.js.map
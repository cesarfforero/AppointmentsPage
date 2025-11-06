"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const envs_1 = require("./envs");
const User_1 = require("../entities/User");
const Credential_1 = require("../entities/Credential");
const Appointment_1 = require("../entities/Appointment");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: envs_1.env.DB_HOST,
    port: envs_1.env.DB_PORT,
    username: envs_1.env.DB_USERNAME,
    password: envs_1.env.DB_PASSWORD,
    database: envs_1.env.DB_DATABASE,
    synchronize: envs_1.env.DB_SYNCHRONIZE,
    dropSchema: envs_1.env.DB_DROP,
    logging: false,
    entities: [User_1.User, Credential_1.Credential, Appointment_1.Appointment],
    migrations: ["src/migrations/*.ts"],
});
//# sourceMappingURL=data-source.js.map
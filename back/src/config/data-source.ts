import { DataSource } from "typeorm";
import { env } from "./envs";
import { User } from "../entities/User";
import { Credential } from "../entities/Credential";
import { Appointment } from "../entities/Appointment";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: env.DB_HOST,
  port: env.DB_PORT,
  username: env.DB_USERNAME,
  password: env.DB_PASSWORD,
  database: env.DB_DATABASE,
  synchronize: env.DB_SYNCHRONIZE,
  dropSchema: env.DB_DROP,
  logging: false,
  entities: [User, Credential, Appointment],
  migrations: ["src/migrations/*.ts"],
});

import { AppDataSource } from "../config/data-source";
import { User } from "../entities/User";
import { createCredential } from "./credentialService";

const userRepo = () => AppDataSource.getRepository(User);

export async function listUsers() {
  return userRepo().find({ order: { createdAt: "DESC" } });
}
export async function getUserById(id: string) {
  return userRepo().findOne({ where: { id } });
}

type RegisterArgs = {
  nombre: string;
  apellido: string;
  email: string;
  birthday?: Date | null;
  nDni: number;
  username: string;
  password: string;
};

export async function registerUser(args: RegisterArgs) {
  return AppDataSource.transaction(async (trx) => {
    const fullName = `${args.nombre} ${args.apellido}`.trim();
    const credential = await createCredential(args.username, args.password);
    const user = trx.getRepository(User).create({
      name: fullName,
      email: args.email,
      birthdate: args.birthday ?? null,
      nDni: args.nDni,
      credential,
    });
    const saved = await trx.getRepository(User).save(user);
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

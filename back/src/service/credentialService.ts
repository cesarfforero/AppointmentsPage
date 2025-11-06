import argon2 from "argon2";
import { AppDataSource } from "../config/data-source";
import { Credential } from "../entities/Credential";

const credRepo = () => AppDataSource.getRepository(Credential);

export async function createCredential(username: string, plainPassword: string) {
  const hashed = await argon2.hash(plainPassword, { type: argon2.argon2id });
  const cred = credRepo().create({ username, password: hashed });
  return credRepo().save(cred);
}

export async function verifyCredential(username: string, plainPassword: string) {
  const cred = await credRepo().findOne({ where: { username } });
  if (!cred) return null;
  const ok = await argon2.verify(cred.password, plainPassword);
  return ok ? cred : null;
}

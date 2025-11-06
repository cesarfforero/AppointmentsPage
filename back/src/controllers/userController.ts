import { Request, Response } from "express";
import { listUsers, getUserById, registerUser } from "../service/userService";
import { verifyCredential } from "../service/credentialService";
import { signAccessToken, signRefreshToken } from "../utils/jwt";

export async function getUsersCtrl(_req: Request, res: Response) {
  const users = await listUsers();
  res.json(users);
}

export async function getUserByIdCtrl(req: Request, res: Response) {
  const { id } = req.params as { id: string };
  const user = await getUserById(id);
  if (!user) return res.status(404).json({ error: "NotFound" });
  res.json(user);
}

export async function registerCtrl(req: Request, res: Response) {
  const payload = await registerUser(req.body);
  res.status(201).json(payload);
}

export async function loginCtrl(req: Request, res: Response) {
  const { username, password } = req.body as { username: string; password: string };
  const cred = await verifyCredential(username, password);
  if (!cred) return res.status(401).json({ error: "InvalidCredentials" });

  const access = signAccessToken({ sub: cred.id, username: cred.username });
  const refresh = signRefreshToken({ sub: cred.id, tokenId: crypto.randomUUID() });

  res.json({ accessToken: access, refreshToken: refresh });
}
